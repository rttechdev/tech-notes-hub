# 📒 Import & Export Data with pgAdmin

---

## 🔷 Why use Import/Export?

- **Import**: Load data from a CSV or text file into an existing PostgreSQL table.
- **Export**: Save the contents of a table to a CSV or text file for use elsewhere.

---

## ⚠️ Key Notes before Importing

- ✅ **File formatting**
  - Values must match the table’s columns & data types.
  - Delimiters, headers, and quoting must be consistent.
  - Edit your file or table to align if needed.
- ✅ **Import does NOT create tables**
  - You must manually create the table first, matching the file’s structure.
  - PostgreSQL does not auto-create tables from CSV headers.
- ✅ **File path must be absolute**
  - Provide the full path to the file.
  - On Windows, check file properties → location.
  - On Linux/Mac, use absolute paths.
- ✅ **Internally, pgAdmin uses PostgreSQL’s `COPY` command.**

---

## 🔷 File Types

- ✅ Works with:
  - **CSV** (Comma-Separated Values)
  - **Plain text** (with chosen delimiter)

---

## 🔷 Steps to Import Data

### 🪧 1️⃣ Prepare your CSV

Example:
```csv
a,b,c
1,2,3
4,5,6
7,8,9
```
- ✅ Save with no spaces in the name, e.g., `simple_table.csv`
- ✅ Confirm the file path (e.g., `C:\Users\YourName\Downloads\simple_table.csv`)

---

### 🪧 2️⃣ Create a matching table in PostgreSQL

```sql
CREATE TABLE simple (
  a INTEGER,
  b INTEGER,
  c INTEGER
);
```

---

### 🪧 3️⃣ Open Import Tool

- In pgAdmin, right-click the table → **Import/Export Data…**
- Switch to Import mode.
- Provide the file path (or use the file picker).

---

### 🪧 4️⃣ Set options

- ✅ **Format**: CSV
- ✅ **Columns**: Verify they match your table.
- ✅ **Header**: Yes (if your CSV has a header row).
- ✅ **Delimiter**: `,` (or whatever your file uses).
- ✅ **Quoting**: Leave default unless your strings use single quotes.
- Click **OK** to run the import.

---

### 🪧 5️⃣ Verify

Run:
```sql
SELECT * FROM simple;
```
- ✅ Data from the CSV should now be in the table.

---

## 🔷 Steps to Export Data

### 🪧 1️⃣ Open Export Tool

- Right-click the table → **Import/Export Data…**
- Keep in Export mode.

---

### 🪧 2️⃣ Set options

- ✅ Provide the destination path & file name (e.g., `C:\Users\YourName\Downloads\export.csv`)
- ✅ **Format**: CSV
- ✅ Choose columns if needed.
- ✅ Set delimiter, quoting, and encoding as desired.
- Click **OK** — file is saved to your specified location.

---

## 🔷 Common Errors

- ⚠️ **File not found** → check and correct file path.
- ⚠️ **Data type mismatch** → edit either table schema or CSV to align.
- ⚠️ **Wrong delimiter or missing header** → adjust options accordingly.

---

## 🌟 Summary Table

| Task           | How                                   |
|----------------|---------------------------------------|
| ✅ Create Table | `CREATE TABLE …`                      |
| ✅ Import Data  | pgAdmin → Import/Export → Import      |
| ✅ Export Data  | pgAdmin → Import/Export → Export      |
| ✅ File format  | CSV or text                           |

---