import isObject from 'lodash/isObject.js';
import statuses from '../constants/statuses.js';

const stringifyObject = (val, replacer, depth) => {
  const iter = (value, currentDepth) => {
    if (!isObject(value)) {
      return String(value);
    }

    const currentIndent = replacer.repeat(currentDepth);
    const bracketsIndent = replacer.repeat(currentDepth - 1);
    const contents = Object.entries(value).map(([key, propVal]) => `${currentIndent}${key}: ${iter(propVal, currentDepth + 1)}`);
    return [
      '{',
      ...contents,
      `${bracketsIndent}}`,
    ].join('\n');
  };

  return iter(val, depth);
};

const replaceSign = (replacer, sign) => {
  const { length } = replacer;
  return replacer.split('').map((char, index) => (index === length - 2 ? sign : char)).join('');
};

const getSign = (status) => {
  switch (status) {
    case statuses.added:
      return '+';
    case statuses.removed:
      return '-';
    case statuses.equal:
    default:
      return ' ';
  }
};

const stylish = (diff) => {
  const replacer = '    ';
  const iter = (nodes, depth) => {
    const indent = replacer.repeat(depth);
    const closeBraceIndent = replacer.repeat(depth - 1);
    const contents = nodes.flatMap(({
      key, value, status, hasChildren,
    }) => {
      if (status === statuses.updated) {
        return value.map((val, index) => {
          const sign = index === 0 ? '-' : '+';
          return `${replaceSign(indent, sign)}${key}: ${stringifyObject(val, replacer, depth + 1)}`;
        });
      }
      const sign = getSign(status);
      return `${replaceSign(indent, sign)}${key}: ${hasChildren ? iter(value, depth + 1) : stringifyObject(value, replacer, depth + 1)}`;
    });
    return ['{', ...contents, `${closeBraceIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
