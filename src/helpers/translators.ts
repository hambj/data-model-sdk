import { IAPIProfileBody, IAPIProperty, IProfileRecord } from "../types";

export function objectToProperties(object: object): IAPIProperty[] {
  const properties: IAPIProperty[] = [];
  Object.entries(object).forEach(([name, value]) => properties.push({ name, value }));
  return properties;
}

export function propertiesToObject(properties: IAPIProperty[]) {
  const result: {
    [key: string]: any;
  } = {};
  properties.forEach(({ name, value }) => (result[name] = value));
  return result;
}

export function profileToAPIProfile(profileSpec: IProfileRecord): IAPIProfileBody {
  const { profile, ...otherSpecs } = profileSpec;
  const translatedProfileSpec: IAPIProfileBody = {
    attributes: [],
    ...otherSpecs
  };
  if (profile) {
    translatedProfileSpec.attributes = objectToProperties(profile);
  }
  return translatedProfileSpec;
}

export function apiProfileToProfile(profileBody: IAPIProfileBody): IProfileRecord {
  const { attributes, ...rest } = profileBody;
  const translated: IProfileRecord = { ...rest };
  if (attributes) {
    translated.profile = propertiesToObject(attributes);
  }
  return translated;
}
