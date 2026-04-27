# 🧮 Mathematical Functions in PostgreSQL

---

## 📘 Categories Covered

- 🔹 Basic Mathematical Operators
- 🔹 Common Mathematical Functions
- 🔹 Use Cases with Real Table Data
- 🔹 Where to Find Docs

---

## 1. 🔹 Basic Math Operators

| Operator | Description          | Example SQL         |
|----------|----------------------|---------------------|
| +        | Addition             | price + tax         |
| -        | Subtraction          | total - discount    |
| *        | Multiplication       | quantity * price    |
| /        | Division             | revenue / units     |
| %        | Modulo (remainder)   | total % 10          |

**🎯 Example: Film Table Analysis**

| film_id | title         | rental_rate | replacement_cost |
|---------|---------------|-------------|------------------|
| 1       | Iron Giant    | 2.99        | 9.99             |
| 2       | Ocean's Call  | 1.99        | 14.99            |

---

## 2. 🔹 Percentage Calculation

**📌 Find what percentage the rental rate is of the replacement cost:**

```sql
SELECT ROUND((rental_rate / replacement_cost) * 100, 2) AS percent_cost
FROM film;
```

**📊 Visualization:**
```
Rental Rate:         2.99
Replacement Cost:    9.99
----------------