const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const CATEGORIES = ['gen-ai', 'sql'];

/**
 * Extract leading number from folder/file name for numerical sorting
 */
function getLeadingNumber(name) {
  const match = name.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
}

/**
 * Sort numerically by leading number, then alphabetically
 */
function sortNumerically(a, b) {
  const numA = getLeadingNumber(a.name);
  const numB = getLeadingNumber(b.name);

  if (numA !== numB) {
    return numA - numB;
  }
  // If same number, sort alphabetically
  return a.name.localeCompare(b.name);
}

/**
 * Build hierarchical structure: folders containing files
 */
function buildHierarchicalStructure(dir, baseDir = '') {
  const folderMap = {};

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    // First pass: create folder entries
    entries.forEach(entry => {
      if (entry.name.startsWith('.')) return;

      const fullPath = path.join(dir, entry.name);
      // Path relative only to the category folder, not including category name
      const relativePath = entry.name.replace(/\\/g, '/');

      if (entry.isDirectory()) {
        // Get markdown files directly in this folder (not recursive)
        const files = getMarkdownFilesInFolder(fullPath, relativePath);
        if (files.length > 0) {
          // Sort files numerically
          folderMap[entry.name] = {
            type: 'folder',
            name: entry.name,
            path: relativePath,
            children: files.sort(sortNumerically)
          };
        }
      }
    });

    // Second pass: add root-level markdown files if any
    const rootFiles = getMarkdownFilesInFolder(dir, '');
    if (rootFiles.length > 0) {
      // Sort files numerically
      folderMap['_root'] = {
        type: 'folder',
        name: 'Root Notes',
        path: '',
        children: rootFiles.sort(sortNumerically)
      };
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }

  // Convert to array and sort by leading number (numerically)
  return Object.values(folderMap).sort(sortNumerically);
}

/**
 * Get markdown files directly in a folder (not recursive)
 */
function getMarkdownFilesInFolder(dir, baseDir = '') {
  const files = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach(entry => {
      if (entry.name.startsWith('.')) return;

      if (!entry.isDirectory() && entry.name.endsWith('.md')) {
        // Path relative to category folder
        const relativePath = baseDir
          ? `${baseDir}/${entry.name}`.replace(/\\/g, '/')
          : entry.name;
        const fileName = entry.name.replace('.md', '');

        files.push({
          name: fileName,
          path: relativePath,
          file: entry.name
        });
      }
    });
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }

  return files;
}

/**
 * Generate index.json for a specific category
 */
function generateCategoryIndex(category) {
  const categoryPath = path.join(ROOT_DIR, category);

  if (!fs.existsSync(categoryPath)) {
    console.warn(`⚠️  Category folder not found: ${categoryPath}`);
    return;
  }

  try {
    const structure = buildHierarchicalStructure(categoryPath);
    const indexPath = path.join(categoryPath, 'index.json');

    fs.writeFileSync(indexPath, JSON.stringify(structure, null, 2));
    console.log(`✓ Generated ${category}/index.json (${structure.length} folders)`);
  } catch (err) {
    console.error(`Error generating index for ${category}:`, err.message);
  }
}

/**
 * Generate categories index for home page
 */
function generateCategoriesIndex() {
  const categories = CATEGORIES.map(cat => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    path: cat,
    icon: cat === 'gen-ai' ? '🤖' : '🗄️'
  }));

  const indexPath = path.join(ROOT_DIR, 'categories.json');
  fs.writeFileSync(indexPath, JSON.stringify(categories, null, 2));
  console.log(`✓ Generated categories.json (${categories.length} categories)`);
}

/**
 * Main function to generate all indexes
 */
function generateAllIndexes() {
  console.log('📝 Generating indexes...\n');

  try {
    CATEGORIES.forEach(category => {
      generateCategoryIndex(category);
    });

    generateCategoriesIndex();

    console.log('\n✅ All indexes generated successfully!');
  } catch (err) {
    console.error('Error generating indexes:', err.message);
    process.exit(1);
  }
}

generateAllIndexes();
