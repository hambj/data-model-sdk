import { actitoDelete, actitoGet, actitoPost, actitoPut, objectToProperties, propertiesToObject } from ".";
import { IAPIProfileBody, IProfileSpec, ISegmentation, ISubscription } from "./types";
interface IProfile {
  profile: { [key: string]: any };
  subscriptions: ISubscription[];
  segmentations: ISegmentation[];
}

export async function createProfile(table: string, profileSpec: IProfileSpec): Promise<{ profileId: string }> {
  const { profile, ...otherSpecs } = profileSpec;
  const attributes = objectToProperties(profile);
  return await actitoPost(`table/${table}/profile`, { attributes, ...otherSpecs });
}

export async function getProfile(table: string, profileId: string): Promise<IProfile> {
  const { attributes, subscriptions, segmentations }: IAPIProfileBody = await actitoGet(
    `table/${table}/profile/${profileId}`
  );
  return { profile: propertiesToObject(attributes), subscriptions, segmentations };
}

export async function updateProfile(
  table: string,
  profileId: string,
  profileSpec: IProfileSpec
): Promise<{ profileId: string }> {
  const { profile, ...otherSpecs } = profileSpec;
  const attributes = objectToProperties(profile);
  return await actitoPut(`table/${table}/profile/${profileId}`, { attributes, ...otherSpecs });
}

export async function deleteProfile(table: string, profileId: string) {
  await actitoDelete(`table/${table}/profile/${profileId}`);
}
