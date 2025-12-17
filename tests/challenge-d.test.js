/**
 * Challenge D - Async/Await
 *
 * Tests for the delayedAction() async function.
 * Run with: npm run test:d
 */

import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { delayedAction, retryWithDelay } from '../src/utils/wait.js';

describe('Challenge D - Async/Await (delayedAction function)', () => {
  // Capture console.log output
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Basic Functionality', () => {
    test('delayedAction should be an async function', () => {
      // Check that it returns a Promise
      const result = delayedAction(10);
      expect(result).toBeInstanceOf(Promise);
    });

    test('delayedAction should return the ms value', async () => {
      const result = await delayedAction(50);
      expect(result).toBe(50);
    });

    test('delayedAction should wait for the specified time', async () => {
      const start = Date.now();
      await delayedAction(100);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(90);
    });
  });

  describe('Console Output', () => {
    test('delayedAction should log "Starting..."', async () => {
      await delayedAction(10);

      expect(consoleSpy).toHaveBeenCalledWith('Starting...');
    });

    test('delayedAction should log "Done!"', async () => {
      await delayedAction(10);

      expect(consoleSpy).toHaveBeenCalledWith('Done!');
    });

    test('delayedAction should log in correct order', async () => {
      await delayedAction(10);

      const calls = consoleSpy.mock.calls.map(call => call[0]);
      const startIndex = calls.indexOf('Starting...');
      const doneIndex = calls.indexOf('Done!');

      expect(startIndex).toBeLessThan(doneIndex);
    });
  });

  describe('Timing', () => {
    test('"Done!" should be logged after the wait period', async () => {
      const start = Date.now();
      let doneLoggedAt = 0;

      consoleSpy.mockImplementation((msg) => {
        if (msg === 'Done!') {
          doneLoggedAt = Date.now() - start;
        }
      });

      await delayedAction(100);

      expect(doneLoggedAt).toBeGreaterThanOrEqual(90);
    });
  });
});

describe('Challenge D Bonus - retryWithDelay function', () => {
  describe('Successful execution', () => {
    test('should return result on first successful attempt', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');

      const result = await retryWithDelay(mockFn, 3, 10);

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Retry behavior', () => {
    test('should retry on failure', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockRejectedValueOnce(new Error('fail 2'))
        .mockResolvedValue('success');

      const result = await retryWithDelay(mockFn, 3, 10);

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    test('should throw after max retries exceeded', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('always fails'));

      await expect(retryWithDelay(mockFn, 3, 10)).rejects.toThrow('always fails');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    test('should wait between retries', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success');

      const start = Date.now();
      await retryWithDelay(mockFn, 3, 50);
      const elapsed = Date.now() - start;

      // Should have waited at least once (50ms)
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });
  });
});
