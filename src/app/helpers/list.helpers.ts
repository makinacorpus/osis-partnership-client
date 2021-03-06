import { IdLabel } from '../interfaces/common';

/**
 * Returns items list with id and label for each item
 * from a list of string or ValueLabel
 */
export const getFormattedItemsList = (items: any[]) => items.map(
  (item: any) => (typeof item === 'string' ? {
    id: item,
    label: item
  } : {
    label: item.label || item.name,
    id: item.id || item.iso_code || item.name || item.value
  }));

/**
 * Returns label of given value from a list of items
 */
export const getLabel = (items: any[], value: string) => {
  const currentItem = items.find((item: string | IdLabel) => (
    typeof item === 'string' && item === value ? true
    : typeof item === 'object' && item.id === value
  ));
  return currentItem
    ? typeof currentItem === 'string' ? currentItem : currentItem.label
    : value;
};

interface Level {
  name: string;
  value: string;
}

/**
 * Return a valid ValueLabel list. It could have 2 level depending on params
 */
export const getValueLabelList = (items: any[], level1?: Level, level2?: Level) => {
  // A level is defined, returns list of this level
  if (level1) {
    const level1Index = items.findIndex(item => item.name === level1.value || item.label === level1.value);
    if (level2) {
      const level2Index = items[level1Index][level1.name].findIndex((item: any) => item.name === level2.value);
      // A second level is define, returns list of this second level
      return items[level1Index][level1.name] && items[level1Index][level1.name][level2Index][level2.name]
      ? getFormattedItemsList(items[level1Index][level1.name][level2Index][level2.name])
      : [];
    }
    return items[level1Index] && items[level1Index][level1.name]
    ? getFormattedItemsList(items[level1Index][level1.name])
    : [];
  }

  // No level is defined, returns base list
  return getFormattedItemsList(items);
};
