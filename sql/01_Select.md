# 🟦 SQL: SELECT Statement

## ✅ Purpose
- The `SELECT` statement is used to retrieve data from one or more columns in a table.

---

## ✅ Basic Syntax

```sql
SELECT column1, column2 FROM table_name;
```
- Retrieves data from the specified columns.
- Use `,` to separate multiple column names.
- Order of column names can be customized in the output.

---

## ✅ Select All Columns

```sql
SELECT * FROM table_name;
```
- Returns all columns from a table.

> ❗ Not recommended for production use unless you really need all columns — increases data transfer and processing overhead.

---

## ✅ Example

```sql
SELECT first_name, last_name FROM actor;
```

```sql
SELECT * FROM actor;
```

```sql
SELECT last_name, first_name FROM actor;
```
- Changes order of columns in result.

---

## ✅ Formatting Tips

- Capitalize SQL keywords (`SELECT`, `FROM`) — improves readability.
- Semicolon (`;`) denotes end of a query — optional in many cases but useful when writing multiple statements.
- SQL is case-insensitive, so `select`, `SELECT`, and `SeLeCt` all work.

---
