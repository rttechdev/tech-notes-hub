# 🟦 SQL: SELECT DISTINCT

## ✅ Purpose

- Used to return only unique (non-duplicate) values from a column.

---

## ✅ Syntax

```sql
SELECT DISTINCT column_name FROM table_name;
-- or optionally with parentheses
SELECT DISTINCT (column_name) FROM table_name;
```

- Both work the same. Parentheses are optional and used for clarity.
- Will be necessary when combining with other functions like `COUNT()` later.

---

## ✅ Use Cases & Examples

### Basic Example

```sql
SELECT DISTINCT name FROM color;
```
- Returns unique names only (removes duplicates like two "David"s).

### Color Choices

```sql
SELECT DISTINCT choice FROM color;
```
- Returns all the unique color options chosen.

### Release Years in a Movie Table

```sql
SELECT DISTINCT release_year FROM film;
-- or
SELECT DISTINCT (release_year) FROM film;
```
- Tells how many distinct years movies were released in.

### Rental Rates

```sql
SELECT DISTINCT rental_rate FROM film;
```
- Returns distinct rental price values like `0.99`, `2.99`, and `4.99`.

---

## 📝 Notes

- PostgreSQL may return results in any order; to control it, use `ORDER BY` (covered later).
- `SELECT * FROM table_name` is fine for small/testing databases to explore structure quickly.