import { TranslationEntries, TranslationEntry } from './translation-entry';

export const mapFromObj = obj => {
  let map = new Map();
  Object.keys(obj).forEach(key => {
    map.set(key, obj[key]);
  });
  return map;
};
export const translationEntriesToArr = (entries: TranslationEntries): TranslationEntry[] => {
  let entitiesAsArr = [];
  entries.forEach((key, val) => {
    entitiesAsArr = [...entitiesAsArr, { key: key, value: val }];
  });
  return entitiesAsArr;
};
export const getElemWhenDefined = async <T extends Element>(key: string): Promise<T> => {
  await customElements.whenDefined(key);
  return document.querySelector<T>(key);
};
