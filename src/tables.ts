import { actitoDelete, actitoGet, actitoPost, actitoPut } from "./helpers/http";
import { objectToProperties, propertiesToObject } from "./helpers/translators";
import { IAPIProperty, IAPISearch, IAPISort } from "./types";

export async function addRecord(tableId: string, record: object) {
  return actitoPost(`customTable/${tableId}/record`, { properties: objectToProperties(record) });
}

export async function getRecord(tableId: string, recordId: string) {
  const { properties }: { properties: IAPIProperty[] } = await actitoGet(`customTable/${tableId}/record/${recordId}`);
  return propertiesToObject(properties);
}

export async function getRecords(tableId: string, search?: IAPISearch, sort?: IAPISort, limit?: number) {
  const query =
    (search != undefined ? `searchField=${encodeURIComponent(search.searchField)}&searchValue=${encodeURIComponent(search.searchValue)}&` : "") +
    (sort != undefined ? `sortedField=${encodeURIComponent(sort.sortedField)}&ascending=${sort.ascending}&` : "") +
    (limit != undefined ? `number=${limit}&` : "");
  const elements: IAPIProperty[][] = await actitoGet(`customTable/${tableId}/record?${query}`);
  var ret: {
    [key: string]: any;
  }[] = [];
  elements.forEach((element) => {
    ret.push(propertiesToObject(element));
  });
  return ret;
}

export async function updateRecord(tableId: string, recordId: string, record: object) {
  return await actitoPut(`customTable/${tableId}/record/${recordId}`, { properties: objectToProperties(record) });
}

export async function deleteRecord(tableId: string, recordId: string) {
  return await actitoDelete(`customTable/${tableId}/record/${recordId}`);
}
