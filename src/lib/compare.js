import _ from 'lodash';
import { statuses } from './getSign.js';

const checkStatus = ({ key, value, obj }) => !(`${key}` in obj) || !_.isEqual(value, obj[key]);

const getStatus = ({
  key, value, target, source,
}) => {
  const isRemoved = checkStatus({ key, value, obj: target });
  const isAdded = checkStatus({ key, value, obj: source });
  if (isRemoved) {
    return statuses.removed;
  }
  if (isAdded) {
    return statuses.added;
  }
  return statuses.equal;
};

const compare = (source, target) => {
  const diffSource = Object.entries(source).map(([key, value]) => {
    const isObjects = typeof value === 'object' && typeof target[key] === 'object';
    const valueData = isObjects ? compare(value, target[key]) : value;
    const statusData = isObjects ? null : getStatus({
      key, value, target, source,
    });
    return {
      key,
      value: valueData,
      status: statusData,
    };
  });
  const diffTarget = Object.entries(target)
    .filter(([key, value]) => typeof value !== 'object' || typeof source[key] !== 'object')
    .filter(([key, value]) => {
      const status = getStatus({
        key, value, source, target,
      });
      return status === statuses.added;
    })
    .map(([key, value]) => ({ key, value, status: statuses.added }));

  return _.sortBy([...diffSource, ...diffTarget], 'key');
};

export default compare;
