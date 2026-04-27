# 📘 SQL Joins & Unions

---

## 🔹 Aliases (AS clause)

- The `AS` clause is used to rename a column or table temporarily for readability.

**Example:**
```sql
SELECT first_name AS name FROM customers;
```

---

## 🔹 Joins Overview

- Joins combine data from two or more tables based on related columns.

---

### 🔸 INNER JOIN

- Returns rows when there is a match in both tables.
- Common and most used join.

**Syntax:**
```sql
SELECT * 
FROM table1
INNER JOIN table2
ON table1.id = table2.fk_id;
```

---

### 🔸 LEFT JOIN (LEFT OUTER JOIN)

- Returns all rows from the left table, and matched rows from the right table.
- Unmatched rows from the right table are shown as NULL.

---

### 🔸 RIGHT JOIN (RIGHT OUTER JOIN)

- Exactly like a LEFT JOIN, but tables are switched.
- Returns all rows from the right table, with matched rows from the left.
- **Tip:** You can avoid using RIGHT JOIN by rewriting the query using LEFT JOIN and reversing table order.

---

### 🔸 FULL OUTER JOIN

- Combines the results of LEFT and RIGHT JOIN.
- Returns all rows from both tables, with NULLs in place where a match doesn't exist.

**Syntax:**
```sql
SELECT * 
FROM table1
FULL OUTER JOIN table2 
ON table1.id = table2.fk_id;
```

---

### 🔸 Self Join

- Joining a table to itself.
- Useful for hierarchical data like employee-manager relationships.

---

### 🔸 Cross Join

- Produces the Cartesian product of both tables (every row from table A with every row from table B).
- Rarely used unless needed.

---

### 🔸 Filtering with Joins

- You can use `WHERE` to filter after the join, or `ON` for filtering during the join logic.
- Clarifies what records you want in your final result.

---

## 🔹 UNION Operator

- Combines the results of two or more SELECT statements.
- Each SELECT must return the same number of columns, with compatible data types.
- Removes duplicates by default. Use `UNION ALL` to include duplicates.

**Syntax:**
```sql
SELECT column1, column2 FROM table1
UNION
SELECT column1, column2 FROM table2;
```

**Use Case Example:**
You have two quarterly sales tables:
- `sales_q1` with data for Q1
- `sales_q2` with data for Q2

Combine them:
```sql
SELECT * FROM sales_q1
UNION
SELECT * FROM sales_q2;
```
- Stacks both results as one combined table.

---

### 🔹 Ordering with UNION

- Use `ORDER BY` after the final SELECT:

```sql
SELECT ... 
UNION 
SELECT ...
ORDER BY name;
```

---

## 📝 Key Reminders

- Focus deeply on understanding LEFT JOIN, and you'll grasp RIGHT JOIN easily.
- Use aliases for clarity.
- Unions are for combining rows vertically, not horizontally like joins.
- For performance, prefer explicit JOINs and avoid overusing FULL JOIN or UNION if unnecessary.