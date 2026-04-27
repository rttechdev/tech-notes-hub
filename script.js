// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeApp();
});

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', toggleTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Mobile Menu
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');

  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when a link is clicked
  sidebar.querySelectorAll('.nav-file-link').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });
}

// Main App Initialization
async function initializeApp() {
  try {
    const index = await fetchIndex();
    renderNavigation(index);
    initializeMobileMenu();
  } catch (error) {
    console.error('Error initializing app:', error);
    displayError('Failed to load notes index. Please refresh the page.');
  }
}

// Fetch index.json
async function fetchIndex() {
  const response = await fetch('index.json');
  if (!response.ok) {
    throw new Error(`Failed to fetch index: ${response.statusText}`);
  }
  return response.json();
}

// Render Navigation Tree
function renderNavigation(index) {
  const navTree = document.getElementById('navTree');
  navTree.innerHTML = '';

  Object.keys(index).forEach(category => {
    const items = index[category];
    const categoryElement = createCategoryElement(category, items);
    navTree.appendChild(categoryElement);
  });
}

function createCategoryElement(category, items) {
  const li = document.createElement('li');
  li.className = 'nav-item nav-folder';

  const title = document.createElement('button');
  title.className = 'nav-folder-title';
  title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  title.setAttribute('data-category', category);

  const list = document.createElement('ul');
  list.className = 'nav-folder-list';

  items.forEach(item => {
    const itemElement = createNavItemElement(item, category);
    list.appendChild(itemElement);
  });

  // Toggle folder
  title.addEventListener('click', () => {
    li.classList.toggle('open');
    title.classList.toggle('active');
  });

  li.appendChild(title);
  li.appendChild(list);

  // Expand first category by default
  if (category === Object.keys(Object.fromEntries(Object.entries({})))[0]) {
    li.classList.add('open');
    title.classList.add('active');
  }

  return li;
}

function createNavItemElement(item, category) {
  const li = document.createElement('li');

  if (item.type === 'folder') {
    li.className = 'nav-item nav-folder';

    const title = document.createElement('button');
    title.className = 'nav-folder-title';
    title.style.paddingLeft = '2.5rem';
    title.textContent = item.name;

    const list = document.createElement('ul');
    list.className = 'nav-folder-list';

    item.children.forEach(child => {
      const childElement = createNavItemElement(child, category);
      list.appendChild(childElement);
    });

    title.addEventListener('click', () => {
      li.classList.toggle('open');
      title.classList.toggle('active');
    });

    li.appendChild(title);
    li.appendChild(list);
  } else if (item.type === 'file') {
    li.className = 'nav-file';

    const link = document.createElement('a');
    link.className = 'nav-file-link';
    link.href = '#';
    link.textContent = item.name;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      loadNote(category, item.path);
      updateActiveLink(link);
    });

    li.appendChild(link);
  }

  return li;
}

// Load and Display Note
async function loadNote(category, filePath) {
  try {
    const content = document.getElementById('content');
    content.innerHTML = '<p class="loading">Loading note...</p>';

    const fullPath = `${category}/${filePath}`;
    const response = await fetch(fullPath);

    if (!response.ok) {
      throw new Error(`Failed to load note: ${response.statusText}`);
    }

    const markdown = await response.text();
    const html = marked.parse(markdown);

    content.innerHTML = `<article class="markdown-content">${html}</article>`;
  } catch (error) {
    console.error('Error loading note:', error);
    displayError(`Failed to load note: ${error.message}`);
  }
}

// Display Error Message
function displayError(message) {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="error"><strong>Error:</strong> ${message}</div>`;
}

// Update Active Link Styling
function updateActiveLink(activeLink) {
  document.querySelectorAll('.nav-file-link').forEach(link => {
    link.classList.remove('active');
  });
  activeLink.classList.add('active');
}
