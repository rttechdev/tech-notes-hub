# 📒 UPDATE

---

The `UPDATE` command is used to modify existing rows in a table.

---

## 🔷 General Syntax

**Basic update:**
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
- If no `WHERE` is given → **all rows** in the table are updated.

---

## 🔷 Examples

**Set `last_login` to current timestamp where it is NULL:**
```sql
UPDATE account
SET last_login = CURRENT_TIMESTAMP
WHERE last_login IS NULL;
```
✅ Updates only rows where `last_login` is currently NULL.

**Update without a WHERE:**
```sql
UPDATE account
SET last_login = CURRENT_TIMESTAMP;
```
✅ Updates `last_login` for **all rows**.

**Update a column based on another column:**
```sql
UPDATE account
SET last_login = created_on;
```
✅ Sets `last_login` equal to `created_on` for all rows.

---

## 🔷 Updating Based on Another Table (Update Join)

You can update a table using values from another table — often called an update join.

**Syntax:**
```sql
UPDATE table_a
SET column_in_a = table_b.column_in_b
FROM table_b
WHERE table_a.key = table_b.key;
```

**Example:** Update `hire_date` in `account_job` to match `created_on` in `account`
```sql
UPDATE account_job
SET hire_date = account.created_on
FROM account
WHERE account_job.user_id = account.user_id;
```
✅ Matches rows on `user_id` and updates `hire_date` accordingly.

---

## 🔷 Returning Updated Rows

You can use the `RETURNING` clause to see the rows that were updated:

**Syntax:**
```sql
UPDATE table_name
SET column = value
RETURNING column1, column2, ...;
```

**Example:**
```sql
UPDATE account
SET last_login = CURRENT_TIMESTAMP
RETURNING email, last_login, created_on;
```
✅ Displays the updated rows and chosen columns — so you don’t need a separate `SELECT`.

---

## 🧪 Best Practices

- ✅ Always use a `WHERE` clause unless you really intend to update all rows.
- ✅ Use `RETURNING` to confirm what was changed.
- ✅ Test updates on a small dataset before running them on production.
- ✅ Be aware of constraints — updates that violate `NOT NULL`, `UNIQUE`, or foreign key constraints will fail.

---

🎯 **Next step:** Learn about the `DELETE` command to remove rows.

---