import { copyFile, exists, remove } from "@tauri-apps/plugin-fs";
import { useAsyncEffect, useReactive } from "ahooks";
import { isString } from "es-toolkit";
import { unionBy } from "es-toolkit/compat";
import { useContext } from "react";
import { getDefaultSaveImagePath } from "tauri-plugin-clipboard-x-api";
import { LISTEN_KEY } from "@/constants";
import { selectHistory } from "@/database/history";
import { MainContext } from "@/pages/Main";
import { isBlank } from "@/utils/is";
import { getSaveImagePath, join } from "@/utils/path";
import { useTauriListen } from "./useTauriListen";

interface Options {
  scrollToTop: () => void;
}

export const useHistoryList = (options: Options) => {
  const { scrollToTop } = options;
  const { rootState } = useContext(MainContext);
  const state = useReactive({
    loading: false,
    noMore: false,
    page: 1,
    size: 20,
  });

  const fetchData = async () => {
    try {
      if (state.loading) return;

      state.loading = true;

      const { page } = state;
      const currentGroup = rootState.group;
      const currentSearch = rootState.search;

      const list = await selectHistory((qb) => {
        const { size } = state;
        const isFavoriteGroup = currentGroup === "favorite";
        const isNormalGroup = currentGroup !== "all" && !isFavoriteGroup;

        return qb
          .$if(isFavoriteGroup, (eb) => eb.where("favorite", "=", true))
          .$if(isNormalGroup, (eb) => eb.where("group", "=", currentGroup))
          .$if(!isBlank(currentSearch), (eb) => {
            return eb.where((eb) => {
              return eb.or([
                eb("search", "like", eb.val(`%${currentSearch}%`)),
                eb("note", "like", eb.val(`%${currentSearch}%`)),
              ]);
            });
          })
          .offset((page - 1) * size)
          .limit(size)
          .orderBy("createTime", "desc");
      });

      for (const item of list) {
        const { type, value } = item;

        if (!isString(value)) continue;

        if (type === "image") {
          const oldPath = join(getSaveImagePath(), value);
          const newPath = join(await getDefaultSaveImagePath(), value);

          if (await exists(oldPath)) {
            await copyFile(oldPath, newPath);

            remove(oldPath);
          }

          item.value = newPath;
        }

        if (type === "files") {
          item.value = JSON.parse(value);
        }
      }

      state.noMore = list.length === 0;

      if (page === 1) {
        rootState.list = list;

        if (state.noMore) return;

        return scrollToTop();
      }

      rootState.list = unionBy(rootState.list, list, "id");
    } finally {
      state.loading = false;
    }
  };

  const reload = () => {
    // 重置状态，确保从第一页开始加载
    state.page = 1;
    state.noMore = false;
    state.loading = false;

    // 立即返回fetchData的结果
    return fetchData();
  };

  const loadMore = () => {
    if (state.noMore) return;

    state.page += 1;

    fetchData();
  };

  useTauriListen(LISTEN_KEY.REFRESH_CLIPBOARD_LIST, reload);

  useAsyncEffect(async () => {
    await reload();

    // 确保activeId总是指向列表中的有效项目
    if (rootState.list.length > 0) {
      rootState.activeId = rootState.list[0].id;
    } else {
      rootState.activeId = undefined;
    }
  }, [rootState.group, rootState.search]);

  return {
    loadMore,
    reload,
  };
};
