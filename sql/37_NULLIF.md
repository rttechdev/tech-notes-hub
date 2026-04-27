# 📒 NULLIF

---

The `NULLIF` function compares two values:

- If the two values are equal, it returns `NULL`.
- If they are not equal, it returns the first argument.

---

## 🔷 Syntax

```sql
NULLIF(value1, value2)
```
- If `value1 = value2` → returns `NULL`
- Else → returns `value1`

---

## 🔷 Simple Examples

```sql
SELECT NULLIF(10, 10);  -- returns NULL
SELECT NULLIF(10, 12);  -- returns 10
```

---

## 🧩 Why Use NULLIF?

A common use case is to avoid division by zero errors.

- If a denominator might be 0, wrap it with `NULLIF(denominator, 0)`.
- Since dividing by `NULL` gives `NULL` (not an error), this is a safer alternative.

---

## 🧩 Real-World Example: Ratio of Departments

**Table: departments**

| first_name | department |
|------------|------------|
| Lauren     | A          |
| Vincent    | A          |
| Claire     | B          |

You want the ratio of A-to-B:

- Count of A: 2
- Count of B: 1
- Result: 2/1 = 2

**Query (when B exists):**
```sql
SELECT
  SUM(CASE WHEN department = 'A' THEN 1 ELSE 0 END) /
  SUM(CASE WHEN department = 'B' THEN 1 ELSE 0 END) AS department_ratio
FROM departments;
```
**Result:** 2

**Problem:** What if nobody is in department B?
- If there’s no one in department B (0), this query gives division by zero error.

**Solution: Use NULLIF**
- Wrap the denominator with `NULLIF(..., 0)`:

```sql
SELECT
  SUM(CASE WHEN department = 'A' THEN 1 ELSE 0 END) /
  NULLIF(SUM(CASE WHEN department = 'B' THEN 1 ELSE 0 END), 0) AS department_ratio
FROM departments;
```
- If the count of B is 0, then `NULLIF(0, 0)` → `NULL`
- Division by `NULL` → `NULL`

So instead of an error, you get `NULL`, which is much safer and easier to interpret.

---

## 🌟 Tips

- ✅ Use `NULLIF`:
  - To prevent errors when dividing by a value that might be 0.
  - To replace a value with `NULL` when it matches something (like a sentinel value).
- 🚫 Don’t confuse `NULLIF` with `COALESCE`:
  - `COALESCE` replaces `NULL` with something else.
  - `NULLIF` replaces equal values with `NULL`.

---

## 🎯 Summary

- `NULLIF(val1, val2)` → `NULL` if equal, else `val1`
- Common in ratios or averages to avoid dividing by zero.
- Safer to return `NULL` than crash your query.

---