import fetch from "node-fetch";
import { ProfileBody, Subscription, Segmentation } from "../types/types";
import { actitoCredentials, environmentUrlMap } from "./init";
interface Profile {
  profile: { [key: string]: any };
  subscriptions: Subscription[];
  segmentations: Segmentation[];
}

export async function getProfile(table: string, profileId: string): Promise<Profile> {
  const auth = "Basic " + Buffer.from(actitoCredentials.user + ":" + actitoCredentials.password).toString("base64");
  const rootUrl = environmentUrlMap[actitoCredentials.env];
  const url = `${rootUrl}/entity/${actitoCredentials.entity}/table/${table}/profile/${profileId}`;
  const response = await fetch(url, { headers: { "Content-Type": "application/json", Authorization: auth } });
  if (!response.ok) throw Error(response.statusText);
  const body: ProfileBody = await response.json();
  const { attributes, subscriptions, segmentations } = body;
  const profile: { [key: string]: any } = {};
  attributes.forEach(({ name, value }) => (profile[name] = value));
  return { profile, subscriptions, segmentations };
}
