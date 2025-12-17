/**
 * Challenge E - HTTP Requests
 *
 * Tests for the dogService API functions.
 * Run with: npm run test:e
 *
 * Note: These tests make real API calls to https://dogapi.dog/api/v2
 * They require an internet connection to pass.
 */

import { jest, describe, test, expect, beforeAll } from '@jest/globals';
import {
  fetchBreeds,
  fetchBreedById,
  fetchFacts,
  API_BASE_URL
} from '../src/services/dogService.js';

describe('Challenge E - HTTP Requests (dogService)', () => {
  // Increase timeout for API calls
  jest.setTimeout(15000);

  describe('API_BASE_URL', () => {
    test('should be the correct Dog API URL', () => {
      expect(API_BASE_URL).toBe('https://dogapi.dog/api/v2');
    });
  });

  describe('fetchBreeds()', () => {
    test('should return an array of breeds', async () => {
      const breeds = await fetchBreeds();

      expect(Array.isArray(breeds)).toBe(true);
      expect(breeds.length).toBeGreaterThan(0);
    });

    test('each breed should have correct structure', async () => {
      const breeds = await fetchBreeds();
      const breed = breeds[0];

      expect(breed).toHaveProperty('id');
      expect(breed).toHaveProperty('type', 'breed');
      expect(breed).toHaveProperty('attributes');
      expect(breed.attributes).toHaveProperty('name');
    });

    test('breed attributes should contain expected fields', async () => {
      const breeds = await fetchBreeds();
      const { attributes } = breeds[0];

      expect(attributes).toHaveProperty('name');
      expect(typeof attributes.name).toBe('string');
    });
  });

  describe('fetchBreedById()', () => {
    let validBreedId;

    beforeAll(async () => {
      // Get a valid breed ID from the list
      const breeds = await fetchBreeds();
      validBreedId = breeds[0].id;
    });

    test('should return a single breed object', async () => {
      const breed = await fetchBreedById(validBreedId);

      expect(breed).toHaveProperty('id', validBreedId);
      expect(breed).toHaveProperty('type', 'breed');
      expect(breed).toHaveProperty('attributes');
    });

    test('should throw "Breed not found" for non-existent ID', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';

      await expect(fetchBreedById(fakeId)).rejects.toThrow('Breed not found');
    });

    test('breed should have detailed attributes', async () => {
      const breed = await fetchBreedById(validBreedId);
      const { attributes } = breed;

      expect(attributes).toHaveProperty('name');
      expect(attributes).toHaveProperty('description');
    });
  });

  describe('fetchFacts()', () => {
    test('should return an array of facts', async () => {
      const facts = await fetchFacts();

      expect(Array.isArray(facts)).toBe(true);
      expect(facts.length).toBeGreaterThan(0);
    });

    test('should return 1 fact by default', async () => {
      const facts = await fetchFacts();

      expect(facts.length).toBe(1);
    });

    test('should return specified number of facts', async () => {
      const facts = await fetchFacts(3);

      expect(facts.length).toBe(3);
    });

    test('each fact should have correct structure', async () => {
      const facts = await fetchFacts();
      const fact = facts[0];

      expect(fact).toHaveProperty('id');
      expect(fact).toHaveProperty('type', 'fact');
      expect(fact).toHaveProperty('attributes');
      expect(fact.attributes).toHaveProperty('body');
      expect(typeof fact.attributes.body).toBe('string');
    });

    test('should respect max limit of 5', async () => {
      const facts = await fetchFacts(5);

      expect(facts.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Error Handling', () => {
    test('fetchBreeds should throw on network error', async () => {
      // Mock fetch to simulate network error
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(fetchBreeds()).rejects.toThrow();

      global.fetch = originalFetch;
    });

    test('fetchBreedById should handle 404 errors', async () => {
      const invalidId = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

      await expect(fetchBreedById(invalidId)).rejects.toThrow('Breed not found');
    });
  });
});
