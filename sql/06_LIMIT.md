# ✅ LIMIT in SQL

---

## 🔹 Purpose

- Restricts the number of rows returned by a query.
- Useful for previewing data or returning top-N results.
- Typically used with `ORDER BY` for meaningful slicing.

---

## 📌 Basic Syntax

```sql
SELECT column1, column2
FROM table_name
ORDER BY column_name [ASC|DESC]
LIMIT N;
```
- `N` = number of rows to return

---

## 📊 Examples

### 🔸 1. Preview top 5 rows of a table:

```sql
SELECT * FROM payment
LIMIT 5;
```
- Returns any 5 rows (unordered).

### 🔸 2. Get most recent payments:

```sql
SELECT * FROM payment
ORDER BY payment_date DESC
LIMIT 5;
```
- Sorts by latest `payment_date` and limits to top 5.

### 🔸 3. Add a filter with WHERE:

```sql
SELECT * FROM payment
WHERE amount <> 0
ORDER BY payment_date DESC
LIMIT 5;
```
- Filters out zero-amount payments.
- Returns top 5 recent real transactions.

---

## 🧠 Execution Order

1. `FROM`
2. `WHERE`
3. `ORDER BY`
4. `LIMIT` (always last)

---

## 💡 Use Cases

- Quickly inspect structure of a table:
  ```sql
  SELECT * FROM payment LIMIT 1;
  ```
- Get top N records (e.g., top 10 highest sales, 5 most recent signups).
- Useful in pagination when combined with `OFFSET`.