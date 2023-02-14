import { ref } from 'vue'

export default function useCount(second: number = 5) {
  if (second <= 0 && second % 1 !== 0) {
    throw new Error('倒计时的时间应该为一个正整数！')
  }

  let count = ref(0)
  const label = ref('获取验证码')
  const disabled = ref(false)

  let timerId: any

  function startCount() {
    if (!count.value) {
      count.value = second
      disabled.value = true

      timerId = setInterval(() => {
        label.value = `倒计时 ${count.value} 秒`
        count.value--

        if (count.value <= 0) {
          label.value = '获取验证码'
          disabled.value = false
          clearInterval(timerId)
        }
      }, 1000)
    }
  }

  return {
    count,
    label,
    disabled,
    startCount
  }
}
