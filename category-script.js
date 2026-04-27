/**
 * Category Page Script
 * Handles loading notes for a specific category and rendering them
 */

async function initializeCategoryPage(category) {
  try {
    // Load folders structure for this category
    const folders = await fetchJSON(`index.json`);

    // Render navigation
    renderNavigation(folders, category);

    // Initialize mobile menu
    initializeMobileMenu();

    // Load note from URL query param or load first note from first folder
    const noteParam = getQueryParam('note');
    let noteFound = false;

    if (noteParam) {
      // Search through all folders to find the note
      for (let folder of folders) {
        const note = folder.children.find(n => n.path === noteParam);
        if (note) {
          loadNote(category, note.path);
          setActiveLink(note.path);
          noteFound = true;
          break;
        }
      }
    }

    if (!noteFound && folders.length > 0 && folders[0].children.length > 0) {
      // Load first note from first folder
      const firstNote = folders[0].children[0];
      loadNote(category, firstNote.path);
      setActiveLink(firstNote.path);
    }
  } catch (error) {
    console.error('Error initializing category page:', error);
    showError(document.getElementById('content'), error.message);
  }
}

/**
 * Render navigation sidebar with hierarchical folder structure
 */
function renderNavigation(folders, category) {
  const navTree = document.getElementById('navTree');
  navTree.innerHTML = '';

  if (folders.length === 0) {
    navTree.innerHTML = '<p class="loading">No notes found</p>';
    return;
  }

  folders.forEach((folder, index) => {
    const li = document.createElement('li');
    li.className = 'nav-item nav-folder';

    // Folder title button
    const title = document.createElement('button');
    title.className = 'nav-folder-title';
    title.textContent = folder.name;

    // Folder contents
    const list = document.createElement('ul');
    list.className = 'nav-folder-list';

    // Add notes in folder
    if (folder.children && Array.isArray(folder.children)) {
      folder.children.forEach(note => {
        const noteLi = document.createElement('li');
        noteLi.className = 'nav-file';

        const link = document.createElement('a');
        link.className = 'nav-file-link';
        link.href = '#';
        // Format the file name nicely
        link.textContent = formatFileName(note.name);
        link.dataset.notePath = note.path;

        link.addEventListener('click', (e) => {
          e.preventDefault();
          loadNote(category, note.path);
          setActiveLink(note.path);
        });

        noteLi.appendChild(link);
        list.appendChild(noteLi);
      });
    }

    // Toggle folder on title click
    title.addEventListener('click', () => {
      li.classList.toggle('open');
      title.classList.toggle('active');
    });

    // Expand first folder by default
    if (index === 0) {
      li.classList.add('open');
      title.classList.add('active');
    }

    li.appendChild(title);
    li.appendChild(list);
    navTree.appendChild(li);
  });
}

/**
 * Load a specific note and display it
 */
async function loadNote(category, notePath) {
  try {
    const content = document.getElementById('content');
    showLoading(content);

    // Build full path to markdown file relative to category folder
    // The notePath is relative to the category folder, so we use it directly
    const markdown = await fetchMarkdown(notePath);
    const html = marked.parse(markdown);

    content.innerHTML = `<article class="markdown-content">${html}</article>`;

    // Update URL query parameter
    setQueryParam('note', notePath);
  } catch (error) {
    console.error('Error loading note:', error);
    showError(document.getElementById('content'), `Failed to load note: ${error.message}`);
  }
}

/**
 * Set active link styling based on note path
 */
function setActiveLink(notePath) {
  document.querySelectorAll('.nav-file-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.notePath === notePath) {
      link.classList.add('active');
    }
  });
}

// Listen for URL changes (browser back/forward)
window.addEventListener('popstate', () => {
  const noteParam = getQueryParam('note');
  if (noteParam) {
    const category = window.location.pathname.split('/')[1];
    loadNote(category, noteParam);
    setActiveLink(noteParam);
  }
});
