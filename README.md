# Dog Breeds Library - Node.js Challenge

A hands-on Node.js challenge project to practice Classes, Modules, Promises, Async/Await, HTTP Requests, and Error Handling.

## Overview

You'll build a Dog Breeds Library web application that:
- Displays a list of dog breeds from an external API
- Shows detailed information about individual breeds
- Displays random dog facts
- Uses a Node.js/Express backend as an API proxy

## Prerequisites

- Node.js 20+ (LTS)
- npm
- Basic JavaScript knowledge
- A code editor (VS Code recommended)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the test suite to see what needs to be implemented:**
   ```bash
   npm test
   ```

3. **Start the development server (after implementing server.js):**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
dog-breeds-library/
├── package.json
├── jest.config.js
├── server.js              # Express server (TODO)
├── public/
│   ├── index.html         # Main page (provided)
│   ├── breed.html         # Breed detail page (provided)
│   ├── css/
│   │   └── styles.css     # Styles (provided)
│   └── js/
│       ├── main.js        # Main page logic (TODO)
│       └── breed.js       # Breed page logic (TODO)
├── src/
│   ├── index.js           # Main exports
│   ├── classes/
│   │   └── DogBreed.js    # DogBreed class (TODO)
│   ├── services/
│   │   └── dogService.js  # API service (TODO)
│   └── utils/
│       ├── wait.js        # Timing utilities (TODO)
│       └── validators.js  # Validation functions (TODO)
└── tests/
    ├── challenge-a.test.js
    ├── challenge-b.test.js
    ├── challenge-c.test.js
    ├── challenge-d.test.js
    ├── challenge-e.test.js
    ├── challenge-f.test.js
    └── challenge-g.test.js
```

## Challenges

Complete the challenges in order. Each builds on the previous one.

### Challenge A - Classes

**File:** `src/classes/DogBreed.js`

**Run tests:** `npm run test:a`

Create a `DogBreed` class with:

- **Properties:** `id`, `name`, `description`, `hypoallergenic`, `life`, `maleWeight`, `femaleWeight`
- **Methods:**
  - `getLifeSpan()` → returns `"10-14 years"`
  - `getMaleWeight()` → returns `"25-35 kg"`
  - `getFemaleWeight()` → returns `"20-30 kg"`
  - `isHypoallergenic()` → returns `"Yes"` or `"No"`
  - `describe()` → returns a full description string
- **Static Method:**
  - `fromApiResponse(apiData)` → creates instance from API response format

---

### Challenge B - Modules

**Files:** All files in `src/`

**Run tests:** `npm run test:b`

Ensure proper ES Module structure:
- Each file exports its functions/classes correctly
- `src/index.js` re-exports everything for convenience
- Use `import`/`export` syntax (not `require`)

---

### Challenge C - Promises

**File:** `src/utils/wait.js`

**Run tests:** `npm run test:c`

Create a `wait(ms)` function that:
- Returns a Promise
- Resolves after `ms` milliseconds
- Uses `setTimeout` internally

```javascript
// Example usage
wait(1000).then(() => console.log('1 second passed!'));
```

---

### Challenge D - Async/Await

**File:** `src/utils/wait.js`

**Run tests:** `npm run test:d`

Create a `delayedAction(ms)` async function that:
1. Logs `"Starting..."`
2. Waits for `ms` milliseconds using `wait()`
3. Logs `"Done!"`
4. Returns the `ms` value

**Bonus:** Implement `retryWithDelay(asyncFn, maxRetries, delayMs)`

---

### Challenge E - HTTP Requests

**File:** `src/services/dogService.js`

**Run tests:** `npm run test:e`

Implement API functions using `fetch`:

- `fetchBreeds()` → GET `/breeds` → returns array of breeds
- `fetchBreedById(id)` → GET `/breeds/:id` → returns single breed
- `fetchFacts(limit)` → GET `/facts?limit=N` → returns array of facts

**API Base URL:** `https://dogapi.dog/api/v2`

**Error Handling:**
- Throw `"Failed to fetch breeds"` on error
- Throw `"Breed not found"` on 404
- Throw `"Failed to fetch facts"` on error

---

### Challenge F - Error Handling

**File:** `src/utils/validators.js`

**Run tests:** `npm run test:f`

Implement validation functions with proper error throwing:

**`validateBreedId(id)`**
- Throws `"Breed ID is required"` if empty/null
- Throws `"Breed ID must be a string"` if not string
- Throws `"Invalid breed ID format"` if not UUID format
- Returns trimmed ID if valid

**`validateLimit(limit, maxLimit)`**
- Throws `"Limit must be a number"` if NaN
- Throws `"Limit must be between 1 and {maxLimit}"` if out of range
- Returns number if valid

**`safeExecute(asyncFn)`**
- Returns `{ success: true, data: result }` on success
- Returns `{ success: false, error: message }` on failure

**`validateBreedData(data)`**
- Throws `"Breed data is required"` if null/undefined
- Throws `"Breed data must be an object"` if not object
- Throws `"Breed name is required"` if name missing

---

### Challenge G - Final Combined Project

**Files:** `server.js`, `public/js/main.js`, `public/js/breed.js`

**Run tests:** `npm run test:g`

Wire everything together:

#### Server (`server.js`)
Implement Express API proxy endpoints:
- `GET /api/breeds` → proxy to Dog API
- `GET /api/breeds/:id` → proxy to Dog API
- `GET /api/facts` → proxy to Dog API

#### Main Page (`public/js/main.js`)
- Fetch breeds and display in table
- Fetch and display random dog facts
- Handle loading and error states
- "View Details" links to breed.html

#### Breed Page (`public/js/breed.js`)
- Get breed ID from URL params
- Validate the breed ID
- Fetch and display breed details
- Handle loading and error states

---

## API Reference

**Dog API:** https://dogapi.dog/api/v2

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /breeds` | List all dog breeds |
| `GET /breeds/:id` | Get single breed by ID |
| `GET /facts?limit=N` | Get random dog facts (max 5) |

### Response Format

**Breeds List:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "breed",
      "attributes": {
        "name": "Labrador Retriever",
        "description": "A friendly breed...",
        "hypoallergenic": false,
        "life": { "min": 10, "max": 14 },
        "male_weight": { "min": 29, "max": 36 },
        "female_weight": { "min": 25, "max": 32 }
      }
    }
  ]
}
```

**Facts:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "fact",
      "attributes": {
        "body": "Dogs have wet noses to help absorb scent chemicals."
      }
    }
  ]
}
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run specific challenge
npm run test:a   # Challenge A - Classes
npm run test:b   # Challenge B - Modules
npm run test:c   # Challenge C - Promises
npm run test:d   # Challenge D - Async/Await
npm run test:e   # Challenge E - Requests
npm run test:f   # Challenge F - Error Handling
npm run test:g   # Challenge G - Combined

# Watch mode
npm run test:watch
```

---

## Tips

1. **Start with Challenge A** - The DogBreed class is used throughout
2. **Read the test files** - They show exactly what's expected
3. **Check the TODOs** - Each file has detailed TODO comments
4. **Use the API directly first** - Test endpoints in browser/Postman
5. **Console.log is your friend** - Debug intermediate values
6. **Handle edge cases** - Empty arrays, missing properties, etc.

---

## Skills Covered

- ✅ ES6 Classes
- ✅ ES Modules (import/export)
- ✅ Promises
- ✅ Async/Await
- ✅ Fetch API
- ✅ Error Handling (try/catch, throw)
- ✅ Express.js basics
- ✅ DOM manipulation
- ✅ URL parameters

---

## Resources

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Dog API Documentation](https://dogapi.dog)

---

Good luck! 🐕
