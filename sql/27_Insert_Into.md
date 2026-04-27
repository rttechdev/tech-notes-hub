# 📒 INSERT INTO

---

The `INSERT` command is used to add new rows to a table.

---

## 🔷 General Syntax

**Insert specific values:**
```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```
- You must specify a value for all columns with `NOT NULL` constraints.
- Columns with `SERIAL` data type (usually primary key) do not need to be specified — they auto-increment.

**Insert from another table:**
```sql
INSERT INTO table_name (column1, column2, ...)
SELECT column1, column2, ...
FROM another_table
WHERE condition;
```
- ⚠️ Values selected must match the data types and constraints of the target table.

---

## 🔷 Example: Insert into `account`

Given the `account` table:
| Column      | Data Type                        | Constraint             |
|-------------|----------------------------------|------------------------|
| user_id     | SERIAL PRIMARY KEY               |                        |
| username    | VARCHAR(50) UNIQUE NOT NULL      |                        |
| password    | VARCHAR(50) NOT NULL             |                        |
| email       | VARCHAR(250) UNIQUE NOT NULL     |                        |
| created_on  | TIMESTAMP NOT NULL               |                        |
| last_login  | TIMESTAMP                        | nullable               |

Insert a row:
```sql
INSERT INTO account (username, password, email, created_on)
VALUES ('Jose', 'password', 'jose@gmail.com', CURRENT_TIMESTAMP);
```
- ✅ No need to specify `user_id` → handled automatically by `SERIAL`.
- ✅ `last_login` can be left NULL (no `NOT NULL` constraint).

---

## 🔷 Example: Insert into `job`

Given the `job` table:
| Column   | Data Type                   |
|----------|-----------------------------|
| job_id   | SERIAL PRIMARY KEY          |
| job_name | VARCHAR(200) UNIQUE NOT NULL|

Insert jobs:
```sql
INSERT INTO job (job_name)
VALUES ('Astronaut');

INSERT INTO job (job_name)
VALUES ('President');
```

Verify:
```sql
SELECT * FROM job;
```
Results:
| job_id | job_name   |
|--------|------------|
| 1      | Astronaut  |
| 2      | President  |

---

## 🔷 Example: Insert into `account_job`

Given the `account_job` table:
| Column    | Data Type                   | Constraint                       |
|-----------|-----------------------------|-----------------------------------|
| user_id   | INT REFERENCES account(user_id) |                                  |
| job_id    | INT REFERENCES job(job_id)      |                                  |
| hire_date | TIMESTAMP                       |                                  |

Insert a relationship:
```sql
INSERT INTO account_job (user_id, job_id, hire_date)
VALUES (1, 1, CURRENT_TIMESTAMP);
```
- ✅ Both `user_id` and `job_id` must exist in their respective tables.
- ✅ Foreign key constraints enforce this — if invalid values are given, you get an error:

> insert or update on table "account_job" violates foreign key constraint

---

## 🔷 Common Pitfalls

- ⚠️ Forgetting `NOT NULL` columns → results in an error.
- ⚠️ Violating `UNIQUE` constraints → error.
- ⚠️ Providing invalid foreign key references → error.
- ⚠️ Forgetting that `SERIAL` columns auto-increment → don’t include them manually.

---

## 🧪 Best Practices

- ✅ Always list the column names explicitly in `INSERT`.
- ✅ Use `CURRENT_TIMESTAMP` for timestamp fields when appropriate.
- ✅ Check the schema (`\d table_name` in psql or pgAdmin) to understand constraints.
- ✅ Validate foreign key values exist before inserting into referencing tables.

---

🎯 **Next step:** Learn about `UPDATE` and `DELETE` to modify and remove rows.