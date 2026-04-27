# 🧠 SQL LEFT OUTER JOIN

---

## 🔄 What is a LEFT OUTER JOIN?

- A `LEFT OUTER JOIN` returns:
  - All rows from the left table
  - Matching rows from the right table
  - If no match, NULL is returned for the right table columns
- ✅ Can be written simply as `LEFT JOIN`.
- 🧠 Order matters: The left table is the one listed first in the `FROM` clause.

---

## 🔍 Venn Diagram Analogy

- Only the left circle and the overlap are returned.
- Anything only in the right table is excluded.

---

## 🧾 SQL Syntax Example

```sql
SELECT *
FROM table_a
LEFT JOIN table_b
ON table_a.id = table_b.id;
```
- Returns:
  - Rows from `table_a` that match `table_b`
  - All other rows from `table_a` with NULLs for `table_b` columns where no match exists

---

## 🧪 Real-World Example: registrations and logins

```sql
SELECT *
FROM registrations
LEFT JOIN logins
ON registrations.name = logins.name;
```
- Returns all registrations (even if no login exists)
- Matching logins if available
- If no login: `logins` fields are NULL
- Users like Xavier and Yolanda (only in logins) are not shown

---

## 🔎 Filter to Get Rows Only in Left Table

**Goal:** Get rows in `registrations` but not in `logins`

```sql
SELECT *
FROM registrations
LEFT JOIN logins
ON registrations.name = logins.name
WHERE logins.id IS NULL;
```
- This isolates entries unique to the left table.

---

## 🛠 Practical PGAdmin Example

**Tables:**
- `film`: info about movies
- `inventory`: tracks which films are available in stores

**Schema notes:**
- `film.film_id` is the primary key
- `inventory.film_id` is a foreign key referencing `film.film_id`

---

### 🔧 Query 1: List all films and any inventory details

```sql
SELECT 
  film.film_id,
  film.title,
  inventory.inventory_id,
  inventory.store_id
FROM film
LEFT JOIN inventory
ON film.film_id = inventory.film_id;
```
**Outcome:**
- Films that are in inventory will show store info
- Films not in inventory will have NULL for `inventory_id` and `store_id`

---

### 🔍 Query 2: Find films not in inventory

```sql
SELECT 
  film.film_id,
  film.title
FROM film
LEFT JOIN inventory
ON film.film_id = inventory.film_id
WHERE inventory.film_id IS NULL;
```
**Use Case:**
- Shows films we know about but don’t currently stock
- Example: A customer asks for “Alice Fantasia” — you can check if it's in inventory using this method

---

## 💡 Takeaways

- Use `LEFT JOIN` when you want:
  - Everything from the left table, even if no match
  - Optionally filter to get only unmatched rows
- `WHERE right_table.column IS NULL` is a common pattern to get exclusive left table entries
- Table order is crucial — `A LEFT JOIN B ≠ B LEFT JOIN A`