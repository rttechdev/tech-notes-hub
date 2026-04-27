# 📒 Constraints

---

Constraints are rules applied to columns or tables to enforce data integrity and validity.  
They prevent invalid or inconsistent data from being stored in the database.

---

## 🔷 Why Constraints?

- Ensure accuracy & reliability of data.
- Can apply to:
  - A single column → column constraint
  - Multiple columns or the whole table → table constraint

---

## 🔷 Common Column Constraints

You define these when creating or altering a table.

| Constraint   | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| NOT NULL     | Value cannot be NULL. Enforces that every row must have a value for this column. |
| UNIQUE       | All values in the column must be distinct.                                  |
| PRIMARY KEY  | Combines NOT NULL + UNIQUE. Uniquely identifies each row.                   |
| FOREIGN KEY  | Ensures that a value in this column refers to a valid value in another table’s primary key. |
| CHECK        | Enforces that the value meets a specific condition.                         |
| EXCLUDE      | (Advanced) Ensures that no two rows have the same values on specified columns or expressions according to a custom operator. |

---

### 🔷 Examples of Column Constraints

```sql
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age >= 18)
);
```

---

## 🔷 Table Constraints

Some constraints are applied at the table level and can involve multiple columns.

| Table Constraint           | Description                                                        |
|----------------------------|--------------------------------------------------------------------|
| PRIMARY KEY (col1, col2)   | Defines a composite primary key across multiple columns.           |
| UNIQUE (col1, col2)        | Ensures the combination of these columns is unique.                |
| CHECK (condition)          | Condition that applies to all rows in the table.                   |
| REFERENCES                 | Defines a foreign key referencing another table.                   |

---

### 🔷 Example of Table Constraints

```sql
CREATE TABLE enrollment (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id), -- composite key
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);
```

---

## 🧪 Notes

- ✅ Use constraints wherever possible to enforce business rules at the database level.
- ✅ CHECK and EXCLUDE are more advanced — you’ll see examples in practice later.
- ✅ Table constraints are more flexible for multi-column rules.

---

## Quick Reference Table of Common Constraints

| Keyword      | Scope         | Notes                        |
|--------------|--------------|------------------------------|
| NOT NULL     | Column        | Requires a value             |
| UNIQUE       | Column/Table  | Unique per column or combination |
| PRIMARY KEY  | Column/Table  | Unique + Not Null            |
| FOREIGN KEY  | Column/Table  | Must match parent            |
| CHECK        | Column/Table  | Must satisfy condition       |
| EXCLUDE      | Table         | Advanced — unique by operator|

---

## ✅ Summary

- Constraints enforce data quality rules.
- Define them clearly when designing your tables to avoid bad data and maintain relational integrity.

---