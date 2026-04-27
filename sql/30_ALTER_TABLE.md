# 📒 ALTER TABLE

---

The `ALTER TABLE` command is used to modify the structure of an existing table.
It has many use cases, including adding/removing columns, renaming columns or tables, and changing constraints.

---

## 🔷 General Syntax

```sql
ALTER TABLE table_name action;
```
Where `action` could be one of many options:

---

## 🧱 Common Actions

### ➕ Add a New Column

```sql
ALTER TABLE table_name
ADD COLUMN column_name data_type [constraints];
```
**Example:**
```sql
ALTER TABLE employees
ADD COLUMN department VARCHAR(50);
```

---

### ❌ Remove a Column

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```
**Example:**
```sql
ALTER TABLE employees
DROP COLUMN department;
```

---

### ✏️ Rename the Table

```sql
ALTER TABLE old_table_name
RENAME TO new_table_name;
```
**Example:**
```sql
ALTER TABLE employees
RENAME TO staff;
```

---

### ✏️ Rename a Column

```sql
ALTER TABLE table_name
RENAME COLUMN old_column_name TO new_column_name;
```
**Example:**
```sql
ALTER TABLE staff
RENAME COLUMN name TO full_name;
```

---

### 📝 Modify Constraints on a Column

- **Set default:**
  ```sql
  ALTER TABLE table_name
  ALTER COLUMN column_name SET DEFAULT default_value;
  ```
- **Drop default:**
  ```sql
  ALTER TABLE table_name
  ALTER COLUMN column_name DROP DEFAULT;
  ```
- **Set NOT NULL:**
  ```sql
  ALTER TABLE table_name
  ALTER COLUMN column_name SET NOT NULL;
  ```
- **Drop NOT NULL:**
  ```sql
  ALTER TABLE table_name
  ALTER COLUMN column_name DROP NOT NULL;
  ```
**Example:**
```sql
ALTER TABLE staff
ALTER COLUMN department DROP NOT NULL;
```

---

### 🧩 Add or Drop a General Constraint

- **Add constraint:**
  ```sql
  ALTER TABLE table_name
  ADD CONSTRAINT constraint_name CHECK (condition);
  ```
  **Example:**
  ```sql
  ALTER TABLE staff
  ADD CONSTRAINT salary_check CHECK (salary > 0);
  ```
- **Drop constraint:**
  ```sql
  ALTER TABLE table_name
  DROP CONSTRAINT constraint_name;
  ```
  **Example:**
  ```sql
  ALTER TABLE staff
  DROP CONSTRAINT salary_check;
  ```

---

## 📚 Tips

- Always check the current table structure with:
  ```sql
  \d table_name
  ```
  in psql, or use the GUI in pgAdmin.
- Dropping constraints or `NOT NULL` can lead to inconsistent data — use carefully.
- The official PostgreSQL documentation has a full list of all actions `ALTER TABLE` supports — refer to it when needed.

---