# 📒 Primary & Foreign Keys

---

## 🔷 Primary Key

- A column (or set of columns) that uniquely identifies each row in a table.

### **Properties:**
- Must be unique: no two rows can have the same value.
- Cannot be NULL: every row must have a value for the primary key.
- Commonly used for joining tables and ensuring data integrity.

**Example:**
```sql
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
```
Here, `customer_id` is the primary key — unique & non-null for each customer.

✅ **Best practice:** Use a numeric, auto-incrementing value (e.g., `SERIAL` in PostgreSQL) as primary key, rather than a natural value like name.

---

## 🔷 Foreign Key

- A column (or set of columns) in one table that references the primary key in another table.

### **Defines a relationship between two tables:**
- The table containing the foreign key is the **child (referencing) table**.
- The table being referenced is the **parent (referenced) table**.

**Example:**
```sql
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id),
    amount DECIMAL(5,2)
);
```
Here, `customer_id` in `payment` is a foreign key referring to `customer_id` in `customer`.

✅ **Foreign keys enforce referential integrity**, ensuring that the value exists in the parent table.

---

## 🔷 Identifying Primary & Foreign Keys in Tools (like pgAdmin)

- **Primary keys:**
  - Clearly marked as `PRIMARY KEY` in queries & table definitions.
  - Usually indicated with a gold key symbol in GUIs.

- **Foreign keys:**
  - Not always obvious in `SELECT *` queries.
  - To view:
    - Navigate to the table in your database browser (e.g., pgAdmin).
    - Open the **Constraints** section:
      - Primary key → single gold key.
      - Foreign keys → dual silver keys.
    - Right-click on a foreign key → Properties or Dependencies tab → shows the parent table & column it references.

---

## 🔷 Why Not Use Names as Keys?

- Names, emails, etc., can repeat and may change.
- Numeric keys (`SERIAL`, `BIGSERIAL`) are simple, efficient, and reliable.

---

## 🧪 Summary Table

| Concept      | Definition                                                      |
|--------------|-----------------------------------------------------------------|
| Primary Key  | Unique, non-null identifier for each row in a table.            |
| Foreign Key  | Column(s) referencing the primary key in another table, defining a relationship. |
| Parent Table | Table whose primary key is being referenced.                    |
| Child Table  | Table containing the foreign key.                               |

✅ **Together, primary & foreign keys form the backbone of relational integrity and allow you to join tables meaningfully.**

---