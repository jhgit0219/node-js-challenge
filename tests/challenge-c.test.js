/**
 * Challenge C - Promises
 *
 * Tests for the wait() function that returns a Promise.
 * Run with: npm run test:c
 */

import { describe, test, expect } from '@jest/globals';
import { wait } from '../src/utils/wait.js';

describe('Challenge C - Promises (wait function)', () => {
  describe('Basic Functionality', () => {
    test('wait should return a Promise', () => {
      const result = wait(10);
      expect(result).toBeInstanceOf(Promise);
    });

    test('wait should resolve after specified milliseconds', async () => {
      const start = Date.now();
      await wait(100);
      const elapsed = Date.now() - start;

      // Allow some tolerance (90-150ms for a 100ms wait)
      expect(elapsed).toBeGreaterThanOrEqual(90);
      expect(elapsed).toBeLessThan(150);
    });

    test('wait(0) should resolve almost immediately', async () => {
      const start = Date.now();
      await wait(0);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(50);
    });
  });

  describe('Promise Behavior', () => {
    test('wait should resolve (not reject) under normal conditions', async () => {
      await expect(wait(10)).resolves.not.toThrow();
    });

    test('wait should work with .then() syntax', (done) => {
      const start = Date.now();

      wait(50).then(() => {
        const elapsed = Date.now() - start;
        expect(elapsed).toBeGreaterThanOrEqual(40);
        done();
      });
    });

    test('multiple wait calls should be independent', async () => {
      const start = Date.now();

      // Run two waits in parallel
      await Promise.all([wait(50), wait(50)]);

      const elapsed = Date.now() - start;

      // Should complete in ~50ms, not ~100ms (parallel, not sequential)
      expect(elapsed).toBeLessThan(100);
    });
  });

  describe('Sequential Waits', () => {
    test('sequential waits should add up', async () => {
      const start = Date.now();

      await wait(50);
      await wait(50);

      const elapsed = Date.now() - start;

      // Should be at least 100ms total
      expect(elapsed).toBeGreaterThanOrEqual(90);
    });
  });

  describe('Edge Cases', () => {
    test('wait should handle small values', async () => {
      const start = Date.now();
      await wait(1);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(0);
    });

    test('wait should resolve with undefined', async () => {
      const result = await wait(10);
      expect(result).toBeUndefined();
    });
  });
});
