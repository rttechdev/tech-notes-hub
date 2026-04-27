# 🧠 SQL RIGHT JOIN

---

## 🔄 What is a RIGHT JOIN?

- A `RIGHT JOIN` (or `RIGHT OUTER JOIN`) returns:
  - All rows from the right table
  - Matching rows from the left table
  - If no match, returns NULL for left table columns

- 🔁 It’s exactly like a `LEFT JOIN` — but with tables reversed.
- You can always use a `LEFT JOIN` by just switching table order.

---

## 🔍 Venn Diagram Analogy

- Think of the right circle and the overlap.
- A `RIGHT JOIN` includes:
  - Rows found in both tables
  - Plus rows only in the right table
  - Rows only in the left table are excluded

---

## 🧾 SQL RIGHT JOIN Syntax

```sql
SELECT *
FROM table_a
RIGHT JOIN table_b
ON table_a.id = table_b.id;
```
- This returns all rows from `table_b`, with matching data from `table_a`
- If no match: `table_a` columns will be NULL

---

## 🔁 Right Join = Left Join with Table Flip

These two queries return the same result:

```sql
-- RIGHT JOIN
SELECT *
FROM A
RIGHT JOIN B
ON A.id = B.id;

-- Equivalent LEFT JOIN by flipping tables
SELECT *
FROM B
LEFT JOIN A
ON B.id = A.id;
```
- ✅ They produce the same output — the only difference is which table you treat as primary in your mind.

---

## 🔍 Example: Filter Rows Found Only in Right Table

```sql
SELECT *
FROM registrations
RIGHT JOIN logins
ON registrations.name = logins.name
WHERE registrations.name IS NULL;
```
- This query returns all users in `logins` who never registered
- We look for NULL in `registrations` — meaning no match found

---

## 💡 Takeaways

- A `RIGHT JOIN` is just a `LEFT JOIN` with the tables flipped
- Use `RIGHT JOIN` when it’s easier to think of the right table as the “base”
- If you're comfortable with `LEFT JOIN`, you don’t need to use `RIGHT JOIN` — just switch the order of tables in your `LEFT JOIN` query
- Don’t stress about memorizing both — master `LEFT JOIN` and `RIGHT JOIN` becomes intuitive