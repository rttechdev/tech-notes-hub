# 🧠 SQL HAVING Clause

---

## 🔸 Purpose of HAVING

- Used after `GROUP BY` to filter aggregated results.
- Similar to `WHERE`, but applies to aggregates like `SUM`, `COUNT`, `AVG`, etc.

---

## 🔍 When to Use HAVING vs WHERE

| Clause | Filters Data...      | Can Use Aggregates? |
|--------|----------------------|---------------------|
| WHERE  | Before grouping      | ❌ No               |
| HAVING | After grouping       | ✅ Yes              |

---

## 🧪 Examples

### 🔹 Sum per Company with Filter

```sql
SELECT company, SUM(sales)
FROM financials
GROUP BY company
HAVING SUM(sales) > 1000;
```
- Filters after aggregation, keeping only companies with total sales > 1000.

---

### 🔹 Customer Payments Example

```sql
SELECT customer_id, SUM(amount)
FROM payment
GROUP BY customer_id
HAVING SUM(amount) > 100;
```
- Returns customers with total payments greater than 100.

- ✅ You must use aggregate functions like `SUM(amount)` in the `HAVING` clause.

---

### 🔹 Count Example: Customers Per Store

```sql
SELECT store_id, COUNT(*) 
FROM customer
GROUP BY store_id
HAVING COUNT(*) > 300;
```
- 💡 `COUNT(*)` and `COUNT(customer_id)` are equivalent here.

---

## ⚠️ Key Rules

- You cannot use `WHERE` to filter based on aggregate functions.
- You must use `HAVING` to filter based on values like `SUM(...)`, `AVG(...)`, `COUNT(...)`.
- Always use full aggregate expressions in `HAVING` (e.g., `HAVING SUM(amount) > 100` not `HAVING amount > 100`).

---

## 🔁 Example Workflow

1. **Apply `WHERE`** to filter raw rows (optional)
2. **Use `GROUP BY`** to group data
3. **Use aggregation functions** (`SUM`, `COUNT`, etc.)
4. **Apply `HAVING`** to filter aggregated results
5. **Use `ORDER BY`** if sorting is needed

---