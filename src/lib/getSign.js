export const statuses = {
  removed: 'removed',
  equal: 'equal',
  modified: 'modified',
  added: 'added',
};

export const getSign = (status) => {
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
