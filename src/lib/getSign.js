export const getSign = (status) => {
  switch (status) {
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    case 'not modified':
      return ' ';
  }
};