# 📒 CREATE TABLE

---

The `CREATE TABLE` command in SQL is used to define a new table with columns, data types, constraints, and optionally relationships to other tables.

---

## 🔷 General Syntax

```sql
CREATE TABLE table_name (
    column_name data_type [column_constraints],
    column_name data_type [column_constraints],
    ...
    [table_constraints]
);
```
- ✅ Separate each column definition with a comma.
- ✅ Last column/constraint should not have a trailing comma.

---

## 🔷 Steps to Create a Table

1️⃣ Choose a table name.  
2️⃣ Define one or more columns, each with:
   - Name
   - Data type
   - (Optional) Constraints (`NOT NULL`, `UNIQUE`, `PRIMARY KEY`, etc.)  
3️⃣ Optionally define table-level constraints, e.g., composite primary key.

---

## 🔷 Example: Players Table

```sql
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    age SMALLINT NOT NULL CHECK (age <= 18)
);
```
- `player_id` → `SERIAL` generates unique integers automatically (good for primary keys).
- `age` → small integer (as age is small) with `NOT NULL` and an upper limit (`CHECK`).

---

## 🔷 Notes on SERIAL

- `SERIAL` is a PostgreSQL convenience type for auto-incrementing integers.
- Creates a sequence internally and assigns the next number to each new row.
- Gaps remain if rows are deleted (i.e., no renumbering happens).

**Variants:**
- `SMALLSERIAL` → 2 bytes
- `SERIAL` → 4 bytes
- `BIGSERIAL` → 8 bytes

---

## 🔷 Example: Account Table

```sql
CREATE TABLE account (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);
```

---

## 🔷 Example: Job Table

```sql
CREATE TABLE job (
    job_id SERIAL PRIMARY KEY,
    job_name VARCHAR(200) UNIQUE NOT NULL
);
```

---

## 🔷 Example: Account-Job Relationship Table

```sql
CREATE TABLE account_job (
    user_id INT REFERENCES account(user_id),
    job_id INT REFERENCES job(job_id),
    hire_date TIMESTAMP
);
```
- `user_id` and `job_id` are foreign keys, referencing the primary keys of `account` and `job`.
- Do **not** use `SERIAL` for foreign key columns — just use `INT`.

---

## 🧪 Tips & Best Practices

- ✅ Always define a primary key for each table.
- ✅ Use `SERIAL` for auto-incrementing primary keys.
- ✅ Use meaningful constraints (`NOT NULL`, `UNIQUE`, etc.) to enforce data integrity.
- ✅ Use `REFERENCES` to define foreign key relationships.
- ✅ Refresh your database browser in pgAdmin to see new tables after creation.
- ✅ If a table already exists, running `CREATE TABLE` again will throw an error:  
  ```
  relation "table_name" already exists
  ```

---