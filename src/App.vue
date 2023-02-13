<template>

  <n-message-provider>
    <n-notification-provider>

      <router-view />

    </n-notification-provider>
  </n-message-provider>
</template>

<style >
html,
body,
#app {
  width: 100vw;
  height: 100vh;
}
</style>