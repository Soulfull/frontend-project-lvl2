import isObject from 'lodash/isObject.js';

const json = (diff) => {
  const iter = (value) => {
    if (!isObject(value)) {
      return typeof value === 'string' ? `"${value}"` : String(value);
    }

    if (Array.isArray(value)) {
      return `[${value.map(iter).join(',')}]`;
    }

    const contents = Object.entries(value).map(([key, propVal]) => `"${key}":${iter(propVal)}`);
    return `{${contents.join(',')}}`;
  };

  return iter(diff);
};

export default json;
