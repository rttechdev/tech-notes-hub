# Learning Notes Hub 📚

A responsive web portal for organizing and viewing learning notes. Features light/dark theme support, mobile-friendly navigation, and automatic note indexing.

## 🌐 Live Portal

View the notes portal at: `https://[your-username].github.io/tech-notes-hub/`

## 📋 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Light/Dark Theme**: Toggle between themes with persistent user preference
- **Organized Navigation**: Hierarchical sidebar navigation for all notes
- **Mobile Menu**: Hamburger menu for easy navigation on smaller screens
- **Markdown Support**: All notes are written in Markdown with proper formatting
- **Auto-indexing**: Simple script to generate navigation from your markdown files

## 🚀 Setup

### Local Development

1. Clone the repository and navigate to the project directory
2. Open `index.html` in your browser

**Note**: For markdown files to load correctly, you may need to run a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js with http-server
npx http-server
```

Then visit `http://localhost:8000`

### GitHub Pages Deployment

1. Push code to GitHub
2. Go to repository Settings → Pages
3. Select `main` or `develop` branch as source
4. Your site will be live at `https://[username].github.io/tech-notes-hub/`

## ➕ Adding New Notes

### Workflow for Adding Notes:

1. **Add your markdown file** to the appropriate folder:
   - `gen-ai/` - for generative AI and LLM related notes
   - `sql/` - for SQL and database notes
   - Create new folders as needed: `gen-ai/your-topic/` or a top-level folder

2. **Regenerate the navigation index**:
   ```bash
   node generate-index.js
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new notes on [topic]"
   git push
   ```

4. **Site automatically updates** (GitHub Pages auto-deploys on push)

## 📁 Project Structure

```
tech-notes-hub/
├── index.html           # Main portal page
├── styles.css           # Responsive styling with theming
├── script.js            # Client-side navigation and markdown loading
├── generate-index.js    # Node.js script to scan folders and generate index.json
├── index.json           # Auto-generated navigation index
├── .nojekyll            # Tells GitHub Pages this is not a Jekyll site
├── gen-ai/              # Generative AI and LLM notes
│   ├── 1. Core Foundations/
│   ├── 2. API Setup & Integration/
│   └── ...
├── sql/                 # SQL and database notes
│   ├── 01_Select.md
│   ├── 02_Select_Distinct.md
│   └── ...
└── README.md
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Markdown Parsing**: [marked.js](https://marked.js.org/)
- **Hosting**: GitHub Pages
- **Theming**: CSS Custom Properties

## 📝 Note Format

Notes are simple Markdown files. Example:

```markdown
# Understanding Tokenization

Tokenization is the process of breaking down text into...

## Key Concepts

- **Token**: A basic unit of text
- **Vocabulary**: A set of unique tokens

## Code Example

\`\`\`python
from tokenizers import Tokenizer
\`\`\`
```

## 🎨 Customization

### Change Theme Colors

Edit `styles.css` and modify the CSS custom properties:

```css
:root {
  --primary-bg: #ffffff;
  --primary-text: #333333;
  --accent-color: #0066cc;
  /* ... more colors ... */
}
```

### Change Portal Title

Edit `index.html` and update:
- `<title>` tag
- `.logo` text in the header

## 📚 Notes Organization

Organize your notes into categories by folder structure:

- Top-level folders become main categories in the sidebar
- Subfolders are nested in the navigation tree
- Individual `.md` files are listed as clickable links
- Files are sorted alphabetically

## 🔧 Troubleshooting

**Markdown files not loading?**
- Run a local web server: `python -m http.server 8000`
- Browser security blocks file:// URLs from fetching other files

**Site not updating on GitHub Pages?**
- Wait a few minutes for deployment
- Check that `index.json` was generated and committed
- Verify files are pushed to your GitHub branch

**Theme not persisting?**
- Clear browser cache or check localStorage settings
- Ensure JavaScript is enabled

## 📝 License

This is a personal learning project. Feel free to fork and adapt for your own use.
