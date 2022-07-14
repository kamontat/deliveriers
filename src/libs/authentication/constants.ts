import { App } from "realm-web";

export const SIGNIN_ROUTE_ID = "signin";
export const SIGNIN_PATH = "/signin";

export const app = new App({
  id: import.meta.env.VITE_PUBLIC_MONGODB_APP_ID,
});

app.constructor.name;
