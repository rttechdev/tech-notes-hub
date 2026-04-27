# 📒 CHECK Constraint

---

The `CHECK` constraint is used to enforce custom rules/conditions on column values, to make sure only valid data is inserted.
- If the condition evaluates to false, the insert/update fails.

---

## 🔷 General Syntax

**When creating a table (column-level):**
```sql
CREATE TABLE table_name (
    column_name data_type CHECK (condition)
);
```

**Table-level CHECK (can reference multiple columns):**
```sql
CREATE TABLE table_name (
    column1 data_type,
    column2 data_type,
    CHECK (column2 > column1)
);
```

---

## 🧩 Examples

### 1️⃣ Simple condition: value > threshold
```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    salary INTEGER CHECK (salary > 0)
);
```

### 2️⃣ Date condition
```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    birth_date DATE CHECK (birth_date > '1900-01-01')
);
```

### 3️⃣ Compare columns
```sql
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    birth_date DATE CHECK (birth_date > '1900-01-01'),
    hire_date DATE CHECK (hire_date > birth_date)
);
```

---

## 🚨 What Happens if the Condition Fails?

- The insert/update is rejected, with an error:
  ```
  ERROR: new row violates check constraint
  ```

---

## 🔷 Notes

- `CHECK` constraints can involve:
  - Comparison operators (`>`, `<`, `=`)
  - Logical operators (`AND`, `OR`, `NOT`)
  - Other columns of the same row
- You can define **multiple** `CHECK` constraints in the same table.
- You can also add `CHECK` constraints later with `ALTER TABLE`.

---

## 🧪 Example Session

**✅ Inserting valid data:**
```sql
INSERT INTO employees (first_name, last_name, birth_date, hire_date, salary)
VALUES ('Jose', 'Portilla', '1990-11-03', '2010-01-01', 100);
```

**❌ Invalid birth date:**
```sql
INSERT INTO employees (first_name, last_name, birth_date, hire_date, salary)
VALUES ('Jose', 'Portilla', '1899-11-03', '2010-01-01', 100);
-- Error: violates birth_date check.
```

**❌ Negative salary:**
```sql
INSERT INTO employees (first_name, last_name, birth_date, hire_date, salary)
VALUES ('Sammy', 'Smith', '1990-11-03', '2010-01-01', -100);
-- Error: violates salary check.
```

---

## 🌟 Tip

- Even failed inserts still increment a `SERIAL` column, because it’s just a sequence generator.

---