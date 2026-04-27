# 📒 Views

---

## 🔷 What is a View?

- A **view** is a saved query you can treat like a virtual table.
- Helps simplify frequently-used or complex queries.
- Does **not** store actual data — just stores the query.
- When you query the view, PostgreSQL runs the underlying query and returns the result.
- Think of it as a shortcut for a complex SELECT.

---

## 🔷 Why use Views?

- ✨ Save time on repetitive queries.
- ✨ Make queries more readable and maintainable.
- ✨ Centralize complex logic in one place.
- ✨ You can still apply `WHERE`, `GROUP BY`, etc., to the view just like a table.

---

## 🔷 Syntax: Create a View

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table1
JOIN table2 ON ...
WHERE condition;
```

**Example:**
```sql
CREATE VIEW customer_info AS
SELECT
  first_name,
  last_name,
  address
FROM customer
INNER JOIN address
  ON customer.address_id = address.address_id;
```
Then simply:
```sql
SELECT * FROM customer_info;
```

---

## 🔷 Update or Modify a View

If you want to change the query behind an existing view, use:

```sql
CREATE OR REPLACE VIEW view_name AS
SELECT ...
```

**Example:**
```sql
CREATE OR REPLACE VIEW customer_info AS
SELECT
  first_name,
  last_name,
  address,
  district
FROM customer
INNER JOIN address
  ON customer.address_id = address.address_id;
```

---

## 🔷 Rename a View

You can rename a view:

```sql
ALTER VIEW old_view_name RENAME TO new_view_name;
```

**Example:**
```sql
ALTER VIEW customer_info RENAME TO c_info;
```

---

## 🔷 Delete (Drop) a View

```sql
DROP VIEW view_name;
```
Or safely:
```sql
DROP VIEW IF EXISTS view_name;
```

---

## 🌟 Key Points

- Views don’t duplicate data — they just store SQL queries.
- Useful for breaking down and reusing complex logic.
- You can query a view just like a table.
- You can modify or delete a view any time.

---

## 🎯 Summary

- ✅ **Create:** `CREATE VIEW … AS SELECT …`
- ✅ **Modify:** `CREATE OR REPLACE VIEW … AS SELECT …`
- ✅ **Rename:** `ALTER VIEW … RENAME TO …`
- ✅ **Drop:** `DROP VIEW …`

---