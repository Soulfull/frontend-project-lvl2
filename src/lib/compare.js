import _ from 'lodash';

const compare = (data1, data2) => {
  const diff = _.transform(data1, (result, value, key) => {
    if (_.has(data2, key) && _.isEqual(value, data2[key])) {
      result.push({
        key,
        value,
        status: 'not modified',
      });
    } else if (_.has(data2, key) && !(_.isEqual(value, data2[key]))) {
      result.push({
        key,
        value,
        status: 'deleted',
      });
      result.push({
        key,
        value: data2[key],
        status: 'added',
      });
    } else {
      result.push({
        key,
        value,
        status: 'deleted',
      });
    }
  }, []);

  const newData = Object.keys(data2)
    .filter((key) => !Object.keys(data1).includes(key))
    .map((key) => ({
      key,
      value: data2[key],
      status: 'added',
    }));

  return _.sortBy([...diff, ...newData], ['key']);
};

export default compare;
