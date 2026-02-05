import { cursorPosition, monitorFromPoint } from "@tauri-apps/api/window";

/**
 * 获取当前鼠标所在的显示器
 */
export const getCursorMonitor = async () => {
  const cursorPoint = await cursorPosition();
  const { x, y } = cursorPoint;

  const monitor = await monitorFromPoint(x, y);

  if (!monitor) return;

  return {
    ...monitor,
    cursorPoint,
  };
};
