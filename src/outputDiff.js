import getFormat from './getFormat.js';
import genDiff from './genDiff.js';
import logger from './logger.js';

const outputDiff = (filepaths, formatType) => {
  const format = getFormat(formatType);
  const diff = genDiff(filepaths);
  logger(format(diff));
};

export default outputDiff;
