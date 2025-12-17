/**
 * Express Server for Dog Breeds Library
 *
 * This server:
 * 1. Serves static files from the 'public' folder
 * 2. Provides API proxy endpoints to fetch data from dogapi.dog
 * 3. Provides test runner endpoint for the challenge dashboard
 *
 * TODO: Complete the API endpoints below
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Base URL for the Dog API
const DOG_API_BASE = 'https://dogapi.dog/api/v2';

// Redirect root to challenge dashboard (must be before static middleware)
app.get('/', (_req, res) => {
  res.redirect('/challenge.html');
});

// Middleware to serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// =============================================================================
// API PROXY ENDPOINTS
// =============================================================================

/**
 * GET /api/breeds
 * Fetches all dog breeds from the external API
 *
 * TODO: Implement this endpoint
 * - Fetch data from: https://dogapi.dog/api/v2/breeds
 * - Return the JSON response to the client
 * - Handle errors appropriately (return 500 status with error message)
 */
app.get('/api/breeds', async (req, res) => {
  // TODO: Implement this endpoint
  res.status(501).json({ error: 'Not implemented yet' });
});

/**
 * GET /api/breeds/:id
 * Fetches a single dog breed by ID from the external API
 *
 * TODO: Implement this endpoint
 * - Fetch data from: https://dogapi.dog/api/v2/breeds/:id
 * - Return the JSON response to the client
 * - Handle 404 if breed not found
 * - Handle other errors appropriately
 */
app.get('/api/breeds/:id', async (req, res) => {
  // TODO: Implement this endpoint
  res.status(501).json({ error: 'Not implemented yet' });
});

/**
 * GET /api/facts
 * Fetches random dog facts from the external API
 *
 * Query params:
 * - limit: number of facts to return (max 5, default 1)
 *
 * TODO: Implement this endpoint
 * - Fetch data from: https://dogapi.dog/api/v2/facts?limit=X
 * - Return the JSON response to the client
 * - Handle errors appropriately
 */
app.get('/api/facts', async (req, res) => {
  // TODO: Implement this endpoint
  res.status(501).json({ error: 'Not implemented yet' });
});

// =============================================================================
// TEST RUNNER ENDPOINT (for Challenge Dashboard)
// =============================================================================

/**
 * GET /api/test/:challenge
 * Runs Jest tests for a specific challenge and returns results
 *
 * This endpoint is pre-implemented for the challenge dashboard.
 * Students don't need to modify this.
 */
app.get('/api/test/:challenge', async (req, res) => {
  const challenge = req.params.challenge.toLowerCase();
  const validChallenges = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  if (!validChallenges.includes(challenge)) {
    return res.status(400).json({
      success: false,
      error: `Invalid challenge: ${challenge}. Must be one of: ${validChallenges.join(', ')}`
    });
  }

  try {
    const result = await runTests(challenge);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Run Jest tests for a specific challenge
 * @param {string} challenge - Challenge letter (a-g)
 * @returns {Promise<object>} Test results
 */
function runTests(challenge) {
  return new Promise((resolve, reject) => {
    const testFile = `challenge-${challenge}`;
    const args = [
      '--experimental-vm-modules',
      'node_modules/jest/bin/jest.js',
      '--testPathPattern', testFile,
      '--json',
      '--forceExit'
    ];

    const child = spawn('node', args, {
      cwd: __dirname,
      shell: true
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      try {
        // Try to parse JSON output from Jest
        const jsonMatch = stdout.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jestOutput = JSON.parse(jsonMatch[0]);
          const result = parseJestOutput(jestOutput);
          resolve(result);
        } else {
          // If no JSON, return raw output
          resolve({
            success: code === 0,
            summary: { passed: 0, failed: 0, total: 0 },
            tests: [],
            error: stderr || stdout || 'No test output received'
          });
        }
      } catch (parseError) {
        resolve({
          success: false,
          summary: { passed: 0, failed: 0, total: 0 },
          tests: [],
          error: `Failed to parse test results: ${parseError.message}\n\nRaw output:\n${stdout}\n${stderr}`
        });
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to run tests: ${error.message}`));
    });
  });
}

/**
 * Parse Jest JSON output into a simpler format
 */
function parseJestOutput(jestOutput) {
  const testResults = jestOutput.testResults || [];
  const tests = [];
  let passed = 0;
  let failed = 0;

  testResults.forEach(suite => {
    (suite.assertionResults || []).forEach(test => {
      const isPassed = test.status === 'passed';
      if (isPassed) passed++;
      else failed++;

      tests.push({
        name: test.fullName || test.title,
        status: test.status,
        error: test.failureMessages?.join('\n') || null
      });
    });
  });

  return {
    success: jestOutput.success,
    summary: {
      passed,
      failed,
      total: passed + failed
    },
    tests
  };
}

// =============================================================================
// START SERVER
// =============================================================================

// Only start the server if this file is run directly (not imported for testing)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`🐕 Dog Breeds Library server running at http://localhost:${PORT}`);
    console.log(`   - Challenge Dashboard: http://localhost:${PORT}/`);
    console.log(`   - App Preview: http://localhost:${PORT}/index.html`);
    console.log(`   - API Breeds: http://localhost:${PORT}/api/breeds`);
    console.log(`   - API Facts: http://localhost:${PORT}/api/facts`);
  });
}

// Export for testing
export { app, DOG_API_BASE };
