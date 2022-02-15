import _ from 'lodash';
import { statuses } from './getSign.js';

// const diff = [
//   {
//     key: 'timeout',
//     value: '50',
//     meta: 'removed',
//   },
//   {
//     key: 'timeout',
//     value: '20',
//     meta: 'added',
//   },
//   {
//     key: 'proxy',
//     value: '123.234.53.22',
//     meta: 'removed',
//   },
//   {
//     key: 'data',
//     value: {
//       key: 'test',
//       value: {
//         key: 'dog',
//         value: 'woof',
//         meta: 'added',
//       },
//       meta: 'added',
//     },
//     meta: 'removed',
//   },
// ];
// const d1 = {
//   common: {
//     setting1: 'Value 1',
//     setting2: 200,
//     setting3: true,
//     setting6: {
//       key: 'value',
//       doge: {
//         wow: '',
//       },
//     },
//   },
//   group1: {
//     baz: 'bas',
//     foo: 'bar',
//     nest: {
//       key: 'value',
//     },
//   },
//   group2: {
//     abc: 12345,
//     deep: {
//       id: 45,
//     },
//   },
// };
// const d2 = {
//   common: {
//     follow: false,
//     setting1: 'Value 1',
//     setting3: null,
//     setting4: 'blah blah',
//     setting5: {
//       key5: 'value5',
//     },
//     setting6: {
//       key: 'value',
//       ops: 'vops',
//       doge: {
//         wow: 'so much',
//       },
//     },
//   },
//   group1: {
//     foo: 'bar',
//     baz: 'bars',
//     nest: 'str',
//   },
//   group3: {
//     deep: {
//       id: {
//         number: 45,
//       },
//     },
//     fee: 100500,
//   },
// };

/*
{
  a: 1,
  b: 2,
  c: 3
}

{
  a: 2,
  c: 3,
  d: 4
}

diff = {
  - a: 1
  + a: 2
  - b: 2
    c: 3
  + d: 4
}

*/

// const diffData = [
//   { key: 'a', value: 1, status: 'removed' },
//   { key: 'a', value: 2, status: 'added' },
//   { key: 'b', value: 2, status: 'removed' },
//   { key: 'c', value: 3, status: 'not_modified' },
//   { key: 'd', value: 4, status: 'added' },
// ];

// const diffNestedData = [
//   {
//     key: 'a',
//     value: [
//       { key: 'dd', value: 10, status: 'removed' },
//       { key: 'dd', value: 11, status: 'added' },
//     ],
//   },
//   { key: 'a', value: 2, status: 'added' },
//   { key: 'b', value: 2, status: 'removed' },
//   { key: 'c', value: 3, status: 'not_modified' },
//   { key: 'd', value: 4, status: 'added' },
// ];

// const dd1 = {
//   a: 1,
//   b: 2,
//   c: 3,
// };

// const dd2 = {
//   a: 2,
//   c: 3,
//   d: 4,
// };

const getSourceStatus = ({ key, value, target }) => {
  const isRemoved = !(`${key}` in target) || !_.isEqual(value, target[key]);
  return isRemoved ? statuses.removed : statuses.equal;
};

const getTargetStatus = ({ key, value, source }) => {
  const isAdded = !(`${key}` in source) || !_.isEqual(value, source[key]);
  return isAdded ? statuses.added : statuses.equal;
};

const compare = (source, target) => {
  const diffSource = Object.entries(source).map(([key, value]) => {
    const status = getSourceStatus({
      key, value, target,
    });
    return { key, value, status };
  });
  const diffTarget = Object.entries(target)
    .filter(([key, value]) => {
      const status = getTargetStatus({ key, value, source });
      return status === statuses.added;
    })
    .map(([key, value]) => ({ key, value, status: statuses.added }));

  return _.sortBy([...diffSource, ...diffTarget], 'key');
};

export default compare;
