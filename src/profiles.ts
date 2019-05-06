import { actitoDelete, actitoGet, actitoPost, actitoPut } from "./helpers/http";
import { apiProfileToProfile, profileToAPIProfile } from "./helpers/translators";
import { IProfileRecord } from "./types";

export async function createProfile(table: string, profileSpec: IProfileRecord): Promise<{ profileId: string }> {
  return await actitoPost(`table/${table}/profile`, profileToAPIProfile(profileSpec));
}

export async function getProfile(table: string, profileId: string): Promise<IProfileRecord> {
  const apiProfile = await actitoGet(`table/${table}/profile/${profileId}`);
  return apiProfileToProfile(apiProfile);
}

export async function updateProfile(
  table: string,
  profileId: string,
  profileRecord: IProfileRecord
): Promise<{ profileId: string }> {
  return await actitoPut(`table/${table}/profile/${profileId}`, profileToAPIProfile(profileRecord));
}

export async function deleteProfile(table: string, profileId: string) {
  await actitoDelete(`table/${table}/profile/${profileId}`);
}
