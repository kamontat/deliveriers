import { App } from "realm-web";

export const app = new App({
  id: import.meta.env.VITE_PUBLIC_MONGODB_APP_ID,
});
