import fetch from "node-fetch";
import { IProperty } from "../types/types";
import { actitoCredentials, environmentUrlMap } from "./init";

export async function addRecord(tableId: string, record: object) {
  const auth = "Basic " + Buffer.from(actitoCredentials.user + ":" + actitoCredentials.password).toString("base64");
  const rootUrl = environmentUrlMap[actitoCredentials.env];
  const url = `${rootUrl}/entity/${actitoCredentials.entity}/customTable/${tableId}/record`;
  const properties: IProperty[] = [];
  Object.entries(record).forEach(([name, value]) => properties.push({ name, value }));
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: auth },
    body: JSON.stringify({ properties })
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
}

export async function updateRecord(tableId: string, recordId: string, record: object) {
  const auth = "Basic " + Buffer.from(actitoCredentials.user + ":" + actitoCredentials.password).toString("base64");
  const rootUrl = environmentUrlMap[actitoCredentials.env];
  const url = `${rootUrl}/entity/${actitoCredentials.entity}/customTable/${tableId}/record/${recordId}`;
  const properties: IProperty[] = [];
  Object.entries(record).forEach(([name, value]) => properties.push({ name, value }));
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: auth },
    body: JSON.stringify({ properties })
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
}
