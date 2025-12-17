/**
 * Challenge F - Error Handling
 *
 * Tests for validation functions with proper error handling.
 * Run with: npm run test:f
 */

import {
  validateBreedId,
  validateLimit,
  safeExecute,
  validateBreedData
} from '../src/utils/validators.js';

describe('Challenge F - Error Handling (validators)', () => {
  describe('validateBreedId()', () => {
    const validUUID = 'f9643a80-af1d-422a-9f15-18d466822053';

    describe('Valid inputs', () => {
      test('should return valid UUID unchanged', () => {
        const result = validateBreedId(validUUID);
        expect(result).toBe(validUUID);
      });

      test('should trim whitespace from valid UUID', () => {
        const result = validateBreedId(`  ${validUUID}  `);
        expect(result).toBe(validUUID);
      });

      test('should accept uppercase UUIDs', () => {
        const upperUUID = validUUID.toUpperCase();
        const result = validateBreedId(upperUUID);
        expect(result).toBe(upperUUID);
      });
    });

    describe('Invalid inputs - Required', () => {
      test('should throw "Breed ID is required" for null', () => {
        expect(() => validateBreedId(null)).toThrow('Breed ID is required');
      });

      test('should throw "Breed ID is required" for undefined', () => {
        expect(() => validateBreedId(undefined)).toThrow('Breed ID is required');
      });

      test('should throw "Breed ID is required" for empty string', () => {
        expect(() => validateBreedId('')).toThrow('Breed ID is required');
      });

      test('should throw "Breed ID is required" for whitespace only', () => {
        expect(() => validateBreedId('   ')).toThrow('Breed ID is required');
      });
    });

    describe('Invalid inputs - Type', () => {
      test('should throw "Breed ID must be a string" for number', () => {
        expect(() => validateBreedId(123)).toThrow('Breed ID must be a string');
      });

      test('should throw "Breed ID must be a string" for object', () => {
        expect(() => validateBreedId({})).toThrow('Breed ID must be a string');
      });

      test('should throw "Breed ID must be a string" for array', () => {
        expect(() => validateBreedId([])).toThrow('Breed ID must be a string');
      });
    });

    describe('Invalid inputs - Format', () => {
      test('should throw "Invalid breed ID format" for non-UUID string', () => {
        expect(() => validateBreedId('invalid-id')).toThrow('Invalid breed ID format');
      });

      test('should throw "Invalid breed ID format" for partial UUID', () => {
        expect(() => validateBreedId('f9643a80-af1d')).toThrow('Invalid breed ID format');
      });

      test('should throw "Invalid breed ID format" for UUID with wrong characters', () => {
        expect(() => validateBreedId('g9643a80-af1d-422a-9f15-18d466822053')).toThrow('Invalid breed ID format');
      });
    });
  });

  describe('validateLimit()', () => {
    describe('Valid inputs', () => {
      test('should return number for valid number input', () => {
        expect(validateLimit(3)).toBe(3);
      });

      test('should convert string to number', () => {
        expect(validateLimit('3')).toBe(3);
      });

      test('should accept minimum value (1)', () => {
        expect(validateLimit(1)).toBe(1);
      });

      test('should accept maximum value (5 by default)', () => {
        expect(validateLimit(5)).toBe(5);
      });

      test('should accept custom maxLimit', () => {
        expect(validateLimit(10, 10)).toBe(10);
      });
    });

    describe('Invalid inputs - Type', () => {
      test('should throw "Limit must be a number" for non-numeric string', () => {
        expect(() => validateLimit('abc')).toThrow('Limit must be a number');
      });

      test('should throw "Limit must be a number" for NaN', () => {
        expect(() => validateLimit(NaN)).toThrow('Limit must be a number');
      });

      test('should throw "Limit must be a number" for null', () => {
        expect(() => validateLimit(null)).toThrow('Limit must be a number');
      });
    });

    describe('Invalid inputs - Range', () => {
      test('should throw for value less than 1', () => {
        expect(() => validateLimit(0)).toThrow('Limit must be between 1 and 5');
      });

      test('should throw for negative value', () => {
        expect(() => validateLimit(-1)).toThrow('Limit must be between 1 and 5');
      });

      test('should throw for value greater than maxLimit', () => {
        expect(() => validateLimit(6)).toThrow('Limit must be between 1 and 5');
      });

      test('should include custom maxLimit in error message', () => {
        expect(() => validateLimit(15, 10)).toThrow('Limit must be between 1 and 10');
      });
    });
  });

  describe('safeExecute()', () => {
    test('should return success object on successful execution', async () => {
      const mockFn = jest.fn().mockResolvedValue('test data');

      const result = await safeExecute(mockFn);

      expect(result).toEqual({
        success: true,
        data: 'test data'
      });
    });

    test('should return error object on failed execution', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('test error'));

      const result = await safeExecute(mockFn);

      expect(result).toEqual({
        success: false,
        error: 'test error'
      });
    });

    test('should handle sync functions', async () => {
      const mockFn = jest.fn().mockReturnValue('sync result');

      const result = await safeExecute(mockFn);

      expect(result).toEqual({
        success: true,
        data: 'sync result'
      });
    });

    test('should catch thrown errors', async () => {
      const mockFn = jest.fn().mockImplementation(() => {
        throw new Error('thrown error');
      });

      const result = await safeExecute(mockFn);

      expect(result.success).toBe(false);
      expect(result.error).toBe('thrown error');
    });
  });

  describe('validateBreedData()', () => {
    describe('Valid inputs', () => {
      test('should return valid data object', () => {
        const data = { name: 'Labrador' };
        expect(validateBreedData(data)).toEqual(data);
      });

      test('should accept data with additional properties', () => {
        const data = { name: 'Labrador', description: 'Friendly dog' };
        expect(validateBreedData(data)).toEqual(data);
      });
    });

    describe('Invalid inputs - Required', () => {
      test('should throw "Breed data is required" for null', () => {
        expect(() => validateBreedData(null)).toThrow('Breed data is required');
      });

      test('should throw "Breed data is required" for undefined', () => {
        expect(() => validateBreedData(undefined)).toThrow('Breed data is required');
      });
    });

    describe('Invalid inputs - Type', () => {
      test('should throw "Breed data must be an object" for string', () => {
        expect(() => validateBreedData('string')).toThrow('Breed data must be an object');
      });

      test('should throw "Breed data must be an object" for number', () => {
        expect(() => validateBreedData(123)).toThrow('Breed data must be an object');
      });

      test('should throw "Breed data must be an object" for array', () => {
        expect(() => validateBreedData([])).toThrow('Breed data must be an object');
      });
    });

    describe('Invalid inputs - Missing name', () => {
      test('should throw "Breed name is required" for empty object', () => {
        expect(() => validateBreedData({})).toThrow('Breed name is required');
      });

      test('should throw "Breed name is required" for object without name', () => {
        expect(() => validateBreedData({ description: 'test' })).toThrow('Breed name is required');
      });
    });
  });
});
