import { actitoCredentials, environmentUrlMap } from "./init";

export async function addRecord(tableId: string, record: {}) {
  const auth = "Basic " + Buffer.from(actitoCredentials.user + ":" + actitoCredentials.password).toString("base64");
  const rootUrl = environmentUrlMap[actitoCredentials.env];
  const url = `${rootUrl}/entity/${actitoCredentials.entity}/customTable/${tableId}/record`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: auth },
    body: JSON.stringify(record)
  });
  if (!response.ok) throw Error(response.statusText);
  return await response.json();
}

export async function updateRecord(tableId: string, record: {}) {
  const auth = "Basic " + Buffer.from(actitoCredentials.user + ":" + actitoCredentials.password).toString("base64");
  const rootUrl = environmentUrlMap[actitoCredentials.env];
  const url = `${rootUrl}/entity/${actitoCredentials.entity}/customTable/${tableId}/record`;
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: auth },
    body: JSON.stringify(record)
  });
  if (!response.ok) throw Error(response.statusText);
  return await response.json();
}
