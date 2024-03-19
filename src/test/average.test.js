const { test, describe } = require('node:test');
const assert = require('node:assert');
const average = require('../utils/testing').average;

describe('average', () => {
  test('test rata rata', () => {
    assert.strictEqual(average([1]), 1);
  });
  test('test rata rata', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5);
  });
  test('test rata rata', () => {
    assert.strictEqual(average([]), 0);
  });
});
