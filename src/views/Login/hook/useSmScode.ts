import { computed, ref } from "vue";
import { useTimer } from "./common/useTimer";

function useBoolean(value: boolean) {
  let bool = ref(value);

  function setFalse() {
    bool.value = false;
  }

  function setTrue() {
    bool.value = true;
  }

  function toggleBool() {
    bool.value = !bool.value;
  }

  return {
    bool,
    setFalse,
    setTrue,
    toggleBool,
  };
}

export default function useCount(second: number = 5) {
  if (second <= 0 && second % 1 !== 0) {
    throw new Error("倒计时的时间应该为一个正整数！");
  }

  let count = ref(0);

  const { bool: disabled, setTrue, setFalse } = useBoolean(false);

  let initLabel = "获取验证码";

  const label = computed(() => {
    let text = initLabel;
    if (Boolean(count.value)) {
      text = `倒计时${count.value} 秒`;
    }
    return text;
  });

  const { clearTimer, setTimer } = useTimer();

  function startCount() {
    clearTimer();
    // 每次启动重新赋值
    count.value = second;
    setTrue();
    setTimer(() => {
      count.value -= 1;
      if (count.value <= 0) {
        setFalse();
        clearTimer();
      }
    }, 1000);
  }

  return {
    count,
    label,
    disabled,
    startCount,
  };
}
