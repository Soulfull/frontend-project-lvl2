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

const replaceChar = (str, char) => {
  const chunks = str.split('');
  chunks[chunks.length - 2] = char;
  return chunks.join('');
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
    const contents = nodes.flatMap((node) => {
      if (node.status === statuses.updated) {
        const oldValue = `${replaceChar(indent, '-')}${node.key}: ${stringifyObject(node.value, replacer, depth + 1)}`;
        const newValue = `${replaceChar(indent, '+')}${node.key}: ${stringifyObject(node.updatedValue, replacer, depth + 1)}`;
        return [oldValue, newValue];
      }
      const sign = getSign(node.status);
      return `${replaceChar(indent, sign)}${node.key}: ${Array.isArray(node.value) ? iter(node.value, depth + 1) : stringifyObject(node.value, replacer, depth + 1)}`;
    });
    return ['{', ...contents, `${closeBraceIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
