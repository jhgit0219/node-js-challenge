/**
 * Challenge A - Classes
 *
 * Tests for the DogBreed class implementation.
 * Run with: npm run test:a
 */

import { describe, test, expect } from '@jest/globals';
import DogBreed from '../src/classes/DogBreed.js';

describe('Challenge A - DogBreed Class', () => {
  // Sample data matching the API format
  const sampleData = {
    id: 'f9643a80-af1d-422a-9f15-18d466822053',
    name: 'Labrador Retriever',
    description: 'A friendly and outgoing breed.',
    hypoallergenic: false,
    life: { min: 10, max: 14 },
    maleWeight: { min: 29, max: 36 },
    femaleWeight: { min: 25, max: 32 }
  };

  // Sample API response format
  const sampleApiData = {
    id: 'f9643a80-af1d-422a-9f15-18d466822053',
    type: 'breed',
    attributes: {
      name: 'Labrador Retriever',
      description: 'A friendly and outgoing breed.',
      hypoallergenic: false,
      life: { min: 10, max: 14 },
      male_weight: { min: 29, max: 36 },
      female_weight: { min: 25, max: 32 }
    }
  };

  describe('Constructor', () => {
    test('should create a DogBreed instance with all properties', () => {
      const breed = new DogBreed(sampleData);

      expect(breed.id).toBe('f9643a80-af1d-422a-9f15-18d466822053');
      expect(breed.name).toBe('Labrador Retriever');
      expect(breed.description).toBe('A friendly and outgoing breed.');
      expect(breed.hypoallergenic).toBe(false);
      expect(breed.life).toEqual({ min: 10, max: 14 });
      expect(breed.maleWeight).toEqual({ min: 29, max: 36 });
      expect(breed.femaleWeight).toEqual({ min: 25, max: 32 });
    });

    test('should handle hypoallergenic breeds', () => {
      const hypoData = { ...sampleData, hypoallergenic: true };
      const breed = new DogBreed(hypoData);

      expect(breed.hypoallergenic).toBe(true);
    });
  });

  describe('getLifeSpan()', () => {
    test('should return formatted life span string', () => {
      const breed = new DogBreed(sampleData);
      expect(breed.getLifeSpan()).toBe('10-14 years');
    });

    test('should handle different life span values', () => {
      const data = { ...sampleData, life: { min: 8, max: 12 } };
      const breed = new DogBreed(data);
      expect(breed.getLifeSpan()).toBe('8-12 years');
    });
  });

  describe('getMaleWeight()', () => {
    test('should return formatted male weight string', () => {
      const breed = new DogBreed(sampleData);
      expect(breed.getMaleWeight()).toBe('29-36 kg');
    });
  });

  describe('getFemaleWeight()', () => {
    test('should return formatted female weight string', () => {
      const breed = new DogBreed(sampleData);
      expect(breed.getFemaleWeight()).toBe('25-32 kg');
    });
  });

  describe('isHypoallergenic()', () => {
    test('should return "No" for non-hypoallergenic breeds', () => {
      const breed = new DogBreed(sampleData);
      expect(breed.isHypoallergenic()).toBe('No');
    });

    test('should return "Yes" for hypoallergenic breeds', () => {
      const data = { ...sampleData, hypoallergenic: true };
      const breed = new DogBreed(data);
      expect(breed.isHypoallergenic()).toBe('Yes');
    });
  });

  describe('describe()', () => {
    test('should return a full description string', () => {
      const breed = new DogBreed(sampleData);
      const description = breed.describe();

      expect(description).toContain('Labrador Retriever');
      expect(description).toContain('A friendly and outgoing breed.');
      expect(description).toContain('10-14 years');
      expect(description).toMatch(/hypoallergenic.*no/i);
    });
  });

  describe('fromApiResponse() static method', () => {
    test('should create DogBreed from API response format', () => {
      const breed = DogBreed.fromApiResponse(sampleApiData);

      expect(breed).toBeInstanceOf(DogBreed);
      expect(breed.id).toBe('f9643a80-af1d-422a-9f15-18d466822053');
      expect(breed.name).toBe('Labrador Retriever');
      expect(breed.description).toBe('A friendly and outgoing breed.');
      expect(breed.hypoallergenic).toBe(false);
      expect(breed.life).toEqual({ min: 10, max: 14 });
      expect(breed.maleWeight).toEqual({ min: 29, max: 36 });
      expect(breed.femaleWeight).toEqual({ min: 25, max: 32 });
    });

    test('should handle snake_case to camelCase conversion for weights', () => {
      const breed = DogBreed.fromApiResponse(sampleApiData);

      // The API uses snake_case (male_weight, female_weight)
      // but our class should store as camelCase (maleWeight, femaleWeight)
      expect(breed.maleWeight).toBeDefined();
      expect(breed.femaleWeight).toBeDefined();
    });
  });
});
