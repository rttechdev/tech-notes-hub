# 🎓 Understanding the INNER JOIN in SQL

---

## 🧩 What is a JOIN?

- A JOIN lets us combine data from multiple tables based on a related column.
- Essential in relational databases where information is normalized across different tables.

---

## 🤝 Why Different JOIN Types?

- Each JOIN type determines how to handle rows that do not have a match in the other table.
- We'll start with the simplest: `INNER JOIN`.

---

## 🔍 INNER JOIN: The Basics

### 🧠 Definition

- An `INNER JOIN` returns only the rows with matching values in both tables.

---

## 📊 Example Scenario

Imagine a company conference with two tables:

- **registrations**: Register online beforehand
- **logins**: Log in onsite on the day

| registrations | logins |
|:-------------:|:------:|
| id | name     | id | name   |
|----|----------|----|--------|
| 1  | Andrew   | 2  | Andrew |
| 2  | Bob      | 4  | Bob    |
| 3  | Charlie  |    |        |
| 4  | David    |    |        |

- Only Andrew and Bob are present in both tables.

---

## 📌 SQL Syntax

```sql
SELECT *
FROM registrations
INNER JOIN logins
ON registrations.name = logins.name;
```

### ✅ Result

| registration_id | name   | login_id | name   |
|-----------------|--------|----------|--------|
| 1               | Andrew | 2        | Andrew |
| 2               | Bob    | 4        | Bob    |

---

## 🟡 About Venn Diagrams and Symmetry

- `INNER JOIN` is like the intersection of two Venn diagram circles — only overlapping rows are included.
- `A INNER JOIN B` is the same as `B INNER JOIN A`.

---

## 🛠️ SQL INNER JOIN Example in PGAdmin

Combine payment data with customer info (e.g., show the email for each payment):

```sql
SELECT *
FROM payment
INNER JOIN customer
ON payment.customer_id = customer.customer_id;
```
- Combines all rows where `customer_id` exists in both tables.

---

### 🔎 Select Specific Columns

```sql
SELECT 
  payment.payment_id,
  payment.customer_id,
  customer.first_name
FROM payment
INNER JOIN customer
ON payment.customer_id = customer.customer_id;
```
- Use `table_name.column_name` when the column name exists in both tables (e.g., `customer_id`).
- If a column is unique to one table (like `first_name`), prefixing is optional but good practice.

---

## 🧯 What INNER JOIN Excludes

- Customers who never made a payment.
- Payments not linked to a customer.
- Only matching records from both tables are returned.

---

## 🔄 Reminder

- You can swap the tables in `INNER JOIN`:

```sql
SELECT ...
FROM customer
INNER JOIN payment
ON customer.customer_id = payment.customer_id;
```
- The result is identical—`INNER JOIN` is order-independent.

---

## 💬 Final Thoughts

- `INNER JOIN` is the most basic and most commonly used join.
- It’s the foundation for understanding more advanced joins (`LEFT`, `RIGHT`, `FULL OUTER`).
- Best used when you only need records that appear in both tables.