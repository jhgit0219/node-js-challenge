/**
 * Challenge B - Modules
 *
 * Tests for creating a new module from scratch.
 * Run with: npm run test:b
 *
 * YOU MUST CREATE: src/utils/formatters.js
 */

import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

describe('Challenge B - Create formatters.js Module', () => {
  describe('Part 1: File Creation', () => {
    test('src/utils/formatters.js should exist (YOU MUST CREATE THIS FILE)', () => {
      const filePath = path.join(rootDir, 'src', 'utils', 'formatters.js');
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  describe('Part 2: Export formatLifeSpan', () => {
    test('should export formatLifeSpan as a named export', async () => {
      const module = await import('../src/utils/formatters.js');
      expect(module.formatLifeSpan).toBeDefined();
      expect(typeof module.formatLifeSpan).toBe('function');
    });

    test('formatLifeSpan({ min: 10, max: 14 }) should return "10-14 years"', async () => {
      const { formatLifeSpan } = await import('../src/utils/formatters.js');
      expect(formatLifeSpan({ min: 10, max: 14 })).toBe('10-14 years');
    });

    test('formatLifeSpan({ min: 8, max: 12 }) should return "8-12 years"', async () => {
      const { formatLifeSpan } = await import('../src/utils/formatters.js');
      expect(formatLifeSpan({ min: 8, max: 12 })).toBe('8-12 years');
    });

    test('formatLifeSpan(null) should return "N/A"', async () => {
      const { formatLifeSpan } = await import('../src/utils/formatters.js');
      expect(formatLifeSpan(null)).toBe('N/A');
    });

    test('formatLifeSpan(undefined) should return "N/A"', async () => {
      const { formatLifeSpan } = await import('../src/utils/formatters.js');
      expect(formatLifeSpan(undefined)).toBe('N/A');
    });
  });

  describe('Part 3: Export formatWeight', () => {
    test('should export formatWeight as a named export', async () => {
      const module = await import('../src/utils/formatters.js');
      expect(module.formatWeight).toBeDefined();
      expect(typeof module.formatWeight).toBe('function');
    });

    test('formatWeight({ min: 25, max: 35 }) should return "25-35 kg"', async () => {
      const { formatWeight } = await import('../src/utils/formatters.js');
      expect(formatWeight({ min: 25, max: 35 })).toBe('25-35 kg');
    });

    test('formatWeight({ min: 10, max: 20 }) should return "10-20 kg"', async () => {
      const { formatWeight } = await import('../src/utils/formatters.js');
      expect(formatWeight({ min: 10, max: 20 })).toBe('10-20 kg');
    });

    test('formatWeight(null) should return "N/A"', async () => {
      const { formatWeight } = await import('../src/utils/formatters.js');
      expect(formatWeight(null)).toBe('N/A');
    });

    test('formatWeight(undefined) should return "N/A"', async () => {
      const { formatWeight } = await import('../src/utils/formatters.js');
      expect(formatWeight(undefined)).toBe('N/A');
    });
  });

  describe('Part 4: Export formatHypoallergenic', () => {
    test('should export formatHypoallergenic as a named export', async () => {
      const module = await import('../src/utils/formatters.js');
      expect(module.formatHypoallergenic).toBeDefined();
      expect(typeof module.formatHypoallergenic).toBe('function');
    });

    test('formatHypoallergenic(true) should return "Yes"', async () => {
      const { formatHypoallergenic } = await import('../src/utils/formatters.js');
      expect(formatHypoallergenic(true)).toBe('Yes');
    });

    test('formatHypoallergenic(false) should return "No"', async () => {
      const { formatHypoallergenic } = await import('../src/utils/formatters.js');
      expect(formatHypoallergenic(false)).toBe('No');
    });
  });
});
