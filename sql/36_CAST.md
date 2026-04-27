# 📒 CAST

---

The `CAST` operator is used to convert a value from one data type to another.

- It’s useful when you need to work with data in a type that better suits your operation — for example, turning a string into an integer so you can perform arithmetic, or turning an integer into a string so you can measure its length.

---

## 🔷 Key Rule

- You can only cast data when it’s reasonable and possible to convert between types.

  | Example          | Valid? |
  |------------------|--------|
  | `'5'` → integer  | ✅     |
  | `'five'` → integer | ❌   |

---

## 🧩 Syntax

There are two main ways to perform a cast:

### ✅ Standard SQL Function

```sql
CAST(value AS target_data_type)
```

**Example:**
```sql
SELECT CAST('5' AS INTEGER);
-- Result: 5 (as an integer)
```
You can alias the result:
```sql
SELECT CAST('5' AS INTEGER) AS new_int;
```

---

### ✅ PostgreSQL-Specific Shorthand

PostgreSQL provides a shortcut using double colons (`::`):

```sql
value::target_data_type
```
**Example:**
```sql
SELECT '5'::INTEGER;
-- Same result as above
```

---

## 🧩 Why use CAST?

- To convert strings to numbers and vice versa.
- To convert dates to strings, timestamps, etc.
- To use functions that only work with certain types.

---

## 🧩 Real-World Example: inventory_id

**Table: rental**

| inventory_id |
|--------------|
| 1            |
| 100          |
| 23           |

You want to know the number of digits in each `inventory_id`.

### 🔷 Problem

```sql
SELECT char_length(inventory_id) FROM rental;
```
❌ Error: because `inventory_id` is an integer and `char_length()` expects a string.

### 🔷 Solution

```sql
SELECT char_length(CAST(inventory_id AS VARCHAR)) AS num_digits
FROM rental;
```
Or:
```sql
SELECT char_length(inventory_id::VARCHAR) AS num_digits
FROM rental;
```

**Result:**

| num_digits |
|------------|
| 1          |
| 3          |
| 2          |

---

## 🌟 Tips

- ✅ Use `CAST` when:
  - The data type of a column or value doesn’t match what your function expects.
  - You want to format or manipulate data as another type.
- 🚫 Don’t expect `CAST` to magically parse human language or invalid data.

---

## 🎯 Summary

- `CAST(value AS type)` is standard SQL.
- `value::type` is PostgreSQL shorthand.
- Use it for conversions that make sense: numbers ↔ strings, date ↔ timestamp, etc.

---