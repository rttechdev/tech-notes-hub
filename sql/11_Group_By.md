# 📌 SQL GROUP BY

---

## 🔹 Purpose

- `GROUP BY` allows you to group rows that have the same values in specified columns and then apply aggregate functions to each group.

---

## 🔹 Common Aggregate Functions

- `SUM()`: Total value
- `AVG()`: Average
- `COUNT()`: Number of rows
- `MAX()`, `MIN()`: Highest/Lowest values

---

## 🔹 Syntax

```sql
SELECT category_column, AGG_FUNC(data_column)
FROM table_name
[WHERE condition]
GROUP BY category_column;
```

- ✅ The column in `SELECT` must be either:
  - In the `GROUP BY` clause
  - Or used inside an aggregate function

---

## 🔹 Example

Given a `sales` table:

| Company | Division   | Sales |
|---------|------------|-------|
| A       | Marketing  | 100   |
| A       | Transport  | 200   |
| B       | Marketing  | 150   |

```sql
SELECT Company, SUM(Sales)
FROM SalesTable
GROUP BY Company;
```
- Returns total sales per company.

---

## 🔹 Grouping by Multiple Columns

```sql
SELECT Company, Division, SUM(Sales)
FROM SalesTable
GROUP BY Company, Division;
```
- Groups by unique combinations of `Company` and `Division`.
- All selected non-aggregated columns must appear in the `GROUP BY`.

---

## 🔹 Filtering Before Grouping

Use `WHERE` to filter rows before grouping:

```sql
SELECT Company, SUM(Sales)
FROM SalesTable
WHERE Division IN ('Marketing', 'Transport')
GROUP BY Company;
```
- `WHERE` cannot use aggregate results like `SUM(Sales)`.

---

## 🔹 Filtering After Grouping

- Use `HAVING` (covered later) to filter after grouping.

❌ Don't do this (invalid):

```sql
WHERE SUM(Sales) > 1000
```

✅ Use `HAVING` instead:

```sql
HAVING SUM(Sales) > 1000
```

---

## 🔹 Sorting Aggregated Results

```sql
SELECT Company, SUM(Sales)
FROM SalesTable
GROUP BY Company
ORDER BY SUM(Sales) DESC
LIMIT 5;
```
- You must repeat the aggregate function in `ORDER BY` (e.g., `SUM(Sales)`, not just `Sales`).

---

## 🔹 Key Rules Summary

- Every column in `SELECT` must either:
  - Be in `GROUP BY`, or
  - Be aggregated
- `WHERE` filters raw rows before grouping.
- `ORDER BY` must reference full aggregate expression.
- Use `HAVING` to filter aggregated results.

---

---

# 📘 SQL GROUP BY – Part 2 Summary

---

## 🔹 Exploring the `payment` Table

**Columns:**
- `payment_id`: Unique for each transaction
- `customer_id`: Identifies each customer (categorical)
- `staff_id`: Staff involved in the payment (categorical)
- `rental_id`: Linked to the rented movie (joinable)
- `amount`: Amount of payment
- `payment_date`: Timestamp of payment

---

## 🧪 Basic GROUP BY Examples

### 1. Grouping by One Column

```sql
SELECT customer_id
FROM payment
GROUP BY customer_id;
```
- Equivalent to `SELECT DISTINCT customer_id`
- Rarely useful alone, but helps introduce `GROUP BY`

---

### 2. Sum Per Customer (Total Spending)

```sql
SELECT customer_id, SUM(amount)
FROM payment
GROUP BY customer_id;
```
- Aggregates total amount per customer

**Ordering the Results:**
```sql
ORDER BY SUM(amount) DESC;
```

---

### 3. Count Per Customer (Transactions)

```sql
SELECT customer_id, COUNT(amount)
FROM payment
GROUP BY customer_id;
```
- Shows number of payments (i.e. transactions) per customer

---

## 🔹 Grouping by Multiple Columns

**Total Amount Per Customer Per Staff:**
```sql
SELECT customer_id, staff_id, SUM(amount)
FROM payment
GROUP BY staff_id, customer_id;
```
- Grouping by multiple fields gives insights like:  
  *How much a customer paid to each staff member*

> Note: The order in `GROUP BY` matters for grouping structure, but not in `SELECT`.

---

## 🔹 Ordering Results

You can order by:
```sql
ORDER BY customer_id;
ORDER BY staff_id, customer_id;
ORDER BY SUM(amount) DESC;
```

---

## 🔹 Grouping by Date

**Problem:** `payment_date` is a timestamp → includes hour/minute/second

**Solution:** Use `DATE()` to extract just the date:

```sql
SELECT DATE(payment_date), SUM(amount)
FROM payment
GROUP BY DATE(payment_date)
ORDER BY SUM(amount) DESC;
```
- ✅ Grouping by `DATE(payment_date)` lets you see total daily revenue

---

## ⚠️ Key Reminders

- Use full expressions like `SUM(amount)` in `ORDER BY`, not just `amount`.
- In `GROUP BY`, all selected columns must be either:
  - In the `GROUP BY`
  - Or passed into an aggregate function
- `GROUP BY + DATE()` is essential when dealing with `TIMESTAMP`s

---

## 🧩 Challenge Prep

You're now ready to:
- Use multiple `GROUP BY` columns
- Order results dynamically
- Aggregate numerical data by date or user

Start writing analytical queries like:
- "Top 5 revenue days"
- "Most active customers"
- "Staff member with most transactions"