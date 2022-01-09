const getSign = (status) => {
  switch (status) {
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    case 'not modified':
    default:
      return ' ';
  }
};

export default getSign;
