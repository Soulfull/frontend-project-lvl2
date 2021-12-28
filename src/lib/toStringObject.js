import { getSign } from './getSign.js';

export const toStringObject = (arr) => {
  const strs = arr.map(({key, value, status}) => `  ${getSign(status)} ${key}: ${value}`);
  return `{\n${strs.join('\n')}\n}`;
};
