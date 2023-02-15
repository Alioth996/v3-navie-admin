import { onBeforeUnmount } from "vue";

/**
 * @description 清除定时器
 */
export function useTimer() {
  let timerId: any;

  function clearTimer() {
    if (timerId) {
      clearInterval(timerId);
    }
  }

  function setTimer(handler: TimerHandler, timeOut: number) {
    timerId = setInterval(handler, timeOut);
  }

  onBeforeUnmount(() => {
    timerId = null;
    clearTimer();
  });

  return {
    clearTimer,
    setTimer,
  };
}
