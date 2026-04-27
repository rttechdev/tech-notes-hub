# 📒 DROP COLUMN

---

The `DROP` clause is used to permanently remove a column from a table.

- In PostgreSQL, dropping a column also removes:
  - All indexes on that column
  - Any constraints (`NOT NULL`, `UNIQUE`, `CHECK`, etc.) on that column

**However:**
- ❌ It does *not* automatically remove dependencies in:
  - Views
  - Triggers
  - Stored procedures
- For that, you must use the `CASCADE` option.

---

## 🔷 General Syntax

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

---

## 🧩 Options

### ✅ Drop a column only if it exists

Avoids error if the column doesn’t exist:

```sql
ALTER TABLE table_name
DROP COLUMN IF EXISTS column_name;
```

---

### 🪄 Drop multiple columns

You can drop more than one column at once:

```sql
ALTER TABLE table_name
DROP COLUMN column1,
DROP COLUMN column2;
```

---

### 🌊 Drop a column and its dependencies (CASCADE)

Removes the column and anything that depends on it:

```sql
ALTER TABLE table_name
DROP COLUMN column_name CASCADE;
```

---

## 📚 Notes

- Dropping a column is **irreversible** — the data is lost.
- Always review dependencies before dropping a column.
- Use `IF EXISTS` to avoid errors when the column may already have been removed.

---

## 🔷 Example

```sql
ALTER TABLE new_info
DROP COLUMN IF EXISTS people;
```

**Output:**
- ✅ If the column exists → it is removed.
- ℹ️ If not → no error, just a notice.

---