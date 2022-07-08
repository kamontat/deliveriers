import type { StoreGet } from "./store";

export interface StoreGetArgs {
  id: string;
}

export interface StoreGetErrorResponse {
  status: "ERROR";
  response: string;
}

export interface StoreGetSuccessResponse {
  status: "SUCCESS";
  response: StoreGet;
}

export type StoreGetResponse = StoreGetErrorResponse | StoreGetSuccessResponse;
