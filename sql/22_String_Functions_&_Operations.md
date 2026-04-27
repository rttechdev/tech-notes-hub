# 🔤 PostgreSQL String Functions & Operations

---

## 📘 1. String Functions Reference

- See the official PostgreSQL docs:  
  [https://www.postgresql.org/docs/current/functions-string.html](https://www.postgresql.org/docs/current/functions-string.html)
- Includes:
  - Concatenation
  - Length check
  - Upper/lowercase conversion
  - Pattern matching (`LIKE`, `ILIKE`)
  - Regex operations
  - Encoding conversions

---

## 🧪 2. Practical Examples with the `customer` Table

**Sample structure:**
```sql
SELECT * FROM customer;
```
| customer_id | first_name | last_name | email            |
|-------------|------------|-----------|------------------|
| 1           | John       | Doe       | john@example.com |

---

## ✂️ 3. Getting Length of a String

```sql
SELECT LENGTH(first_name) FROM customer;
```
🧠 Purpose: Measure number of characters in each `first_name`.

---

## 🔗 4. String Concatenation

```sql
SELECT first_name || ' ' || last_name AS full_name FROM customer;
```
- 🧠 Operator: `||` is used to concatenate strings.

**Result:**
| full_name   |
|-------------|
| John Doe    |
| Alice Smith |

---

## 🔡 5. Case Conversion

```sql
SELECT UPPER(first_name), LOWER(last_name) FROM customer;
```
- `UPPER()` → Converts text to uppercase
- `LOWER()` → Converts text to lowercase

---

## 📧 6. Create a Custom Email Address

**Use case:** Simulate email address creation using:
- First initial of `first_name`
- Full `last_name`
- Append domain (`@gmail.com`)

```sql
SELECT 
  LOWER(LEFT(first_name, 1) || last_name || '@gmail.com') AS custom_email
FROM customer;
```

**Result:**
| custom_email     |
|------------------|
| jdoe@gmail.com   |
| asmith@gmail.com |

---

## 🗂️ 7. Diagram: String Email Construction

```
+------------+------------+---------------------+
| first_name | last_name  | custom_email        |
+------------+------------+---------------------+
| John       | Doe        | jdoe@gmail.com      |
| Alice      | Smith      | asmith@gmail.com    |
+------------+------------+---------------------+
```

**🧠 Breakdown:**
- `LEFT(first_name, 1)` → 'J'
- `|| last_name` → 'Doe'
- `|| '@gmail.com'` → Final: 'jdoe@gmail.com'
- `LOWER()` wraps entire expression

---

## 🔍 8. Explore More

You can experiment with additional string functions such as:
- `REPLACE()`
- `TRIM()`
- `SUBSTRING()`
- `POSITION()`
- `REGEXP_REPLACE()`
- `INITCAP()` (capitalizes the first letter)

🧭 Tip: Visit Section 9.7 in PostgreSQL documentation for regex and pattern matching.