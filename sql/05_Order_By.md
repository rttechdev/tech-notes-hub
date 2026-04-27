# ✅ ORDER BY in SQL

---

## Purpose

- Used to sort the result set of a query by one or more columns in ascending (`ASC`) or descending (`DESC`) order.

---

## 📌 Syntax

```sql
SELECT column1, column2
FROM table_name
ORDER BY column1 [ASC | DESC], column2 [ASC | DESC];
```

- `ASC`: Ascending (default)
- `DESC`: Descending

---

## 📊 Example 1: Sorting by One Column

```sql
SELECT first_name, last_name
FROM customer
ORDER BY first_name ASC;
```
- Orders customers by first name (A → Z).

---

## 📊 Example 2: Sorting by One Column Descending

```sql
SELECT first_name, last_name
FROM customer
ORDER BY first_name DESC;
```
- Orders customers by first name (Z → A).

---

## 🔁 Example 3: Sorting by Multiple Columns

```sql
SELECT store_id, first_name, last_name
FROM customer
ORDER BY store_id DESC, first_name ASC;
```
- First sorts by `store_id` in descending order.
- Then sorts customers within each store by `first_name` in ascending order.

---

## 💡 Important Notes

- You can use `ORDER BY` on columns not included in the `SELECT` clause:

  ```sql
  SELECT first_name FROM customer ORDER BY last_name;
  ```

  - This is valid, but usually it's better to include the column you're ordering by for clarity.

- `ORDER BY` is performed after `WHERE` and `SELECT` but before `LIMIT`.
- Useful for making sure query results are consistent, especially if default ordering is inconsistent between systems or runs.

---

## 🔜 Coming Next

- `LIMIT`: Restrict the number of rows returned by a query. Useful with `ORDER BY` for top-N queries.