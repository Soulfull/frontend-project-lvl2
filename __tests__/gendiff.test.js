import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect, jest } from '@jest/globals';
import { genDiff, logDiff } from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff .json files', () => {
  expect(genDiff([getFixturePath('file1.json'), getFixturePath('file2.json')])).toMatchSnapshot();
});

test('diff .yaml and .yml files', () => {
  expect(genDiff([getFixturePath('file1.yaml'), getFixturePath('file2.yml')])).toMatchSnapshot();
});

test('logDiff. console.log should be called', () => {
  console.log = jest.fn();
  logDiff([getFixturePath('file1.json'), getFixturePath('file2.json')]);
  expect(console.log).toBeCalled();
  expect(console.log.mock.calls[0][0]).toMatchSnapshot();
});

test('diff .json nested files', () => {
  const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(genDiff([getFixturePath('fileNested1.json'), getFixturePath('fileNested2.json')])).toBe(result);
});
