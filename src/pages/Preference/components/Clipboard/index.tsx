import { useId } from "react";
import { useTranslation } from "react-i18next";
import { useSnapshot } from "valtio";
import ProList from "@/components/ProList";
import ProSwitch from "@/components/ProSwitch";
import { clipboardStore } from "@/stores/clipboard";
import AudioSettings from "./components/AudioSettings";
import AutoPaste from "./components/AutoPaste";
import OperationButton from "./components/OperationButton";
import SearchPosition from "./components/SearchPosition";
import WindowPosition from "./components/WindowPosition";

const ClipboardSettings = () => {
  const { window, search, content } = useSnapshot(clipboardStore);
  const { t } = useTranslation();
  const plainTextLinesId = useId();

  return (
    <>
      <ProList header={t("preference.clipboard.window_settings.title")}>
        <WindowPosition />

        <ProSwitch
          description={t("preference.clipboard.window_settings.hints.back_top")}
          onChange={(value) => {
            clipboardStore.window.backTop = value;
          }}
          title={t("preference.clipboard.window_settings.label.back_top")}
          value={window.backTop}
        />

        <ProSwitch
          onChange={(value) => {
            clipboardStore.window.showAll = value;
          }}
          title={t("preference.clipboard.window_settings.label.show_all")}
          value={window.showAll}
        />
      </ProList>

      <AudioSettings />

      <ProList header={t("preference.clipboard.search_box_settings.title")}>
        <SearchPosition key={1} />

        <ProSwitch
          description={t(
            "preference.clipboard.search_box_settings.hints.default_focus",
          )}
          onChange={(value) => {
            clipboardStore.search.defaultFocus = value;
          }}
          title={t(
            "preference.clipboard.search_box_settings.label.default_focus",
          )}
          value={search.defaultFocus}
        />

        <ProSwitch
          description={t(
            "preference.clipboard.search_box_settings.hints.auto_clear",
          )}
          onChange={(value) => {
            clipboardStore.search.autoClear = value;
          }}
          title={t("preference.clipboard.search_box_settings.label.auto_clear")}
          value={search.autoClear}
        />
      </ProList>

      <ProList header={t("preference.clipboard.content_settings.title")}>
        <AutoPaste />

        <ProSwitch
          description={t(
            "preference.clipboard.content_settings.hints.copy_as_plain",
          )}
          onChange={(value) => {
            clipboardStore.content.copyPlain = value;
          }}
          title={t("preference.clipboard.content_settings.label.copy_as_plain")}
          value={content.copyPlain}
        />

        <ProSwitch
          description={t(
            "preference.clipboard.content_settings.hints.paste_as_plain",
          )}
          onChange={(value) => {
            clipboardStore.content.pastePlain = value;
          }}
          title={t(
            "preference.clipboard.content_settings.label.paste_as_plain",
          )}
          value={content.pastePlain}
        />

        <OperationButton />

        <ProSwitch
          description={t(
            "preference.clipboard.content_settings.hints.auto_favorite",
          )}
          onChange={(value) => {
            clipboardStore.content.autoFavorite = value;
          }}
          title={t("preference.clipboard.content_settings.label.auto_favorite")}
          value={content.autoFavorite}
        />

        <ProSwitch
          description={t(
            "preference.clipboard.content_settings.hints.delete_confirm",
          )}
          onChange={(value) => {
            clipboardStore.content.deleteConfirm = value;
          }}
          title={t(
            "preference.clipboard.content_settings.label.delete_confirm",
          )}
          value={content.deleteConfirm}
        />

        <ProSwitch
          description={t(
            "preference.clipboard.content_settings.hints.auto_sort",
          )}
          onChange={(value) => {
            clipboardStore.content.autoSort = value;
          }}
          title={t("preference.clipboard.content_settings.label.auto_sort")}
          value={content.autoSort}
        />

        <ProSwitch
          description={t(
            "preference.clipboard.content_settings.hints.show_original_content",
          )}
          onChange={(value) => {
            clipboardStore.content.showOriginalContent = value;
          }}
          title={t(
            "preference.clipboard.content_settings.label.show_original_content",
          )}
          value={content.showOriginalContent}
        />

        <ProSwitch
          description={t(
            "preference.clipboard.content_settings.hints.show_only_plain_text",
          )}
          onChange={(value) => {
            clipboardStore.content.showOnlyPlainText = value;
          }}
          title={t(
            "preference.clipboard.content_settings.label.show_only_plain_text",
          )}
          value={content.showOnlyPlainText}
        />

        <ProSwitch
          description={t(
            "preference.clipboard.content_settings.hints.hide_headers",
          )}
          onChange={(value) => {
            clipboardStore.content.hideHeaders = value;
          }}
          title={t("preference.clipboard.content_settings.label.hide_headers")}
          value={content.hideHeaders}
        />

        <div className="mt-2 mb-2">
          <label className="mb-1 block text-color-2" htmlFor={plainTextLinesId}>
            {t("preference.clipboard.content_settings.label.plain_text_lines")}
          </label>
          <input
            className="w-full rounded-md bg-color-1 p-2 text-color-1"
            id={plainTextLinesId}
            max="10"
            min="1"
            onChange={(e) => {
              clipboardStore.content.plainTextLines = parseInt(
                e.target.value,
                10,
              );
            }}
            type="number"
            value={content.plainTextLines}
          />
        </div>
      </ProList>
    </>
  );
};

export default ClipboardSettings;
