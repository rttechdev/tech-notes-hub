# 📒 Choosing Data Types

---

When creating tables, you must choose the appropriate data type for each column. Choosing the right type improves storage efficiency, avoids errors, and ensures data integrity.

---

## 🔷 Main Categories of Data Types

### Boolean
- `BOOLEAN` → TRUE or FALSE

### Character (Text)
- `CHAR(n)` → Fixed-length, padded with spaces
- `VARCHAR(n)` → Variable-length, up to n characters
- `TEXT` → Variable unlimited-length text

### Numeric
- `SMALLINT` (2 bytes) → Small range of integers
- `INTEGER` (4 bytes) → Standard integers
- `BIGINT` (8 bytes) → Large integers
- `DECIMAL(p,s)` / `NUMERIC(p,s)` → Exact precision decimals
- `REAL` / `DOUBLE PRECISION` → Approximate floating point numbers

### Temporal (Dates & Times)
- `DATE` → Calendar date (YYYY-MM-DD)
- `TIME` → Time of day
- `TIMESTAMP` → Date & time
- `TIMESTAMP WITH TIME ZONE`

### Other Types
- `UUID` → Universally Unique Identifier (useful for unique row IDs)
- `ARRAY` → Store arrays of elements
- `JSON` / `JSONB` → Store JSON data
- `HSTORE` → Key-value pairs
- `INET` → Network addresses
- Geometry types → For GIS

---

## 🔷 Example: Storing Phone Numbers

📞 Should you store a phone number as a numeric or text?

- Numeric types like `BIGINT` can hold large numbers, but phone numbers:
  - Aren’t used for arithmetic
  - Can have leading zeros or country codes
  - Can include symbols (`+`, `-`, etc.)

**✅ Best Practice → Use `VARCHAR` or `TEXT` for phone numbers.**

- Using `BIGINT` risks losing leading zeros and misrepresenting the data.

---

## 🔷 Tips for Choosing Data Types

- Always refer to your database documentation (e.g., PostgreSQL Data Types) to see limits & behavior.
- Use the smallest data type that covers your range — smaller types use less storage.
- Think long-term: record more information than you think you’ll need. You can always remove unused data later, but can’t recover what wasn’t stored.
- When in doubt → Search for “best practices” for your use case (e.g., “best way to store phone number in PostgreSQL”).

---

## ✅ Summary

Pick data types thoughtfully — think about how the data is used, whether you need arithmetic, and what formats are valid. Use text for non-numeric identifiers like phone numbers.

---