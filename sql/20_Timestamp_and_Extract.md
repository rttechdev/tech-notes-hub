# 🔍 Timestamps and Extract

---

## 📌 Purpose
This part introduces PostgreSQL’s functions to retrieve and display current date and time—especially useful when designing and logging records in custom tables.

---

## 📆 PostgreSQL Date/Time Data Types

| Data Type   | Description                   | Example                        |
|-------------|-------------------------------|--------------------------------|
| `time`      | Only time (hh:mm:ss)          | 13:45:30                       |
| `date`      | Only date (YYYY-MM-DD)        | 2025-07-21                     |
| `timestamp` | Both date and time            | 2025-07-21 13:45:30            |
| `timestamptz`| Timestamp with time zone     | 2025-07-21 13:45:30+05:30      |

- 🔎 Use the appropriate type based on your use case — avoid unnecessary precision like time zones if it's not relevant.

---

## 🕓 Time/Date Functions

| Function                 | Description                        | Returns Example                      |
|--------------------------|------------------------------------|--------------------------------------|
| `SHOW TIMEZONE;`         | Displays current DB timezone       | US/Eastern                           |
| `SELECT NOW();`          | Current date, time & timezone      | 2025-07-21 13:45:30.12345+05:30      |
| `SELECT TIMEOFDAY();`    | String form of current date-time   | Mon Jul 21 13:45:30 2025             |
| `SELECT CURRENT_DATE;`   | Returns current date only          | 2025-07-21                           |
| `SELECT CURRENT_TIME;`   | Returns current time only          | 13:45:30.12345+05:30                 |

---

## 🧠 Design Tip

- If your application may expand across time zones, store `timestamptz` to retain accurate records.
- 📌 Once you skip recording the time zone, you cannot recover it later.

---

## 🗂️ When Is This Useful?

- Automatically logging when a row was created.
- Tracking rental, login, or activity times.
- Extracting time components (covered in the next lecture).

---

## 📊 Illustration: Timestamp Use Case in a Work Log

```
Employee_Log Table
---------------------------------------------------
| emp_id | clock_in           | clock_out          |
|--------|--------------------|--------------------|
| 101    | 2025-07-21 09:00   | 2025-07-21 17:00   |
```
- Here, only time may be enough if all logs are same-day, same-time zone.
- But for global teams → prefer `timestamptz`.

---

---

# 🔍 SQL: EXTRACT, AGE, and TO_CHAR Functions – Summary

---

## 1. EXTRACT Function

- The `EXTRACT` function pulls out specific components of a timestamp (like year, month, day, etc.).

**✅ Syntax:**
```sql
SELECT EXTRACT(component FROM timestamp_column) AS alias_name;
```

**🔧 Example:**
```sql
SELECT EXTRACT(YEAR FROM payment_date) AS year FROM payment;
```

**📊 Diagram:**
```
Timestamp:   2007-02-15 18:00:00
-------------------------------
EXTRACT(YEAR):   2007
EXTRACT(MONTH):    2
EXTRACT(DAY):     15
EXTRACT(QUARTER):  1
```

---

## 2. AGE Function

- Calculates the time difference between the current date and a given timestamp.

**✅ Syntax:**
```sql
SELECT AGE(timestamp_column) FROM table;
```

**🔧 Example:**
```sql
SELECT AGE(payment_date) FROM payment;
```

**📊 Diagram:**
```
Current Date:   2025-07-21
Payment Date:   2007-02-15
--------------------------
AGE: 18 years 5 mons 6 days
```

---

## 3. TO_CHAR() Function

- Formats a timestamp into a custom string using format codes.

**✅ Syntax:**
```sql
SELECT TO_CHAR(timestamp_column, 'format') FROM table;
```

**🔧 Example:**
```sql
SELECT TO_CHAR(payment_date, 'MM-DD-YYYY') FROM payment;
```

**📖 Common Format Codes:**

| Code   | Description               | Example Output |
|--------|---------------------------|---------------|
| YYYY   | 4-digit year              | 2025          |
| MM     | 2-digit month             | 07            |
| DD     | 2-digit day               | 21            |
| Mon    | Abbreviated month name    | Jul           |
| Month  | Full month name           | July          |
| HH24:MI| 24-hour time + minutes    | 14:30         |

**🧠 Custom Example:**
```sql
SELECT TO_CHAR(payment_date, 'DD-MM-YYYY') AS euro_format FROM payment;
```

**📊 Formatting Example:**
```
Original:     2007-02-15 18:00:00
Formatted:    15-02-2007
```

---

## 📘 Summary Table

| Function | Purpose                       | Use Case Example                           |
|----------|-------------------------------|--------------------------------------------|
| EXTRACT  | Get year/month/day/quarter/etc.| EXTRACT(MONTH FROM payment_date)           |
| AGE      | Calculate age/duration        | AGE(payment_date)                          |
| TO_CHAR  | Format timestamp to string    | TO_CHAR(payment_date, 'YYYY-MM-DD')        |

---