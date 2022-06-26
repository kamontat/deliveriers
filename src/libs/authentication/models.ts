import type { User } from "realm-web";
import type { DefaultFunctionsFactory, DefaultUserProfileData } from "realm";

export type RealmUser = User<DefaultFunctionsFactory, SimpleObject, DefaultUserProfileData>;

export interface RealmError {
  error: string;
  errorCode: string;
}
