import fs from 'fs';
import path from 'path';
import compare from './compare.js';
import getParse from './getParse.js';

const genDiff = (paths) => {
  const items = paths.map((filepath) => {
    const contents = fs.readFileSync(path.resolve(filepath), 'utf8');
    const ext = path.extname(filepath);
    const parse = getParse(ext);
    return parse(contents);
  });
  return compare(...items);
};

export default genDiff;
