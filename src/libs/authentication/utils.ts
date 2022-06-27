import type { RealmUser } from "./models";

import { Credentials } from "realm-web";
import { browser } from "$app/env";
import { goto } from "$app/navigation";

import { SIGNIN_PATH } from "$lib/authentication";

import { app } from "./constants";
import { user, isSignin } from "./stores";

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

export const protectedRoute = () => {
  isSignin.subscribe((i) => {
    if (!i && browser) {
      goto(SIGNIN_PATH);
    }
  });
};
