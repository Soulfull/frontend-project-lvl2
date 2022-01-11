import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import compare from '../src/lib/compare.js';
import getSign from '../src/lib/getSign.js';
import toStringObject from '../src/lib/toStringObject.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const result = [
  { key: 'follow', value: false, status: 'deleted' },
  { key: 'host', value: 'hexlet.io', status: 'not modified' },
  { key: 'proxy', value: '123.234.53.22', status: 'deleted' },
  { key: 'timeout', value: 50, status: 'deleted' },
  { key: 'timeout', value: 20, status: 'added' },
  { key: 'verbose', value: true, status: 'added' },
];

test('testing compare fn', () => {
  const file1 = readFile('file1.json');
  const file2 = readFile('file2.json');
  const diffObject = compare(JSON.parse(file1), JSON.parse(file2));
  expect(diffObject).toEqual(result);
});

test('testing getSign', () => {
  expect(getSign('added')).toBe('+');
  expect(getSign('deleted')).toBe('-');
  expect(getSign('not modified')).toBe(' ');
  expect(getSign()).toBe(' ');
});

test('testing toStringObject', () => {
  expect(toStringObject(result)).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
