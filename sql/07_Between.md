# ✅ BETWEEN Operator in SQL

---

## 🔹 Purpose

- Used in a `WHERE` clause to filter records within a specific range, inclusive of the boundary values.

---

## 📌 Syntax

```sql
SELECT column1, column2
FROM table_name
WHERE column_name BETWEEN low AND high;
```
- Includes values equal to `low` and `high`.

---

## 🔁 Equivalent To

```sql
WHERE column_name >= low AND column_name <= high
```

---

## ❗ NOT BETWEEN

```sql
WHERE column_name NOT BETWEEN low AND high;
```
Equivalent to:
```sql
WHERE column_name < low OR column_name > high;
```
- Excludes boundary values (i.e., `low` and `high` not included).

---

## 📊 Examples

### 🔸 1. Numeric Range

```sql
SELECT * FROM payment
WHERE amount BETWEEN 8 AND 9;
```
- Returns payments with amount between 8 and 9 (inclusive).

To count them:
```sql
SELECT COUNT(*) FROM payment
WHERE amount BETWEEN 8 AND 9;
```

### 🔸 2. NOT BETWEEN (numeric)

```sql
SELECT * FROM payment
WHERE amount NOT BETWEEN 8 AND 9;
```
- Returns payments outside the range (excluding 8 and 9).

---

## 🕓 Date/Time Usage

- **Format:** Use ISO 8601 format: `'YYYY-MM-DD'`
- **Example:**
  ```sql
  SELECT * FROM payment
  WHERE payment_date BETWEEN '2007-02-01' AND '2007-02-15';
  ```
  - This includes all times on Feb 1 and up to Feb 15 00:00:00.
  - So Feb 14 data is included, but anything on Feb 15 after midnight is excluded.

---

## ❗ Important Gotcha with Timestamps

- If you're filtering for `'2007-02-14'`, the upper limit `'2007-02-14'` includes only the start of the day (i.e., 00:00:00).
- To include the full Feb 14, the end should be `'2007-02-15'`.

---

## ✅ Good Practice for Dates with Timestamps

- Always check whether the range actually includes the full final day, especially with timestamp fields.