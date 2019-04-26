import { IActitoCredentials } from "../types/types";

export const environmentUrlMap = {
  test: "https://test.actito.be/ActitoWebServices/ws/v4",
  prod: "https://www.actito.be/ActitoWebServices/ws/v4"
};

export let actitoCredentials: IActitoCredentials = {
  user: "user",
  password: "password",
  entity: "entity",
  env: "test"
};

export const init = (credentials: IActitoCredentials) => {
  actitoCredentials = credentials;
};
