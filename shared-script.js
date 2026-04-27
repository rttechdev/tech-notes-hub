/**
 * Shared utilities for all pages
 */

// ============ Theme Management ============

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// ============ Mobile Menu ============

function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');

  if (!mobileMenuBtn || !sidebar) return;

  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar only when a note link is clicked (not folder titles)
  sidebar.querySelectorAll('.nav-file-link').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });
}

// ============ Fetch Utilities ============

async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchMarkdown(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return response.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ============ URL Utilities ============

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function setQueryParam(param, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(param, value);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState(null, '', newUrl);
}

// ============ DOM Utilities ============

function showLoading(element) {
  element.innerHTML = '<p class="loading">Loading...</p>';
}

function showError(element, message) {
  element.innerHTML = `<div class="error"><strong>Error:</strong> ${message}</div>`;
}

function updateActiveLink(activeLink) {
  document.querySelectorAll('.nav-file-link').forEach(link => {
    link.classList.remove('active');
  });
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

/**
 * Format file name from underscore_case to Title Case
 * Example: 01_introduction_to_llms → 01. Introduction To Llms
 */
function formatFileName(name) {
  // Replace underscores with spaces
  let formatted = name.replace(/_/g, ' ');

  // Handle numbered prefix (e.g., "01" → "01.")
  formatted = formatted.replace(/^(\d+)\s/, '$1. ');

  // Convert to title case
  formatted = formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return formatted;
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);
