# 🟦 SQL: COUNT() Function 

## ✅ Purpose

- `COUNT()` returns the number of rows that match a condition or appear in a column.
- Commonly used to measure the volume of data matching a filter or distinct condition.

---

## ✅ Syntax

```sql
SELECT COUNT(*) FROM table_name;
SELECT COUNT(column_name) FROM table_name;
```
- Both are functionally the same if the column doesn't contain NULLs.
- Most common usage: `COUNT(*)`

> 💡 **Note:**
> - Always use parentheses: `COUNT(...)` is required.
> - Use a column name (instead of `*`) when:
>   - You want to document which column was being analyzed.
>   - You're interested in non-null values only (advanced usage — not covered here yet).

---

## ✅ COUNT + DISTINCT

To count the number of unique values in a column:

```sql
SELECT COUNT(DISTINCT column_name) FROM table_name;
```

**Example:**
```sql
SELECT COUNT(DISTINCT amount) FROM payment;
```
- Returns the number of unique payment amounts in the payment table.

---

## ✅ Practical Examples

### Total rows in a table

```sql
SELECT COUNT(*) FROM payment;
-- Result: 14596 rows
```

### Total values in a specific column (same as above in this case)

```sql
SELECT COUNT(amount) FROM payment;
```

### Get all unique values from a column

```sql
SELECT DISTINCT amount FROM payment;
```

### Get number of unique values

```sql
SELECT COUNT(DISTINCT amount) FROM payment;
-- Result: 19 unique amounts
```

---

## 🧠 Key Takeaways

- `COUNT()` is agnostic to column name if there are no NULLs.
- Use `DISTINCT` inside `COUNT()` to get unique counts.
- Always use parentheses.
- Good practice: choose column names in `COUNT()` for clarity when revisiting or sharing queries.