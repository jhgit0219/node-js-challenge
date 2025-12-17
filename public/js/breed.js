/**
 * Breed Detail Page JavaScript
 *
 * Challenge G - Final Combined Project (Part 2)
 *
 * This script handles:
 * 1. Getting the breed ID from URL parameters
 * 2. Validating the breed ID
 * 3. Fetching and displaying breed details
 * 4. Managing loading and error states
 *
 * You'll need to implement the TODO sections below.
 */

// =============================================================================
// DOM Elements
// =============================================================================

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessageEl = document.getElementById('error-message');
const breedDetailsEl = document.getElementById('breed-details');

const breedNameEl = document.getElementById('breed-name');
const breedDescriptionEl = document.getElementById('breed-description');
const breedLifespanEl = document.getElementById('breed-lifespan');
const breedHypoallergenicEl = document.getElementById('breed-hypoallergenic');
const breedMaleWeightEl = document.getElementById('breed-male-weight');
const breedFemaleWeightEl = document.getElementById('breed-female-weight');

// =============================================================================
// UI Helper Functions (Provided)
// =============================================================================

/**
 * Shows the loading state
 */
function showLoading() {
  loadingEl.classList.remove('hidden');
  breedDetailsEl.classList.add('hidden');
  errorEl.classList.add('hidden');
}

/**
 * Shows the error state with a message
 * @param {string} message - Error message to display
 */
function showError(message) {
  loadingEl.classList.add('hidden');
  breedDetailsEl.classList.add('hidden');
  errorEl.classList.remove('hidden');
  errorMessageEl.textContent = message;
}

/**
 * Shows the breed details card
 */
function showDetails() {
  loadingEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  breedDetailsEl.classList.remove('hidden');
}

// =============================================================================
// TODO: Implement these functions
// =============================================================================

/**
 * Gets the breed ID from the URL query parameters
 *
 * TODO: Implement this function
 * The URL will be like: breed.html?id=f9643a80-af1d-422a-9f15-18d466822053
 *
 * @returns {string|null} The breed ID or null if not found
 *
 * Hint: Use URLSearchParams and window.location.search
 */
function getBreedIdFromUrl() {
  // TODO: Implement this function
  // Example:
  // const params = new URLSearchParams(window.location.search);
  // return params.get('id');
}

/**
 * Validates that a breed ID is present and in correct format
 *
 * TODO: Implement this function
 * 1. Check if id is null or empty -> throw Error "No breed ID provided"
 * 2. Check if id matches UUID format -> throw Error "Invalid breed ID format"
 * 3. Return the id if valid
 *
 * UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *
 * @param {string|null} id - The ID to validate
 * @returns {string} The validated ID
 * @throws {Error} If validation fails
 */
function validateBreedId(id) {
  // TODO: Implement this function
  // Hint: UUID regex: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
}

/**
 * Fetches breed details from the API
 *
 * TODO: Implement this function
 * 1. Fetch from '/api/breeds/' + id
 * 2. If response status is 404, throw Error "Breed not found"
 * 3. If response is not ok, throw Error "Failed to fetch breed details"
 * 4. Parse and return the data object
 *
 * @param {string} id - The breed ID
 * @returns {Promise<object>} The breed data
 */
async function fetchBreedDetails(id) {
  // TODO: Implement this function
}

/**
 * Renders breed details into the page
 *
 * TODO: Implement this function
 * 1. Update breedNameEl with the breed name
 * 2. Update breedDescriptionEl with the description (or "No description available")
 * 3. Update breedLifespanEl with formatted life span (e.g., "10-14 years")
 * 4. Update breedHypoallergenicEl with "Yes" or "No"
 * 5. Update breedMaleWeightEl with formatted weight (e.g., "25-35 kg")
 * 6. Update breedFemaleWeightEl with formatted weight (e.g., "20-30 kg")
 *
 * @param {object} breed - The breed data object
 */
function renderBreedDetails(breed) {
  // TODO: Implement this function
  // Access attributes via: breed.attributes.name, breed.attributes.life.min, etc.
  // Handle missing data gracefully (show "N/A" or similar)
}

/**
 * Main function to load and display breed details
 *
 * TODO: Implement this function
 * 1. Show loading state
 * 2. Get breed ID from URL
 * 3. Validate the breed ID
 * 4. Fetch breed details
 * 5. Render the details
 * 6. Show the details card
 *
 * Handle errors at each step and show appropriate error messages
 */
async function loadBreedDetails() {
  // TODO: Implement this function using try/catch
  // Make sure to call showLoading(), showError(), or showDetails() appropriately
}

// =============================================================================
// Initialize
// =============================================================================

// Load breed details when page loads
loadBreedDetails();
