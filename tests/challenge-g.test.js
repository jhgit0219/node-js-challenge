/**
 * Challenge G - Final Combined Project
 *
 * Integration tests that verify all components work together.
 * Run with: npm run test:g
 *
 * This tests:
 * - Classes + Modules working together
 * - API calls with proper error handling
 * - Async/await patterns throughout
 */

import { jest, describe, test, expect } from '@jest/globals';
import DogBreed from '../src/classes/DogBreed.js';
import { fetchBreeds, fetchBreedById, fetchFacts } from '../src/services/dogService.js';
import { wait } from '../src/utils/wait.js';
import { validateBreedId, safeExecute } from '../src/utils/validators.js';

describe('Challenge G - Final Combined Project', () => {
  // Increase timeout for API calls
  jest.setTimeout(20000);

  describe('Integration: Fetch breeds and create DogBreed instances', () => {
    test('should fetch breeds and convert to DogBreed objects', async () => {
      // Fetch breeds from API
      const breedsData = await fetchBreeds();
      expect(breedsData.length).toBeGreaterThan(0);

      // Convert to DogBreed instances
      const breeds = breedsData.map(data => DogBreed.fromApiResponse(data));

      // Verify each is a proper DogBreed instance
      breeds.forEach(breed => {
        expect(breed).toBeInstanceOf(DogBreed);
        expect(typeof breed.name).toBe('string');
        expect(typeof breed.getLifeSpan()).toBe('string');
      });
    });

    test('should be able to describe all fetched breeds', async () => {
      const breedsData = await fetchBreeds();
      const breeds = breedsData.slice(0, 3).map(data => DogBreed.fromApiResponse(data));

      breeds.forEach(breed => {
        const description = breed.describe();
        expect(typeof description).toBe('string');
        expect(description.length).toBeGreaterThan(0);
        expect(description).toContain(breed.name);
      });
    });
  });

  describe('Integration: Fetch single breed with validation', () => {
    test('should validate ID before fetching breed', async () => {
      // First get a valid ID
      const breeds = await fetchBreeds();
      const validId = breeds[0].id;

      // Validate it
      const validatedId = validateBreedId(validId);
      expect(validatedId).toBe(validId);

      // Fetch the breed
      const breed = await fetchBreedById(validatedId);
      expect(breed.id).toBe(validId);
    });

    test('should reject invalid IDs before making API call', async () => {
      const invalidId = 'not-a-valid-uuid';

      expect(() => validateBreedId(invalidId)).toThrow('Invalid breed ID format');
    });

    test('should handle breed not found gracefully', async () => {
      const validButNonExistentId = '00000000-0000-0000-0000-000000000000';

      // Validate passes (format is correct)
      const validatedId = validateBreedId(validButNonExistentId);
      expect(validatedId).toBe(validButNonExistentId);

      // But fetch fails with "Breed not found"
      await expect(fetchBreedById(validatedId)).rejects.toThrow('Breed not found');
    });
  });

  describe('Integration: Safe execution with API calls', () => {
    test('should safely execute successful API calls', async () => {
      const result = await safeExecute(() => fetchFacts(1));

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });

    test('should safely handle failed API calls', async () => {
      const result = await safeExecute(() =>
        fetchBreedById('00000000-0000-0000-0000-000000000000')
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Breed not found');
    });
  });

  describe('Integration: Async operations with timing', () => {
    test('should be able to add artificial delay to API operations', async () => {
      const start = Date.now();

      // Simulate loading delay
      await wait(100);
      const breeds = await fetchBreeds();

      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(100);
      expect(breeds.length).toBeGreaterThan(0);
    });

    test('should handle parallel async operations', async () => {
      const start = Date.now();

      // Fetch breeds and facts in parallel
      const [breeds, facts] = await Promise.all([
        fetchBreeds(),
        fetchFacts(2)
      ]);

      const elapsed = Date.now() - start;

      // Both should complete
      expect(breeds.length).toBeGreaterThan(0);
      expect(facts.length).toBe(2);

      // Parallel should be faster than sequential (within reason for network)
      // Just verify it completed
      expect(elapsed).toBeGreaterThan(0);
    });
  });

  describe('Integration: Full workflow simulation', () => {
    test('should simulate complete page load workflow', async () => {
      // 1. Fetch all breeds
      const breedsData = await fetchBreeds();
      expect(breedsData.length).toBeGreaterThan(0);

      // 2. Convert to DogBreed instances
      const breeds = breedsData.map(data => DogBreed.fromApiResponse(data));

      // 3. Get first breed ID for detail view
      const firstBreedId = breeds[0].id;

      // 4. Validate the ID
      const validatedId = validateBreedId(firstBreedId);

      // 5. Fetch breed details
      const breedDetail = await fetchBreedById(validatedId);

      // 6. Convert to DogBreed instance
      const detailedBreed = DogBreed.fromApiResponse(breedDetail);

      // 7. Verify we can access all information
      expect(detailedBreed.name).toBe(breeds[0].name);
      expect(typeof detailedBreed.getLifeSpan()).toBe('string');
      expect(typeof detailedBreed.isHypoallergenic()).toBe('string');
      expect(typeof detailedBreed.describe()).toBe('string');
    });

    test('should simulate page load with random fact', async () => {
      // Parallel fetch of breeds and facts (like a real page load)
      const [breedsData, factsData] = await Promise.all([
        fetchBreeds(),
        fetchFacts(1)
      ]);

      // Convert breeds
      const breeds = breedsData.map(data => DogBreed.fromApiResponse(data));

      // Get fact text
      const factText = factsData[0].attributes.body;

      // Verify both are available
      expect(breeds.length).toBeGreaterThan(0);
      expect(typeof factText).toBe('string');
      expect(factText.length).toBeGreaterThan(0);
    });
  });

  describe('Complete Application Test', () => {
    test('should demonstrate all challenge concepts', async () => {
      // Challenge A & B: Classes and Modules
      const breedsData = await fetchBreeds();
      const firstBreed = DogBreed.fromApiResponse(breedsData[0]);
      expect(firstBreed).toBeInstanceOf(DogBreed);

      // Challenge C & D: Promises and Async/Await
      await wait(10);

      // Challenge E: HTTP Requests
      const facts = await fetchFacts(1);
      expect(facts.length).toBe(1);

      // Challenge F: Error Handling
      const validId = validateBreedId(firstBreed.id);
      expect(validId).toBe(firstBreed.id);

      // Challenge G: All combined
      const safeResult = await safeExecute(async () => {
        const breedData = await fetchBreedById(validId);
        return DogBreed.fromApiResponse(breedData);
      });

      expect(safeResult.success).toBe(true);
      expect(safeResult.data).toBeInstanceOf(DogBreed);
      expect(safeResult.data.name).toBe(firstBreed.name);
    });
  });
});
