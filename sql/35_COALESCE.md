# 📒 COALESCE

---

The `COALESCE` function returns the first non-NULL value from a list of arguments.

- It’s commonly used to handle NULL values without modifying the underlying data.

---

## 🔷 Syntax

```sql
COALESCE(value1, value2, ..., valueN)
```
- Checks each argument in order.
- Returns the first argument that is not NULL.
- If all arguments are NULL, returns NULL.

---

## 🧩 Simple Examples

**Example 1:**
```sql
SELECT COALESCE(1, 2, 3);
-- Output: 1 (First non-null value is 1)
```

**Example 2:**
```sql
SELECT COALESCE(NULL, 2, 3);
-- Output: 2 (First value is NULL, so it returns 2)
```

**Example 3:**
```sql
SELECT COALESCE(NULL, NULL, NULL);
-- Output: NULL (All are NULL)
```

---

## 🧩 Why is this useful?

When you have NULL values in your tables, you may want to treat them as a default value when doing calculations or displaying results — without altering the actual table.

---

## 🧩 Example: Pricing with Discounts

**Table: products**

| item | price | discount |
|------|-------|----------|
| A    | 100   | 20       |
| B    | 300   | NULL     |
| C    | 200   | 10       |

**Compute final price as `price - discount`:**

❌ *Without COALESCE:*
```sql
SELECT item, price - discount AS final_price
FROM products;
```
| item | final_price |
|------|-------------|
| A    | 80          |
| B    | NULL        |
| C    | 190         |

**Item B has NULL because discount was NULL.**

✅ *With COALESCE:*
```sql
SELECT item, price - COALESCE(discount, 0) AS final_price
FROM products;
```
| item | final_price |
|------|-------------|
| A    | 80          |
| B    | 300         |
| C    | 190         |

**Now NULL discount is treated as 0.**

---

## 🌟 Why use COALESCE instead of changing the data?

- You don’t actually want to change the table (NULL may mean “no discount set”).
- You just want to treat NULL as 0 in your query result.
- Keeps data integrity but still allows computation.

---

## 💡 Tip

- `COALESCE` can take more than two arguments — SQL will keep checking until it finds a non-NULL value.

```sql
COALESCE(discount, alternate_discount, 0)
```

---

## 🎯 Summary

- Use `COALESCE` when working with columns that might be NULL.
- It lets you specify a default value in the query.

---
