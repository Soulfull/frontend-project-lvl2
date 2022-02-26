import fs from 'fs';
import path from 'path';
import compare from './compare.js';
import getParse from './parsers/index.js';
import getFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatType) => {
  const paths = [filepath1, filepath2];
  const items = paths.map((filepath) => {
    const contents = fs.readFileSync(path.resolve(filepath), 'utf8');
    const ext = path.extname(filepath);
    const parse = getParse(ext);
    return parse(contents);
  });
  const diff = compare(...items);
  const format = getFormat(formatType);
  return format(diff);
};

export default genDiff;
