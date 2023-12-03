import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy:{
      '/api':{
          //后台服务.想用Mock Server就改这个url 
          target:'http://localhost:8080',
          // target:'https://038dad50-a444-4552-9e12-d1de96224b4b.mock.pstmn.io',
          changeOrigin:true,
          rewrite:(path)=>path.replace(/^\/api/,'')// /api 替换为空串
      }
    }
  }
})
