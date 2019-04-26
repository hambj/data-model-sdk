import fetch from "node-fetch";
import { ActitoCredentials, ProfileBody, Subscription, Segmentation } from "./types";

var actitoCredentials: ActitoCredentials = {
  user: "user",
  password: "password",
  entity: "entity",
  env: "test"
};

const environmentUrlMap = {
  test: "https://test.actito.be/ActitoWebServices/ws/v4",
  prod: "https://www.actito.be/ActitoWebServices/ws/v4"
};

export const init = (credentials: ActitoCredentials) => {
  actitoCredentials = credentials;
};

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
