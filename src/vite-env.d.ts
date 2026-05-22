/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_CLIENT_ID?: string
  readonly VITE_AZURE_TENANT_ID?: string
  readonly VITE_SHAREPOINT_TRACKER_URL?: string
  readonly VITE_TRACKER_REFRESH_MS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
