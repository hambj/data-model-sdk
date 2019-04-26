import fetch from "node-fetch";
import { IProfileBody, ISegmentation, ISubscription } from "../types/types";
import { actitoCredentials, environmentUrlMap } from "./init";
interface IProfile {
  profile: { [key: string]: any };
  subscriptions: ISubscription[];
  segmentations: ISegmentation[];
}

export async function getProfile(table: string, profileId: string): Promise<IProfile> {
  const auth = "Basic " + Buffer.from(actitoCredentials.user + ":" + actitoCredentials.password).toString("base64");
  const rootUrl = environmentUrlMap[actitoCredentials.env];
  const url = `${rootUrl}/entity/${actitoCredentials.entity}/table/${table}/profile/${profileId}`;
  const response = await fetch(url, { headers: { "Content-Type": "application/json", Authorization: auth } });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const body: IProfileBody = await response.json();
  const { attributes, subscriptions, segmentations } = body;
  const profile: { [key: string]: any } = {};
  attributes.forEach(({ name, value }) => (profile[name] = value));
  return { profile, subscriptions, segmentations };
}
