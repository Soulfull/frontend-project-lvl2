import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff .json files', () => {
  const diff = genDiff([getFixturePath('fileNested1.json'), getFixturePath('fileNested2.json')]);
  expect(diff).toMatchSnapshot();
});

test('diff .yaml and .yml files', () => {
  const diff = genDiff([getFixturePath('file1.yaml'), getFixturePath('file2.yml')]);
  expect(diff).toMatchSnapshot();
});

test('diff stylish .json nested files', () => {
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
  const diff = genDiff([getFixturePath('fileNested1.json'), getFixturePath('fileNested2.json')]);
  expect(diff).toBe(result);
});

test('diff plain format', () => {
  const expectedResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  const diff = genDiff([getFixturePath('fileNested1.json'), getFixturePath('fileNested2.json')], 'plain');
  expect(diff).toBe(expectedResult);
});

test('json formatter', () => {
  const diff = [{
    a: 1, b: 'test', c: null,
  }, [{ dd: [{ cav: [] }] }]];
  expect(json(diff)).toBe(JSON.stringify(diff));
});

test('diff json format', () => {
  const expectedResult = '[{"key":"common","value":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"equal"},{"key":"setting2","value":200,"status":"removed"},{"key":"setting3","value":true,"status":"updated","updatedValue":null},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"status":"added"},{"key":"setting6","value":[{"key":"doge","value":[{"key":"wow","value":"","status":"updated","updatedValue":"so much"}],"status":null},{"key":"key","value":"value","status":"equal"},{"key":"ops","value":"vops","status":"added"}],"status":null}],"status":null},{"key":"group1","value":[{"key":"baz","value":"bas","status":"updated","updatedValue":"bars"},{"key":"foo","value":"bar","status":"equal"},{"key":"nest","value":{"key":"value"},"status":"updated","updatedValue":"str"}],"status":null},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]';
  const diff = genDiff([getFixturePath('fileNested1.json'), getFixturePath('fileNested2.json')], 'json');
  expect(diff).toBe(expectedResult);
});
