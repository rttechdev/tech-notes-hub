# 🧠 Aggregate Functions (Before GROUP BY)

---

## 🔍 Purpose of Aggregate Functions

- Aggregate functions take multiple input rows and return a single summarized value.
- Commonly used in `SELECT` and `HAVING` clauses (we'll explore `HAVING` later).

---

## 📚 Common Aggregate Functions

| Function | Description                | Example                                   |
|----------|----------------------------|-------------------------------------------|
| AVG()    | Returns average value      | `SELECT AVG(replacement_cost) FROM film;` |
| COUNT()  | Counts number of rows      | `SELECT COUNT(*) FROM film;`              |
| MAX()    | Maximum value              | `SELECT MAX(replacement_cost) FROM film;` |
| MIN()    | Minimum value              | `SELECT MIN(replacement_cost) FROM film;` |
| SUM()    | Sum of all values          | `SELECT SUM(replacement_cost) FROM film;` |

---

## 🧪 Examples in PostgreSQL

Using the `film` table:

```sql
-- Minimum replacement cost
SELECT MIN(replacement_cost) FROM film;

-- Maximum replacement cost
SELECT MAX(replacement_cost) FROM film;

-- Average replacement cost (unrounded)
SELECT AVG(replacement_cost) FROM film;

-- Rounded average to 2 decimals
SELECT ROUND(AVG(replacement_cost), 2) FROM film;

-- Count number of rows
SELECT COUNT(*) FROM film;

-- Total cost to replace all movies
SELECT SUM(replacement_cost) FROM film;
```

---

## 📝 Rounding in PostgreSQL

Use `ROUND(value, precision)` for formatting decimal places.

```sql
SELECT ROUND(AVG(replacement_cost), 2) FROM film; -- 2 decimal places
```

---

## ⚠️ Important Notes

- Aggregate functions return a single value, so you cannot select other columns unless used with `GROUP BY`.

```sql
-- INVALID:
SELECT MAX(replacement_cost), title FROM film; -- ❌
```

- If selecting non-aggregated columns with aggregates, you must use `GROUP BY` (explained next).

---

## ✅ Summary

- You now understand how to compute totals, averages, and row counts.
- `ROUND()` is useful for formatting results of `AVG()`.
- Next up: Using these functions with `GROUP BY` to summarize data by category.