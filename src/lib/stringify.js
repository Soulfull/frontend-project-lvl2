import { getSign } from './getSign.js';
import stringifyObject from './stringifyObject.js';

const replaceChar = (str, char) => {
  const chunks = str.split('');
  chunks[chunks.length - 2] = char;
  return chunks.join('');
};

const stringify = (data) => {
  const replacer = '    ';
  const iter = (nodes, depth) => {
    const indent = replacer.repeat(depth);
    const closeBraceIndent = replacer.repeat(depth - 1);
    const contents = nodes.map((node) => {
      const sign = getSign(node.status);
      return `${replaceChar(indent, sign)}${node.key}: ${Array.isArray(node.value) ? iter(node.value, depth + 1) : stringifyObject(node.value, replacer, depth + 1)}`;
    });
    return ['{', ...contents, `${closeBraceIndent}}`].join('\n');
  };
  return iter(data, 1);
};

export default stringify;
