import type { RealmUser } from "./models";

import { Credentials, type MongoDBRealmError } from "realm-web";
import { app } from "./constants";
import { user } from "./stores";

export const signin = async (email: string, password: string) => {
  const credential = Credentials.emailPassword(email, password);

  try {
    const account = await app.logIn(credential);
    user.set(account);
  } catch (e) {
    const error = e as MongoDBRealmError;
    throw new Error(`${error.error} (${error.errorCode})`, {
      cause: error,
    });
  }
};

export const signout = async () => {
  if (app.currentUser) {
    await app.currentUser.logOut();
    user.set(null);
  }
};

export const getUsername = (user: RealmUser | undefined | null): string => {
  return user?.profile.email?.split("@")[0] ?? "Anonymous";
};
