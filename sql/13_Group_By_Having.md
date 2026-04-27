# ✅ GROUP BY & HAVING

---

## 🔹 Aggregate Functions (without GROUP BY)

- Aggregate functions compute a single result from a set of input values:
  - `SUM()`, `AVG()`, `MAX()`, `MIN()`, `COUNT()`

**Example:**
```sql
SELECT SUM(amount) FROM payments;
```

---

## 🔹 GROUP BY

- `GROUP BY` groups rows that have the same values in specified columns into summary rows.
- Typically used with aggregate functions to summarize data.

**Example:**
```sql
SELECT customer_id, SUM(amount)
FROM payments
GROUP BY customer_id;
```

---

## 🔹 WHERE vs HAVING

- `WHERE` filters rows before aggregation.
- `HAVING` filters rows after aggregation.

**⚠️ Why HAVING is needed:**
- You can't use `WHERE` to filter on `SUM()`, `COUNT()`, etc., because aggregation happens after `WHERE` is applied.
- Use `HAVING` to filter aggregate results.

**Example:**
```sql
-- Invalid: filtering aggregate in WHERE
SELECT customer_id, SUM(amount)
FROM payments
WHERE SUM(amount) > 100 -- ❌ Invalid
GROUP BY customer_id;

-- Correct: using HAVING
SELECT customer_id, SUM(amount)
FROM payments
GROUP BY customer_id
HAVING SUM(amount) > 100; -- ✅
```

---

## 🔹 Another Example with COUNT()

```sql
SELECT store_id, COUNT(*) AS customer_count
FROM customer
GROUP BY store_id
HAVING COUNT(*) > 300;
```
- You can use `COUNT(*)` or `COUNT(customer_id)` — they behave the same here.

---

## 🔸 Tips

- You can combine `WHERE` and `HAVING`:

```sql
SELECT customer_id, SUM(amount)
FROM payments
WHERE customer_id NOT IN (184, 87, 477)
GROUP BY customer_id
HAVING SUM(amount) > 100;
```

---

## ✅ Upcoming Section Overview – JOINS

*(No notes yet, but here's what it will cover):*

- AS clause (aliasing)
- INNER JOIN
- LEFT JOIN / RIGHT JOIN
- FULL OUTER JOIN
- UNION
- Practice challenges

➡️ Looking forward to the next transcript on joins to extract more detailed notes.