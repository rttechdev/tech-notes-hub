# ✅ IN and NOT IN Operators in SQL

---

## 🔹 Purpose

- To check if a column’s value matches any value in a specified list, instead of writing multiple `OR` conditions.

---

## 📌 Syntax

### 🔸 IN:

```sql
SELECT column1, column2
FROM table_name
WHERE column_name IN (value1, value2, value3);
```
Equivalent to:
```sql
WHERE column_name = value1 OR column_name = value2 OR column_name = value3
```

### 🔸 NOT IN:

```sql
SELECT column1, column2
FROM table_name
WHERE column_name NOT IN (value1, value2, value3);
```
Equivalent to:
```sql
WHERE column_name <> value1 AND column_name <> value2 AND column_name <> value3
```

---

## 🧠 Key Notes

- The list in `IN`/`NOT IN` must match the column's data type:
  - Use quoted strings for text values: `'John'`, `'Julie'`
  - Use no quotes for numeric values: `0.99`, `199`
- The list goes inside parentheses and values are comma-separated.
- Can be used in conjunction with other `WHERE` filters or clauses.

---

## 📊 Examples

### 🔸 Numeric Data Example

```sql
SELECT * FROM payment
WHERE amount IN (0.99, 1.98, 1.99);
```
- Returns rows where the amount is 0.99, 1.98, or 1.99.

---

### 🔸 Count Matching Rows

```sql
SELECT COUNT(*) FROM payment
WHERE amount IN (0.99, 1.98, 1.99);
```
- Example result: 3301 payments.

---

### 🔸 Exclude Values Using NOT IN

```sql
SELECT COUNT(*) FROM payment
WHERE amount NOT IN (0.99, 1.98, 1.99);
```
- Example result: 11,295 payments.

---

## 🧾 String Data Example

```sql
SELECT * FROM customer
WHERE first_name IN ('John', 'Jake', 'Julie');
```
- Returns all customers with `first_name` as John or Julie (Jake may not exist in data).

---

## ⚠️ Common Mistakes

- Forgetting quotes around strings.
- Mismatching data types.
- Omitting parentheses or misplacing commas.