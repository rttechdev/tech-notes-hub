# 📒 DELETE

---

The `DELETE` command is used to remove rows from a table.

---

## 🔷 General Syntax

**Basic delete:**
```sql
DELETE FROM table_name
WHERE condition;
```
- Removes rows matching the WHERE condition.
- If no WHERE is specified, **all rows** are deleted.

---

## 🧪 Example: Delete One Row

```sql
DELETE FROM job
WHERE job_name = 'Cowboy';
```
✅ Deletes the row where `job_name` is Cowboy.

---

## 🔷 Delete All Rows

```sql
DELETE FROM job;
```
✅ Deletes all rows from the `job` table but keeps the table structure intact.

---

## 🔷 Delete Using Another Table (Delete Join)

You can delete rows based on matches in another table — sometimes called a delete join.

**Syntax:**
```sql
DELETE FROM table_a
USING table_b
WHERE table_a.id = table_b.id;
```
✅ Deletes rows in `table_a` where the `id` matches an `id` in `table_b`.

---

## 🔷 Returning Deleted Rows

You can use the `RETURNING` clause to see which rows were deleted:

**Example:**
```sql
DELETE FROM job
WHERE job_name = 'Cowboy'
RETURNING job_id, job_name;
```
✅ Deletes the row(s) and shows the `job_id` and `job_name` of what was removed.

---

## 🧪 Best Practices

- ✅ Always use a `WHERE` clause unless you explicitly intend to delete all rows.
- ✅ Use `RETURNING` to double-check what was removed.
- ✅ Use transactions (`BEGIN`, `COMMIT`, `ROLLBACK`) when deleting important data to allow undo if needed.
- ✅ Be aware of foreign key constraints — deleting rows that are referenced elsewhere can fail unless you use `ON DELETE CASCADE` or similar.

---

🎯 **Next step:** Learn about `TRUNCATE` for faster, all-row deletion when you don’t need `RETURNING` or transactional rollback.

---