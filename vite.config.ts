import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 按需自动导入组件
      resolvers: [NaiveUiResolver()],
      // 自动导入vue内置api
      imports:['vue']
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ]
})
