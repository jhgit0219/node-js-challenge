/**
 * Dog Service
 *
 * Challenge E - HTTP Requests
 *
 * This module handles all API calls to the Dog API.
 * It provides functions to fetch dog breeds and facts.
 *
 * API Base URL: https://dogapi.dog/api/v2
 *
 * Endpoints:
 * - GET /breeds - List all breeds
 * - GET /breeds/:id - Get a specific breed
 * - GET /facts?limit=N - Get random dog facts
 */

const API_BASE_URL = 'https://dogapi.dog/api/v2';

/**
 * Fetches all dog breeds from the API
 *
 * @returns {Promise<Array>} Array of breed data objects
 * @throws {Error} If the fetch fails
 *
 * Expected response format:
 * {
 *   data: [
 *     { id: "...", type: "breed", attributes: { name: "...", ... } },
 *     ...
 *   ]
 * }
 *
 * Your function should:
 * 1. Fetch from API_BASE_URL + '/breeds'
 * 2. Check if response is ok (response.ok)
 * 3. If not ok, throw an Error with message "Failed to fetch breeds"
 * 4. Parse and return the data array from the response
 */
export async function fetchBreeds() {
  // TODO: Implement this function
  // Use fetch() with async/await
  // Remember to handle errors!
}

/**
 * Fetches a single dog breed by ID
 *
 * @param {string} id - The breed ID (UUID format)
 * @returns {Promise<object>} The breed data object
 * @throws {Error} If the breed is not found or fetch fails
 *
 * Expected response format:
 * {
 *   data: { id: "...", type: "breed", attributes: { name: "...", ... } }
 * }
 *
 * Your function should:
 * 1. Fetch from API_BASE_URL + '/breeds/' + id
 * 2. If response status is 404, throw Error "Breed not found"
 * 3. If response is not ok, throw Error "Failed to fetch breed"
 * 4. Parse and return the data object from the response
 */
export async function fetchBreedById(id) {
  // TODO: Implement this function
  // Handle 404 separately from other errors
}

/**
 * Fetches random dog facts
 *
 * @param {number} limit - Number of facts to fetch (1-5, default 1)
 * @returns {Promise<Array>} Array of fact objects
 * @throws {Error} If the fetch fails
 *
 * Expected response format:
 * {
 *   data: [
 *     { id: "...", type: "fact", attributes: { body: "..." } },
 *     ...
 *   ]
 * }
 *
 * Your function should:
 * 1. Fetch from API_BASE_URL + '/facts?limit=' + limit
 * 2. Check if response is ok
 * 3. If not ok, throw Error "Failed to fetch facts"
 * 4. Parse and return the data array from the response
 */
export async function fetchFacts(limit = 1) {
  // TODO: Implement this function
  // Don't forget to add the limit query parameter!
}

/**
 * Bonus: Fetch breed with retry logic
 *
 * Uses the retryWithDelay utility to fetch a breed with automatic retries
 *
 * @param {string} id - The breed ID
 * @param {number} maxRetries - Maximum retry attempts (default 3)
 * @returns {Promise<object>} The breed data object
 */
export async function fetchBreedWithRetry(id, maxRetries = 3) {
  // TODO (BONUS): Implement using retryWithDelay from utils/wait.js
  // Import and use: import { retryWithDelay } from '../utils/wait.js';
}

// Export the base URL for testing purposes
export { API_BASE_URL };
