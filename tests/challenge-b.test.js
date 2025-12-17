/**
 * Challenge B - Modules
 *
 * Tests for proper module structure and exports.
 * Run with: npm run test:b
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

describe('Challenge B - Module Structure', () => {
  describe('File Structure', () => {
    test('src/classes/DogBreed.js should exist', () => {
      const filePath = path.join(rootDir, 'src', 'classes', 'DogBreed.js');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('src/services/dogService.js should exist', () => {
      const filePath = path.join(rootDir, 'src', 'services', 'dogService.js');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('src/utils/wait.js should exist', () => {
      const filePath = path.join(rootDir, 'src', 'utils', 'wait.js');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('src/utils/validators.js should exist', () => {
      const filePath = path.join(rootDir, 'src', 'utils', 'validators.js');
      expect(fs.existsSync(filePath)).toBe(true);
    });

    test('src/index.js should exist', () => {
      const filePath = path.join(rootDir, 'src', 'index.js');
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  describe('DogBreed Module Exports', () => {
    test('should export DogBreed as default export', async () => {
      const module = await import('../src/classes/DogBreed.js');
      expect(module.default).toBeDefined();
      expect(typeof module.default).toBe('function');
    });

    test('DogBreed should be a class (constructor function)', async () => {
      const { default: DogBreed } = await import('../src/classes/DogBreed.js');

      // Test that it can be instantiated
      const instance = new DogBreed({
        id: 'test',
        name: 'Test Breed',
        description: 'Test',
        hypoallergenic: false,
        life: { min: 10, max: 12 },
        maleWeight: { min: 20, max: 30 },
        femaleWeight: { min: 15, max: 25 }
      });

      expect(instance).toBeInstanceOf(DogBreed);
    });
  });

  describe('dogService Module Exports', () => {
    test('should export fetchBreeds function', async () => {
      const module = await import('../src/services/dogService.js');
      expect(module.fetchBreeds).toBeDefined();
      expect(typeof module.fetchBreeds).toBe('function');
    });

    test('should export fetchBreedById function', async () => {
      const module = await import('../src/services/dogService.js');
      expect(module.fetchBreedById).toBeDefined();
      expect(typeof module.fetchBreedById).toBe('function');
    });

    test('should export fetchFacts function', async () => {
      const module = await import('../src/services/dogService.js');
      expect(module.fetchFacts).toBeDefined();
      expect(typeof module.fetchFacts).toBe('function');
    });

    test('should export API_BASE_URL constant', async () => {
      const module = await import('../src/services/dogService.js');
      expect(module.API_BASE_URL).toBeDefined();
      expect(typeof module.API_BASE_URL).toBe('string');
      expect(module.API_BASE_URL).toContain('dogapi.dog');
    });
  });

  describe('wait Module Exports', () => {
    test('should export wait function', async () => {
      const module = await import('../src/utils/wait.js');
      expect(module.wait).toBeDefined();
      expect(typeof module.wait).toBe('function');
    });

    test('should export delayedAction function', async () => {
      const module = await import('../src/utils/wait.js');
      expect(module.delayedAction).toBeDefined();
      expect(typeof module.delayedAction).toBe('function');
    });
  });

  describe('validators Module Exports', () => {
    test('should export validateBreedId function', async () => {
      const module = await import('../src/utils/validators.js');
      expect(module.validateBreedId).toBeDefined();
      expect(typeof module.validateBreedId).toBe('function');
    });

    test('should export validateLimit function', async () => {
      const module = await import('../src/utils/validators.js');
      expect(module.validateLimit).toBeDefined();
      expect(typeof module.validateLimit).toBe('function');
    });

    test('should export safeExecute function', async () => {
      const module = await import('../src/utils/validators.js');
      expect(module.safeExecute).toBeDefined();
      expect(typeof module.safeExecute).toBe('function');
    });
  });

  describe('Main Index Exports', () => {
    test('should re-export DogBreed', async () => {
      const module = await import('../src/index.js');
      expect(module.DogBreed).toBeDefined();
    });

    test('should re-export service functions', async () => {
      const module = await import('../src/index.js');
      expect(module.fetchBreeds).toBeDefined();
      expect(module.fetchBreedById).toBeDefined();
      expect(module.fetchFacts).toBeDefined();
    });

    test('should re-export utility functions', async () => {
      const module = await import('../src/index.js');
      expect(module.wait).toBeDefined();
      expect(module.delayedAction).toBeDefined();
      expect(module.validateBreedId).toBeDefined();
      expect(module.validateLimit).toBeDefined();
    });
  });
});
