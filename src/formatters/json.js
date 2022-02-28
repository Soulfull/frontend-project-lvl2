import isObject from 'lodash/isObject.js';

const json = (diff) => {
  const iter = (value) => {
    if (typeof value === 'string') {
      return `"${value}"`;
    }

    if (!isObject(value)) {
      return String(value);
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
