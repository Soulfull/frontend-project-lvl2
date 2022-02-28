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

const needDeeperCompare = (source, target) => isObject(source) && isObject(target);

const compare = (source, target) => {
  const diffSource = Object.entries(source).map(([key, value]) => {
    const hasChildren = needDeeperCompare(value, target[key]);
    const valueData = hasChildren ? compare(value, target[key]) : value;
    const statusData = hasChildren ? null : getStatus({
      key, value, target, source,
    });
    return {
      key,
      value: statusData === statuses.updated ? [valueData, target[key]] : valueData,
      status: statusData,
      hasChildren,
    };
  });
  const diffTarget = Object.entries(target)
    .filter(([key, value]) => {
      const hasChildren = needDeeperCompare(value, source[key]);
      const status = getStatus({
        key, source, target,
      });
      return status === statuses.added && !hasChildren;
    })
    .map(([key, value]) => ({
      key, value, status: statuses.added, hasChildren: false,
    }));

  return sortBy([...diffSource, ...diffTarget], 'key');
};

export default compare;
