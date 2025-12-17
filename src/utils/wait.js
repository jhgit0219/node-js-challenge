/**
 * Wait Utility
 *
 * Challenge C - Promises
 * Challenge D - Async/Await
 *
 * This module provides timing utilities using Promises and async/await.
 */

/**
 * Challenge C: Create a Promise-based wait function
 *
 * Returns a Promise that resolves after the specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to wait
 * @returns {Promise<void>} A promise that resolves after ms milliseconds
 *
 * Example usage:
 *   wait(1000).then(() => console.log('1 second passed!'));
 *
 * Hint: Use setTimeout inside a new Promise
 */
export function wait(ms) {
  // TODO: Implement this function
  // Return a new Promise that resolves after ms milliseconds
  // Use setTimeout to create the delay
}

/**
 * Challenge D: Create an async function that uses wait()
 *
 * This function demonstrates async/await by:
 * 1. Logging "Starting..."
 * 2. Waiting for the specified milliseconds using the wait() function
 * 3. Logging "Done!"
 * 4. Returning the ms value
 *
 * @param {number} ms - The number of milliseconds to wait
 * @returns {Promise<number>} The ms value after waiting
 *
 * Example usage:
 *   await delayedAction(2000);
 *   // Logs: "Starting...", waits 2 seconds, logs: "Done!"
 */
export async function delayedAction(ms) {
  // TODO: Implement this async function
  // 1. Log "Starting..."
  // 2. Use await with the wait() function
  // 3. Log "Done!"
  // 4. Return ms
}

/**
 * Bonus Challenge: Retry with delay
 *
 * Creates a function that retries an async operation with a delay between attempts.
 *
 * @param {function} asyncFn - The async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} delayMs - Delay between retries in milliseconds
 * @returns {Promise<any>} The result of the async function
 * @throws {Error} If all retries fail
 *
 * Example usage:
 *   const result = await retryWithDelay(fetchData, 3, 1000);
 */
export async function retryWithDelay(asyncFn, maxRetries = 3, delayMs = 1000) {
  // TODO (BONUS): Implement this function
  // 1. Try to execute asyncFn
  // 2. If it fails, wait for delayMs then retry
  // 3. Repeat up to maxRetries times
  // 4. If all retries fail, throw the last error
}
