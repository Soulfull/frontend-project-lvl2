import isObject from 'lodash/isObject.js';
import statuses from '../constants/statuses.js';

const getValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff, path = '') => diff.filter(({ status }) => status !== statuses.equal).flatMap(({
  key, value, status, updatedValue,
}) => {
  const keyPath = path.length > 0 ? `${path}.${key}` : key;
  if (!status) {
    return plain(value, keyPath);
  }
  if (status === statuses.updated) {
    return `Property '${keyPath}' was updated. From ${getValue(value)} to ${getValue(updatedValue)}`;
  }
  if (status === statuses.removed) {
    return `Property '${keyPath}' was removed`;
  }
  return `Property '${keyPath}' was added with value: ${getValue(value)}`;
}).join('\n');

export default plain;
