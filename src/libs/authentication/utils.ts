import type { RealmUser } from "./models";

import { Credentials } from "realm-web";
import { app } from "./constants";
import { user } from "./stores";

export const signin = async (email: string, password: string) => {
  const credential = Credentials.emailPassword(email, password);

  try {
    const account = await app.logIn(credential);
    user.set(account);
  } catch (error: any) {
    throw new Error(`${error.error} (${error.errorCode})`);
  }
};

export const signout = async () => {
  if (app.currentUser) {
    await app.currentUser.logOut();
    user.set(undefined);
  }
};

export const getUsername = (user: RealmUser | undefined): string => {
  return user?.profile.email?.split("@")[0] ?? "Anonymous";
};
