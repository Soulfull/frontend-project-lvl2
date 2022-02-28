import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultStylish = fs.readFileSync(getFixturePath('result_stylish.txt'), 'utf8');
const resultPlain = fs.readFileSync(getFixturePath('result_plain.txt'), 'utf8');

test('diff stylish .json nested files', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(diff).toEqual(resultStylish);
});

test('diff stylish .yaml nested files', () => {
  const diff = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(diff).toEqual(resultStylish);
});

test('diff plain format', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(diff).toEqual(resultPlain);
});

test('json formatter', () => {
  const diff = [{
    a: 1, b: 'test', c: null,
  }, [{ dd: [{ cav: [] }] }]];
  expect(json(diff)).toEqual(JSON.stringify(diff));
});

test('diff json format', () => {
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(() => JSON.parse(diff)).not.toThrow();
});
