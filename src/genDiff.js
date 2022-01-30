import fs from 'fs';
import path from 'path';
import compare from './lib/compare.js';
import toStringObject from './lib/toStringObject.js';
import getParse from './parsers/getParse.js';

export const genDiff = (paths) => {
  const items = paths.map((filepath) => {
    const contents = fs.readFileSync(path.resolve(filepath), 'utf8');
    const ext = path.extname(filepath);
    const parse = getParse(ext);
    return parse(contents);
  });
  const diff = compare(...items);
  return toStringObject(diff);
};

export const logDiff = (paths) => {
  const diff = genDiff(paths);
  console.log(diff);
};
