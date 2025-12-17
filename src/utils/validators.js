/**
 * Validators
 *
 * Challenge F - Error Handling
 *
 * This module provides validation functions that throw descriptive errors
 * when validation fails. These are used throughout the application to
 * ensure data integrity.
 */

/**
 * Validates a breed ID
 *
 * A valid breed ID must:
 * - Be a non-empty string
 * - Be in UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
 *
 * @param {any} id - The ID to validate
 * @returns {string} The validated ID (trimmed)
 * @throws {Error} "Breed ID is required" if id is empty/null/undefined
 * @throws {Error} "Breed ID must be a string" if id is not a string
 * @throws {Error} "Invalid breed ID format" if id is not a valid UUID
 *
 * Example:
 *   validateBreedId("f9643a80-af1d-422a-9f15-18d466822053") // returns the ID
 *   validateBreedId("") // throws "Breed ID is required"
 *   validateBreedId(123) // throws "Breed ID must be a string"
 *   validateBreedId("invalid") // throws "Invalid breed ID format"
 */
export function validateBreedId(id) {
  // TODO: Implement this function
  // 1. Check if id is null, undefined, or empty string -> throw "Breed ID is required"
  // 2. Check if id is not a string -> throw "Breed ID must be a string"
  // 3. Trim the id and check UUID format -> throw "Invalid breed ID format" if invalid
  // 4. Return the trimmed id if valid

  // Hint: UUID regex pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
}

/**
 * Validates a limit parameter for API requests
 *
 * A valid limit must:
 * - Be a number (or convertible to number)
 * - Be between 1 and maxLimit (inclusive)
 *
 * @param {any} limit - The limit to validate
 * @param {number} maxLimit - The maximum allowed limit (default 5)
 * @returns {number} The validated limit as a number
 * @throws {Error} "Limit must be a number" if limit is not a valid number
 * @throws {Error} "Limit must be between 1 and {maxLimit}" if out of range
 *
 * Example:
 *   validateLimit(3) // returns 3
 *   validateLimit("2") // returns 2 (converts string to number)
 *   validateLimit("abc") // throws "Limit must be a number"
 *   validateLimit(10, 5) // throws "Limit must be between 1 and 5"
 */
export function validateLimit(limit, maxLimit = 5) {
  // TODO: Implement this function
  // 1. Convert limit to a number using Number()
  // 2. Check if it's NaN -> throw "Limit must be a number"
  // 3. Check if it's < 1 or > maxLimit -> throw "Limit must be between 1 and {maxLimit}"
  // 4. Return the number
}

/**
 * Safely executes an async function and handles errors
 *
 * This is a utility wrapper that catches errors and returns them
 * in a consistent format instead of throwing.
 *
 * @param {function} asyncFn - The async function to execute
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 *
 * Example:
 *   const result = await safeExecute(() => fetchBreeds());
 *   if (result.success) {
 *     console.log(result.data);
 *   } else {
 *     console.error(result.error);
 *   }
 */
export async function safeExecute(asyncFn) {
  // TODO: Implement this function using try/catch
  // On success: return { success: true, data: <result> }
  // On error: return { success: false, error: <error message> }
}

/**
 * Validates dog breed data object
 *
 * Ensures the breed data has all required fields.
 *
 * @param {object} data - The breed data to validate
 * @returns {object} The validated data
 * @throws {Error} "Breed data is required" if data is null/undefined
 * @throws {Error} "Breed data must be an object" if data is not an object
 * @throws {Error} "Breed name is required" if name is missing
 */
export function validateBreedData(data) {
  // TODO: Implement this function
  // Validate that data exists, is an object, and has a name property
}
