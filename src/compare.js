import sortBy from 'lodash/sortBy.js';
import isEqual from 'lodash/isEqual.js';
import isObject from 'lodash/isObject.js';
import statuses from './constants/statuses.js';

const getStatus = ({
  key, target, source,
}) => {
  const isRemoved = (`${key}` in source) && !(`${key}` in target);
  const isAdded = (`${key}` in target) && !(`${key}` in source);
  const isUpdated = (`${key}` in target) && (`${key}` in source) && !isEqual(source[key], target[key]);
  if (isRemoved) {
    return statuses.removed;
  }
  if (isAdded) {
    return statuses.added;
  }
  if (isUpdated) {
    return statuses.updated;
  }
  return statuses.equal;
};

const compare = (source, target) => {
  const diffSource = Object.entries(source).map(([key, value]) => {
    const isObjects = isObject(value) && isObject(target[key]);
    const valueData = isObjects ? compare(value, target[key]) : value;
    const statusData = isObjects ? null : getStatus({
      key, value, target, source,
    });
    const node = {
      key,
      value: valueData,
      status: statusData,
    };
    return statusData === statuses.updated ? { ...node, updatedValue: target[key] } : node;
  });
  const diffTarget = Object.entries(target)
    .filter(([key, value]) => !isObject(value) || !isObject(source[key]))
    .filter(([key]) => {
      const status = getStatus({
        key, source, target,
      });
      return status === statuses.added;
    })
    .map(([key, value]) => ({ key, value, status: statuses.added }));

  return sortBy([...diffSource, ...diffTarget], 'key');
};

export default compare;
