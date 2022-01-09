import fs from 'fs';
import path from 'path';
import compare from './lib/compare.js';
import toStringObject from './lib/toStringObject.js';

const genDiff = (path1, path2) => {
  const data1 = fs.readFileSync(path.resolve(path1), 'utf8');
  const data2 = fs.readFileSync(path.resolve(path2), 'utf8');
  const diff = compare(JSON.parse(data1), JSON.parse(data2));
  return console.log(toStringObject(diff));
};

export default genDiff;
