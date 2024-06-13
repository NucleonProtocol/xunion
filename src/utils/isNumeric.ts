import { isNumber } from 'lodash';

export const isNumeric = (value: string) =>
  isNumber(Number(value)) && Number(value) > 0;
