# 🎓 The AS Clause in SQL

---

## 🧾 Syntax

```sql
SELECT column_name AS alias_name FROM table_name;
```
- You can also apply it to functions:

```sql
SELECT SUM(column_name) AS alias_name FROM table_name;
```

---

## 🧠 Why Use Aliases?

- Improves clarity in output, especially for calculated or complex expressions.
- Helps rename columns or results to be more meaningful for reports or analysis.

---

## ✅ Example 1: Renaming a Column

```sql
SELECT amount AS rental_price FROM payment;
```
- The output will display `rental_price` instead of `amount`.

---

## ✅ Example 2: Renaming a Function Result

```sql
SELECT SUM(amount) AS net_revenue FROM payment;
```
- Output will show the total as `net_revenue`.

---

## ⚠️ Important Note: When NOT to Use an Alias

- Aliases are assigned after the `SELECT` clause is executed, so they:
  - Cannot be used in `WHERE` or `HAVING` clauses.
  - Are only available in the final output.

**❌ Incorrect Usage:**
```sql
SELECT SUM(amount) AS total_spent FROM payment
GROUP BY customer_id
HAVING total_spent > 100; -- ❌ This will error out
```

**✅ Correct Usage:**
```sql
SELECT customer_id, SUM(amount) AS total_spent
FROM payment
GROUP BY customer_id
HAVING SUM(amount) > 100; -- ✅ Use original function
```

**❌ Incorrect with WHERE:**
```sql
SELECT amount AS new_name FROM payment
WHERE new_name > 2; -- ❌ Invalid
```

**✅ Correct:**
```sql
SELECT amount AS new_name FROM payment
WHERE amount > 2; -- ✅ Use original column
```

---

## ✅ Key Takeaways

- Use `AS` for better output readability.
- You can use aliases in the `SELECT` output, but not in `WHERE` or `HAVING` clauses.
- Always refer to the original column or function name when applying filters.

---