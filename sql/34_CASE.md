# 📒 CASE Statement

---

The `CASE` statement allows you to add conditional logic into your SQL queries — similar to `if … else` statements in programming.

You can use it to:
- Return different values based on conditions.
- Categorize data.
- Perform calculations or aggregations conditionally.

---

## 🧩 Two Forms of CASE

### 1️⃣ General CASE Syntax (flexible)

Used when you want to write custom conditions.

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ELSE result_other
END
```

**Example:**
```sql
SELECT customer_id,
       CASE
           WHEN customer_id <= 100 THEN 'Premium'
           WHEN customer_id BETWEEN 101 AND 200 THEN 'Plus'
           ELSE 'Normal'
       END AS customer_class
FROM customer;
```
✔️ **Best when you need:**
- Inequalities (`>`, `<`, `BETWEEN`, `IN`)
- More complex conditions

---

### 2️⃣ CASE Expression Syntax (simple equality checks)

Used when you just want to match values against a single column/expression.

```sql
CASE expression
    WHEN value1 THEN result1
    WHEN value2 THEN result2
    ELSE result_other
END
```

**Example:**
```sql
SELECT customer_id,
       CASE customer_id
           WHEN 2 THEN 'Winner'
           WHEN 5 THEN 'Second Place'
           ELSE 'Normal'
       END AS raffle_result
FROM customer;
```
✔️ **Best when you just need to check if a column equals certain values.**

---

## 🧩 Using CASE in Aggregations

You can wrap a `CASE` inside an aggregate function to count or sum conditional groups.

**Example:**
```sql
SELECT 
    SUM(CASE WHEN rental_rate = 0.99 THEN 1 ELSE 0 END) AS bargains,
    SUM(CASE WHEN rental_rate = 2.99 THEN 1 ELSE 0 END) AS regular,
    SUM(CASE WHEN rental_rate = 4.99 THEN 1 ELSE 0 END) AS premium
FROM film;
```

➡️ **Output:**

| bargains | regular | premium |
|----------|---------|---------|
| 341      | 330     | 321     |

This counts how many films fall into each rental rate category, and outputs them as separate columns.

---

## 🌟 Tips

- Use an alias (`AS`) to give your CASE result a meaningful column name.
- The general CASE is more flexible, but the CASE expression is shorter when just checking for equality.
- You can use CASE anywhere a column expression is allowed — `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY`, etc.

---
