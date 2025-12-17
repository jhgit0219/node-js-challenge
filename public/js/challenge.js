/**
 * Challenge Dashboard JavaScript
 *
 * Handles navigation between challenges and test validation
 */

// =============================================================================
// State
// =============================================================================

const challengeStatus = {
  a: null, // null = not attempted, true = passed, false = failed
  b: null,
  c: null,
  d: null,
  e: null,
  f: null,
  g: null
};

let currentChallenge = 'intro';
let isRunningTests = false;

// =============================================================================
// Navigation
// =============================================================================

/**
 * Navigate to a specific challenge section
 */
function navigateTo(challengeId) {
  // Update current challenge
  currentChallenge = challengeId;

  // Hide all sections
  document.querySelectorAll('.challenge-section').forEach(section => {
    section.classList.remove('active');
  });

  // Show target section
  const targetSection = document.getElementById(`section-${challengeId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.challenge === challengeId) {
      btn.classList.add('active');
    }
  });

  // Scroll to top of main content
  document.querySelector('.main-content').scrollTop = 0;
}

// =============================================================================
// Test Runner
// =============================================================================

/**
 * Run tests for a specific challenge
 */
async function runTests(challengeId) {
  if (isRunningTests) return;

  const resultsEl = document.getElementById(`results-${challengeId}`);
  const validateBtn = resultsEl.previousElementSibling;

  try {
    isRunningTests = true;
    validateBtn.disabled = true;
    validateBtn.innerHTML = '<span class="btn-icon">⏳</span> Running tests...';

    resultsEl.innerHTML = '<div class="loading">Running tests, please wait...</div>';
    resultsEl.className = 'test-results loading';

    // Call the test runner API
    const response = await fetch(`/api/test/${challengeId}`);
    const result = await response.json();

    // Display results
    displayTestResults(challengeId, result, resultsEl);

    // Update challenge status
    challengeStatus[challengeId] = result.success;
    updateStatusBadge(challengeId, result.success);
    updateProgress();

    // Check for completion
    if (challengeId === 'g' && result.success) {
      document.getElementById('completion-card').classList.remove('hidden');
    }

  } catch (error) {
    resultsEl.innerHTML = `
      <div class="result-error">
        <h4>❌ Error Running Tests</h4>
        <p>${error.message}</p>
        <p class="hint">Make sure the server is running: <code>npm run dev</code></p>
      </div>
    `;
    resultsEl.className = 'test-results error';
  } finally {
    isRunningTests = false;
    validateBtn.disabled = false;
    validateBtn.innerHTML = '<span class="btn-icon">🧪</span> Validate Challenge ' + challengeId.toUpperCase();
  }
}

/**
 * Display test results in the UI
 */
function displayTestResults(challengeId, result, container) {
  const { success, summary, tests, error } = result;

  if (error) {
    container.innerHTML = `
      <div class="result-error">
        <h4>❌ Test Error</h4>
        <pre>${escapeHtml(error)}</pre>
      </div>
    `;
    container.className = 'test-results error';
    return;
  }

  // Build summary section
  let html = `
    <div class="result-summary ${success ? 'success' : 'failure'}">
      <div class="summary-icon">${success ? '✅' : '❌'}</div>
      <div class="summary-text">
        <h4>${success ? 'All Tests Passed!' : 'Some Tests Failed'}</h4>
        <p>${summary.passed} passed, ${summary.failed} failed, ${summary.total} total</p>
      </div>
    </div>
  `;

  // Build test list
  if (tests && tests.length > 0) {
    html += '<div class="test-list">';

    tests.forEach(test => {
      const icon = test.status === 'passed' ? '✓' : '✗';
      const statusClass = test.status === 'passed' ? 'passed' : 'failed';

      html += `
        <div class="test-item ${statusClass}">
          <span class="test-icon">${icon}</span>
          <span class="test-name">${escapeHtml(test.name)}</span>
          ${test.error ? `<div class="test-error">${escapeHtml(test.error)}</div>` : ''}
        </div>
      `;
    });

    html += '</div>';
  }

  container.innerHTML = html;
  container.className = `test-results ${success ? 'success' : 'failure'}`;
}

/**
 * Update status badge for a challenge
 */
function updateStatusBadge(challengeId, success) {
  const badge = document.getElementById(`status-${challengeId}`);
  if (badge) {
    badge.textContent = success ? '✓' : '✗';
    badge.className = `status-badge ${success ? 'passed' : 'failed'}`;
  }
}

/**
 * Update overall progress
 */
function updateProgress() {
  const challenges = Object.keys(challengeStatus);
  const completed = challenges.filter(c => challengeStatus[c] === true).length;
  const total = challenges.length;
  const percentage = Math.round((completed / total) * 100);

  document.getElementById('progress-text').textContent = `${completed}/${total}`;
  document.getElementById('progress-fill').style.width = `${percentage}%`;
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// =============================================================================
// Event Listeners
// =============================================================================

// Navigation click handlers
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigateTo(btn.dataset.challenge);
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Only handle if not in an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const challenges = ['intro', 'a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const currentIndex = challenges.indexOf(currentChallenge);

  if (e.key === 'ArrowRight' && currentIndex < challenges.length - 1) {
    navigateTo(challenges[currentIndex + 1]);
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    navigateTo(challenges[currentIndex - 1]);
  }
});

// =============================================================================
// Initialize
// =============================================================================

// Load saved progress from localStorage
function loadProgress() {
  try {
    const saved = localStorage.getItem('challengeProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(challengeStatus, parsed);

      // Update UI
      Object.keys(challengeStatus).forEach(c => {
        if (challengeStatus[c] !== null) {
          updateStatusBadge(c, challengeStatus[c]);
        }
      });
      updateProgress();
    }
  } catch (e) {
    console.warn('Failed to load progress:', e);
  }
}

// Save progress to localStorage
function saveProgress() {
  try {
    localStorage.setItem('challengeProgress', JSON.stringify(challengeStatus));
  } catch (e) {
    console.warn('Failed to save progress:', e);
  }
}

// Save progress whenever it changes
const originalUpdateStatusBadge = updateStatusBadge;
updateStatusBadge = function(challengeId, success) {
  originalUpdateStatusBadge(challengeId, success);
  saveProgress();
};

// Initialize on page load
loadProgress();
