# 🟦 SQL: SELECT ... WHERE Clause

## ✅ Purpose

- The `WHERE` clause is used to filter rows based on specific conditions.
- It appears immediately after the `FROM` clause in a `SELECT` statement.
- You'll use this in almost every SQL query.

---

## ✅ Basic Syntax

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

---

## ✅ Comparison Operators

Used to filter rows based on values in columns.

| Operator | Description               | Example                  |
|----------|---------------------------|--------------------------|
| =        | Equals                    | WHERE name = 'David'     |
| != or <> | Not equal to              | WHERE color != 'Red'     |
| >        | Greater than              | WHERE price > 10         |
| <        | Less than                 | WHERE age < 18           |
| >=       | Greater than or equal     | WHERE quantity >= 5      |
| <=       | Less than or equal        | WHERE score <= 100       |

- PostgreSQL allows both `!=` and `<>` for "not equal to", but `!=` is more common.

---

## ✅ Logical Operators

Used to combine multiple conditions:

| Operator | Description                     | Example                                |
|----------|---------------------------------|----------------------------------------|
| AND      | Both conditions must be true    | WHERE name = 'David' AND color = 'Red' |
| OR       | At least one must be true       | WHERE color = 'Red' OR color = 'Blue'  |
| NOT      | Negates a condition             | WHERE NOT price > 20                   |

---

## ✅ String Comparison Notes

- Strings must be enclosed in single quotes (`'David'`).
- Case-sensitive in PostgreSQL by default. `'david'` ≠ `'David'`.

---

## ✅ Example Use Case

**Filter rows with single condition:**
```sql
SELECT name, choice
FROM table
WHERE name = 'David';
```

**Filter with multiple conditions:**
```sql
SELECT name, choice
FROM table
WHERE name = 'David' AND choice = 'Red';
```

---

## 🧠 Key Takeaways

- `WHERE` filters data after `FROM` and before returning results.
- Use comparison and logical operators for powerful conditional filtering.
- String comparisons in PostgreSQL are case-sensitive.
- Combine multiple filters with `AND`, `OR`, and `NOT`.


# ✅ SQL: SELECT WHERE – Practical Usage & Examples

---

## 🔍 Basic WHERE Clause

Filter rows based on specific conditions.

```sql
SELECT * FROM customer
WHERE first_name = 'Jared';
```

---

## 🧪 Using Comparison Operators

You can use:

- `=`, `!=` or `<>`
- `<`, `>`, `<=`, `>=`

**Example:** Rental rate > 4

```sql
SELECT * FROM film
WHERE rental_rate > 4;
```

---

## 🔗 Using Logical Operators: AND / OR

You can combine multiple conditions.

**Example:** Rental rate > 4 AND replacement cost >= 19.99

```sql
SELECT * FROM film
WHERE rental_rate > 4 AND replacement_cost >= 19.99;
```

Further filter by rating = 'R':

```sql
SELECT * FROM film
WHERE rental_rate > 4
  AND replacement_cost >= 19.99
  AND rating = 'R';
```

---

## 🧮 COUNT with Conditions

You can use `COUNT(*)` or `COUNT(column)` to return number of matching rows.

```sql
SELECT COUNT(*) FROM film
WHERE rental_rate > 4
  AND replacement_cost >= 19.99
  AND rating = 'R';
```
- Returns: 34 films satisfying all conditions.

---

## 🔁 OR Operator

To get rows matching either condition:

```sql
SELECT COUNT(*) FROM film
WHERE rating = 'R' OR rating = 'PG-13';
```
- Returns: 418 films.

---

## 🚫 NOT EQUAL TO (!=)

Filter rows where the condition is not met:

```sql
SELECT * FROM film
WHERE rating != 'R';
```

---

## 📝 Quick Tips

- Use single quotes `'value'` for string matching.
- Combine conditions logically using `AND`, `OR`, and `NOT`.
- Use `COUNT(*)` to check how many rows match your filters.
- You don’t need multiple `WHERE` keywords—just combine with `AND` or `OR`.