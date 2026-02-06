import { proxy } from "valtio";
import type { ClipboardStore } from "@/types/store";

export const clipboardStore = proxy<ClipboardStore>({
  audio: {
    copy: false,
  },

  content: {
    autoFavorite: false,
    autoPaste: "double",
    autoSort: true,
    copyPlain: true,
    deleteConfirm: true,
    hideHeaders: true,
    operationButtons: ["copy", "star", "delete"],
    pastePlain: false,
    plainTextLines: 3,
    showOnlyPlainText: false,
    showOriginalContent: false,
  },

  history: {
    duration: 0,
    maxCount: 0,
    unit: 1,
  },

  search: {
    autoClear: true,
    defaultFocus: true,
    position: "top",
  },
  window: {
    backTop: true,
    position: "follow",
    showAll: false,
    style: "standard",
  },
});
