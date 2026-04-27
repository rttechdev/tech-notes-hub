# 🔗 SQL UNION 

---

## 📌 What is UNION in SQL?

- The `UNION` operator combines the results of two or more `SELECT` statements by stacking rows on top of each other, eliminating duplicates by default.

---

## 🧠 Key Concept

- Think of `UNION` as pasting two query result sets vertically—row by row.

---

## 🛠️ Syntax

```sql
SELECT column1, column2 FROM table1
UNION
SELECT column1, column2 FROM table2;
```
- ⚠️ Both `SELECT` statements must have the same number of columns and compatible data types.

---

## 📊 Illustration

**First Quarter Sales**
| Name  | Amount |
|-------|--------|
| David | 100    |
| Clare | 50     |

**Second Quarter Sales**
| Name  | Amount |
|-------|--------|
| David | 200    |
| Clare | 100    |

**Result of UNION**
```sql
SELECT * FROM sales_q1
UNION
SELECT * FROM sales_q2;
```
| Name  | Amount |
|-------|--------|
| David | 100    |
| Clare | 50     |
| David | 200    |
| Clare | 100    |

- 📝 The rows are pasted one after another, just like stacking sheets of paper.

---

## 🧩 Notes

- Use `UNION ALL` if you want to include duplicates.
- You can append an `ORDER BY` clause at the end:
  ```sql
  ... 
  ORDER BY Name;
  ```
- Not the same as a `JOIN`, which combines columns based on a relationship.

---

## 🧪 Where UNION is Not Useful?

- The lecture notes that in the DVD Rental database, there's no good practical example for `UNION`—so it'll be covered again later with a more suitable dataset.

---