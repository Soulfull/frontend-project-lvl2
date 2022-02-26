import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormat = (formatType) => {
  switch (formatType) {
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      return stylish;
  }
};

export default getFormat;
