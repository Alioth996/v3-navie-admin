/// <reference types="vite/client" />

declare module 'mockjs'

interface ImportMetaEnv {
    readonly VITE_MOCK_URL: string
    readonly VITE_BASE_URL: string
}
