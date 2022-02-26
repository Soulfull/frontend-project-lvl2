import stylish from './stylish.js';
import plain from './plain.js';

const getFormat = (formatType) => {
  switch (formatType) {
    case 'plain':
      return plain;
    default:
      return stylish;
  }
};

export default getFormat;
