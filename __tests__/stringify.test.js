import { test, expect } from '@jest/globals';
import stringify from '../src/lib/stringifyObject.js';

test('primitive values', () => {
  expect(stringify(true)).toBe('true');
  expect(stringify('foo')).toBe('foo');
  expect(stringify(5)).toBe('5');
  expect(stringify(null)).toBe('null');
  expect(stringify(undefined)).toBe('undefined');
});

test('arrays', () => {
  expect(stringify([])).toBe('[]');
  expect(stringify([1, 2, 'foo', true, null])).toBe('[1,2,foo,true,null]');
  expect(stringify([[1, 2], ['foo', false]])).toBe('[[1,2],[foo,false]]');
});

test('flat object', () => {
  expect(stringify({})).toBe('{}');
  expect(stringify({
    a: 1, b: null, c: true, f: 'foo', d: undefined,
  })).toBe(`{
 a: 1
 b: null
 c: true
 f: foo
 d: undefined
}`);
  expect(stringify({
    a: 1, b: null, c: true, f: 'foo', d: undefined,
  }, '-', 2)).toBe(`{
--a: 1
--b: null
--c: true
--f: foo
--d: undefined
}`);
});

test('nested object', () => {
  const obj = { a: 1, b: { c: 10, d: 'foo', f: [1, 2, 3] } };
  expect(stringify(obj)).toBe(`{
 a: 1
 b: {
  c: 10
  d: foo
  f: [1,2,3]
 }
}`);
  expect(stringify(obj, '-|', 2)).toBe(`{
-|-|a: 1
-|-|b: {
-|-|-|-|c: 10
-|-|-|-|d: foo
-|-|-|-|f: [1,2,3]
-|-|}
}`);
});
