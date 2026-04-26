# Loading and Chunking Documents for RAG

## Objective

Implement the first practical RAG steps: load PDF documents and split them into searchable chunks.

---

## Setup

Ensure dependencies are installed:

```bash
pip install langchain langchain-community pypdf
```

---

## Step 1: Load PDF Document

### Set up file path using Python's `pathlib`

```python
from pathlib import Path

pdf_path = Path(__file__).parent / "node_js.pdf"
```

This builds a path to the PDF file in the same directory as your script.

### Load PDF with LangChain

```python
from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader(str(pdf_path))
docs = loader.load()
```

What happens:

- `PyPDFLoader` reads the PDF file
- returns list of documents where each page is one document
- each document has `.page_content` (text) and `.metadata` (page number, source)

### Inspect loaded documents

```python
print(docs[12])  # inspect page 12
print(len(docs))  # total number of pages
```

Output:

- page content as text
- metadata showing page number and file path

---

## Why Page-by-Page Loading Matters

LangChain's `PyPDFLoader` automatically:

- extracts text from each PDF page
- preserves page numbers as metadata
- creates separate document objects per page

This structure makes it easy to later cite sources by page number.

---

## Step 2: Chunking (Preview)

Once documents are loaded, the next step is splitting into smaller chunks.

LangChain provides text splitters that handle:

- configurable chunk size
- chunk overlap (for context preservation)
- smart splitting (paragraph-aware, not arbitrary)

This ensures no semantic breaks in the middle of important content.

---

## Current Progress

After this step:

- PDF is loaded into Python
- each page is a document object
- documents are ready for chunking and embedding

---

## Key Takeaways

- `PyPDFLoader` handles PDF parsing automatically.
- LangChain abstracts file I/O and metadata extraction.
- page-by-page structure preserves source traceability.
- next step is splitting these documents into optimal-sized chunks.
