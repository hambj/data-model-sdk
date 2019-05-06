import fetch from "node-fetch";
import { IActitoCredentials } from "../types";

const environmentUrlMap = {
  test: "https://test.actito.be/ActitoWebServices/ws/v4",
  prod: "https://www.actito.be/ActitoWebServices/ws/v4"
};

let actitoCredentials: IActitoCredentials = {
  user: "user",
  password: "password",
  entity: "entity",
  env: "test"
};

export const init = (credentials: IActitoCredentials) => {
  actitoCredentials = credentials;
};

const actitoFetch = (method: "GET" | "POST" | "PUT" | "DELETE") => async (path: string, body?: object) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Basic " + Buffer.from(actitoCredentials.user + ":" + actitoCredentials.password).toString("base64")
  };
  const url = `${environmentUrlMap[actitoCredentials.env]}/entity/${actitoCredentials.entity}/${path}`;
  const bodyOption = body ? { body: JSON.stringify(body) } : {};
  const response = await fetch(url, { headers, ...bodyOption, method });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  if (method === "DELETE") {
    return await response.text();
  } else {
    return await response.json();
  }
};

export const actitoGet = actitoFetch("GET");
export const actitoPost = actitoFetch("POST");
export const actitoPut = actitoFetch("PUT");
export const actitoDelete = actitoFetch("DELETE");
