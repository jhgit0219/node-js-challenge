/**
 * Main Entry Point
 *
 * Challenge G - Final Combined Project
 *
 * This file demonstrates how all the modules work together.
 * It's used for testing and as a reference implementation.
 *
 * Exports all modules for easy importing in tests.
 */

// Classes
export { default as DogBreed } from './classes/DogBreed.js';

// Services
export {
  fetchBreeds,
  fetchBreedById,
  fetchFacts,
  API_BASE_URL
} from './services/dogService.js';

// Utilities
export { wait, delayedAction, retryWithDelay } from './utils/wait.js';
export {
  validateBreedId,
  validateLimit,
  safeExecute,
  validateBreedData
} from './utils/validators.js';

/**
 * Example usage demonstrating all modules together
 *
 * This function shows how the different parts of the application
 * work together. It's commented out but can be used for testing.
 */
export async function demonstrateUsage() {
  console.log('=== Dog Breeds Library Demo ===\n');

  // 1. Fetch breeds using the service
  console.log('1. Fetching dog breeds...');
  const breedsData = await fetchBreeds();
  console.log(`   Found ${breedsData.length} breeds\n`);

  // 2. Create DogBreed instances from API data
  console.log('2. Creating DogBreed objects...');
  const breeds = breedsData.slice(0, 3).map(data => DogBreed.fromApiResponse(data));

  for (const breed of breeds) {
    console.log(`   - ${breed.describe()}`);
  }
  console.log('');

  // 3. Demonstrate wait utility
  console.log('3. Demonstrating wait utility...');
  console.log('   Waiting 1 second...');
  await wait(1000);
  console.log('   Done!\n');

  // 4. Fetch a random fact
  console.log('4. Fetching a random dog fact...');
  const facts = await fetchFacts(1);
  console.log(`   Fact: "${facts[0].attributes.body}"\n`);

  // 5. Demonstrate validation
  console.log('5. Demonstrating validation...');
  try {
    validateBreedId('invalid-id');
  } catch (error) {
    console.log(`   Invalid ID caught: "${error.message}"`);
  }

  const validId = breedsData[0].id;
  const validated = validateBreedId(validId);
  console.log(`   Valid ID: ${validated}\n`);

  console.log('=== Demo Complete ===');
}

// Uncomment to run demo:
// demonstrateUsage().catch(console.error);
