/**
 * Main Page JavaScript
 *
 * Challenge G - Final Combined Project (Part 1)
 *
 * This script handles:
 * 1. Fetching and displaying dog breeds in the table
 * 2. Fetching and displaying random dog facts
 * 3. Managing loading and error states
 *
 * You'll need to implement the TODO sections below.
 */

// =============================================================================
// DOM Elements
// =============================================================================

const breedsTable = document.getElementById('breeds-table');
const breedsTbody = document.getElementById('breeds-tbody');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessageEl = document.getElementById('error-message');
const retryBtn = document.getElementById('retry-btn');

const dogFactEl = document.getElementById('dog-fact');
const newFactBtn = document.getElementById('new-fact-btn');

// =============================================================================
// State Management
// =============================================================================

let breeds = [];
let isLoading = false;

// =============================================================================
// UI Helper Functions (Provided)
// =============================================================================

/**
 * Shows the loading state
 */
function showLoading() {
  loadingEl.classList.remove('hidden');
  breedsTable.classList.add('hidden');
  errorEl.classList.add('hidden');
}

/**
 * Shows the error state with a message
 * @param {string} message - Error message to display
 */
function showError(message) {
  loadingEl.classList.add('hidden');
  breedsTable.classList.add('hidden');
  errorEl.classList.remove('hidden');
  errorMessageEl.textContent = message;
}

/**
 * Shows the breeds table
 */
function showTable() {
  loadingEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  breedsTable.classList.remove('hidden');
}

// =============================================================================
// TODO: Implement these functions
// =============================================================================

/**
 * Fetches all breeds from the API and stores them in the breeds array
 *
 * TODO: Implement this function
 * 1. Fetch from '/api/breeds'
 * 2. Parse the JSON response
 * 3. Store the data array in the 'breeds' variable
 * 4. Return the breeds array
 *
 * @returns {Promise<Array>} The fetched breeds
 * @throws {Error} If the fetch fails
 */
async function fetchBreeds() {
  // TODO: Implement this function
  // Hint: Use fetch('/api/breeds') to call your server's proxy endpoint
}

/**
 * Fetches a random dog fact from the API
 *
 * TODO: Implement this function
 * 1. Fetch from '/api/facts'
 * 2. Parse the JSON response
 * 3. Return the fact text (data[0].attributes.body)
 *
 * @returns {Promise<string>} The fact text
 */
async function fetchRandomFact() {
  // TODO: Implement this function
}

/**
 * Renders the breeds array into the table
 *
 * TODO: Implement this function
 * 1. Clear the existing table body content
 * 2. Loop through the breeds array
 * 3. For each breed, create a table row with:
 *    - Name
 *    - Life span (e.g., "10-14 years")
 *    - Hypoallergenic status ("Yes" or "No")
 *    - A "View Details" link to breed.html?id=BREED_ID
 *
 * Hint: You can use innerHTML or createElement/appendChild
 *
 * Example row HTML:
 * <tr>
 *   <td>Labrador Retriever</td>
 *   <td>10-14 years</td>
 *   <td>No</td>
 *   <td><a href="breed.html?id=xxx" class="view-link">View Details</a></td>
 * </tr>
 */
function renderBreeds() {
  // TODO: Implement this function
  // Access breed attributes via: breed.attributes.name, breed.attributes.life, etc.
}

/**
 * Updates the dog fact display
 *
 * TODO: Implement this function
 * 1. Set the fact element text to "Loading..."
 * 2. Call fetchRandomFact()
 * 3. Update the fact element with the fetched fact
 * 4. Handle errors by showing "Failed to load fact"
 */
async function updateFact() {
  // TODO: Implement this function using try/catch
}

/**
 * Loads breeds and updates the UI accordingly
 *
 * TODO: Implement this function
 * 1. Show loading state
 * 2. Try to fetch breeds
 * 3. If successful, render breeds and show table
 * 4. If error, show error state with appropriate message
 */
async function loadBreeds() {
  // TODO: Implement this function using try/catch
}

// =============================================================================
// Event Listeners
// =============================================================================

// Retry button click handler
retryBtn.addEventListener('click', () => {
  loadBreeds();
});

// New fact button click handler
newFactBtn.addEventListener('click', () => {
  updateFact();
});

// =============================================================================
// Initialize
// =============================================================================

/**
 * Initialize the page
 * TODO: Call loadBreeds() and updateFact() when the page loads
 */
function init() {
  // TODO: Load breeds and fetch initial fact
}

// Run init when DOM is ready
init();
