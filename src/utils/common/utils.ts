export const isUndefindOrNull = (value: any): boolean => {
  return typeof value === 'undefined' || value === null;
};

export const isEmptyString = (value: any): boolean => {
  return String(value) === '';
};

export const fieldValidity = (field: any): boolean =>
  !isUndefindOrNull(field) && !isEmptyString(field);
