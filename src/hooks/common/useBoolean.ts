import { ref } from "vue";

export function useBoolean(value: boolean) {
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
