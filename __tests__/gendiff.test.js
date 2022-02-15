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
