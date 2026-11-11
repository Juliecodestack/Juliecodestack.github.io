---
title: "SQL for absolute beginners: a map of CRUD"
date: "2026-11-10T18:50:56+08:00"
tags:
  - SQL
  - Database
---

Have you heard of SQL but aren't sure where to start? I felt the same way once. It turns out SQL is easier than most people imagine, especially if you already know your way around Excel.

In this post, I'll give you a map of SQL: the four core operations, the keywords to perform them, and enough examples to run your first queries right away.

## What SQL actually is

**SQL is not a database.** I used to think it was, because of the names of database management systems like SQLite and MySQL.

SQL stands for **Structured Query Language**. It's the language we use to talk to a relational database. Though it's called a language, it's much simpler than general-purpose programming languages like Python, JavaScript, or C. A programming language tells the computer *how* to do a task; SQL tells the database *what* you want. That's why we call it declarative.

If you're coming from Excel, a database is like a workbook, and each table is like a sheet. Data lives in rows and columns: a row describes one thing, like an order, while a column holds one attribute of that thing, such as a product name or price.

## Where to practice

I'd start with [SQLBolt](https://sqlbolt.com/). It's a great site: it introduces these concepts and gives you exercises so you learn by doing. I learned a lot from it.

Another option is DB Browser for SQLite. Install it, open it, and click **New Database** to create a database (a `.db` file). Then open the **Execute SQL** tab shown below, type a SQL statement in the blank area, and click **Run** (the ▶ button).

![image-20261107112742930](/imgs/image-20261107112742930.png)

If you'd like to follow the examples in this post, run the SQL below to create the tables and add a few rows. Don't worry about the syntax yet, as you'll learn what each statement does in the following sections.

```sql
CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY,
    name TEXT,
    class TEXT
);
CREATE TABLE IF NOT EXISTS scores(
    student_id INTEGER,
    subject TEXT,
    score INTEGER
);
INSERT INTO students
VALUES (1, 'Mary',  'A'),
       (2, 'Bob',   'A'),
       (3, 'Alice', 'A'),
       (4, 'John',  'B'),
       (5, 'Cathy', 'B');
INSERT INTO scores
VALUES (1, 'English', 88),
       (1, 'Math',    91),
       (2, 'Math',    79),
       (4, 'Math',    87);
```

The example database has two tables, `students` and `scores`, linked by a key: `students.id` matches `scores.student_id`. You'll see why that matters when we join them.

![image-20261108173754839](/imgs/image-20261108173754839.png)

If you have your own data, you can use that too: save an `.xlsx` file as CSV, create a new database in DB Browser, and import the CSV. In real applications, though, rows usually arrive through the application itself, and table structures are managed by developers using migration tools.

One practical tip: DB Browser doesn't commit your changes to the database file until you click **Write Changes** (or run `COMMIT;`), so click **Write Changes** after running the setup above. If you close the app and choose **Discard**, or if it crashes, the changes are rolled back.

## The basic operations: CRUD

The basic operations on a database are **C**reate, **R**ead, **U**pdate, and **D**elete—CRUD. Create, update, and delete are "write" operations: they modify the data.

Let's start with read, since it's the most common operation.

### Read: `SELECT`

#### Querying one table

Use `SELECT column1, column2, ... FROM mytable` to read only some of the columns. Since a table can contain millions of rows, you'll often want to read only some of the rows as well. Here's the template:

```sql
SELECT column1, column2, ...
FROM mytable
WHERE condition                 -- filter rows; combine conditions with AND / OR
ORDER BY column_name            -- ascending by default; add DESC for descending
LIMIT n OFFSET m;               -- return n rows, skipping the first m
```

Now let's apply this to the example tables, `students` and `scores`. Try writing each query yourself before you look at the solution.

1. List every student's name:

```sql
SELECT name FROM students;
```

The result:

```text
name
Mary
Bob
Alice
John
Cathy
```

2. List the students in class A:

```sql
SELECT name FROM students WHERE class = 'A';
```

3. List the students' Math scores, highest first:

```sql
SELECT subject, score FROM scores WHERE subject = 'Math' ORDER BY score DESC;
```

The result:

```text
subject	score
Math	91
Math	87
Math	79
```

4. Find the second-highest Math score:

```sql
SELECT subject, score FROM scores WHERE subject = 'Math' ORDER BY score DESC LIMIT 1 OFFSET 1;
```

`SELECT * FROM mytable;` selects every column of every row. It's a quick way to see all the data at once. Try it on both example tables.

The `SELECT` clause can also contain expressions, so you can convert a score out of 100 to a 5-point scale like this:

```sql
SELECT subject, score * 5.0/100 AS score_out_of_5 FROM scores;
```

`AS` names the result (an alias), which makes the output easier to read.

> Note: Keep the `5.0`. `5/100` is integer division in SQLite and evaluates to 0, while `5.0/100` gives 0.05.

In real work you'll often want summary statistics. Aggregate functions like `SUM()`, `AVG()`, and `MIN()` work on a whole column, and `GROUP BY` lets you calculate them for each group.

For example, to see the average score for each subject:

```sql
SELECT subject, AVG(score) AS average_score FROM scores GROUP BY subject;
```

#### Querying two tables

Tables are joined on a matching key column. The template is:

```sql
SELECT column1, column2, ...
FROM mytable1
JOIN mytable2
  ON mytable1.column_id1 = mytable2.column_id2;  -- the two key columns to match on
```

There are four kinds of join: `INNER JOIN` (the default, often written simply as `JOIN`), `LEFT JOIN`, `RIGHT JOIN`, and `FULL JOIN`. The two key columns don't necessarily contain the same values. The diagram below shows this: the small black circles in the orange circle are the values in `column_id1` of `mytable1`, while those in the blue circle are the values in `column_id2` of `mytable2`.

- `INNER JOIN` (`JOIN`): keeps only the keys that appear in both tables—the overlap between the circles.
- `LEFT JOIN`: keeps every key from `mytable1` (the orange circle), filling in `NULL` where `mytable2` has no match.
- `RIGHT JOIN`: keeps every key from `mytable2` (the blue circle).
- `FULL JOIN`: keeps every key from both circles combined.



![image-20261108161402724](/imgs/image-20261108161402724.png)

Suppose we want to see every student's scores in the example database:

```sql
SELECT name, subject, score
FROM students
JOIN scores ON students.id = scores.student_id;
```

Change `JOIN` to one of the other three kinds and see how the result changes. In this example, `students.id` contains every value in `scores.student_id`. In other words, the orange circle contains the blue circle. So you'll find the result of the `RIGHT JOIN` query is the same as that of `JOIN`, and the result of the `FULL JOIN` query is the same as that of `LEFT JOIN`.

The result of the `JOIN` query:

```text
name	subject	score
Mary	English	88
Mary	Math	91
Bob	    Math	79
John	Math	87
```

The result of the `LEFT JOIN` query:

```text
name	subject	score
Mary	English	88
Mary	Math	91
Bob	    Math	79
Alice	NULL	NULL
John	Math	87
Cathy	NULL	NULL
```

Because Alice and Cathy have no scores, `JOIN` returns only four rows. `LEFT JOIN` lists them too, with `NULL` in the subject and score columns.

Once you have the joined table, you can treat it as a single table and apply the filtering, ordering, and column selection from earlier.

### Write operations: create, update, delete

#### Working with rows

A row is one piece of data, such as a transaction, an online order, or an employee record, so row-level operations are common and run in real time in applications.

**1. Create new rows: `INSERT`**

The template:

```sql
INSERT INTO mytable
    (column_name, another_column_name, ...)
VALUES
    (value1, another_value1, ...),
    (value2, another_value2, ...);
```

If you provide a value for every column, **in table order**, the column list `(column_name, another_column_name, ...)` can be omitted. See the `INSERT` statements at the top for examples.

**2. Update row values: `UPDATE`**

```sql
UPDATE mytable
SET column_name = value,
    another_column_name = another_value
WHERE condition;
```

For example, if Mary changes class from 'A' to 'B':

```sql
UPDATE students
SET class = 'B'
WHERE id = 1;
```

**3. Delete rows: `DELETE`**

```sql
DELETE FROM mytable
WHERE condition;
```

For example, if Alice moves to another school:

```sql
DELETE FROM students
WHERE id = 3;
```

> A word of warning: an `UPDATE` or `DELETE` without a `WHERE` clause affects **every row** in the table. Run a `SELECT` with the same condition first to check what you're about to change.

#### Working with table structure

**1. Create a new table: `CREATE`**

The template:

```sql
CREATE TABLE IF NOT EXISTS mytable(
    column_name         DataType TableConstraint DEFAULT default_value,
    another_column_name DataType TableConstraint DEFAULT default_value
);
```

See the `CREATE TABLE` statements at the top for examples.

**2. Change a table's structure: `ALTER`**

`ALTER` changes the table's structure—its columns—not the data inside it. (To change data, use `UPDATE`.)

(1) To add a column:

```sql
ALTER TABLE mytable
ADD COLUMN column_name DataType DEFAULT default_value;
```

For example, to add an `age` column to the `students` table:

```sql
ALTER TABLE students
ADD COLUMN age INTEGER;
```

(2) To delete a column:

```sql
ALTER TABLE mytable
DROP COLUMN column_name;
```

(3) To rename a column:

```sql
ALTER TABLE mytable
RENAME COLUMN column_name TO new_column_name;
```

(4) To rename a table:

```sql
ALTER TABLE mytable
RENAME TO new_table_name;
```

> Note: SQLite's `ALTER TABLE` can add, drop, and rename columns, but it can't change a column's type or constraints. For that, you have to rebuild the table.
>
> Other databases, such as MySQL and PostgreSQL, support more `ALTER` operations.

**3. Delete a table: `DROP`**

```sql
DROP TABLE IF EXISTS mytable;
```

`DROP` is permanent—there's no undo.

## Wrapping up

That's the whole map: **C**reate, **R**ead, **U**pdate, **D**elete. Four verbs cover most of what you'll do with a database day to day.

The fastest way to make it stick is to run each query yourself. Start with the examples in this post, then move to [SQLBolt](https://sqlbolt.com/). When you're comfortable, import a CSV you actually care about and try the same statements on it. Once you've practiced joins, `GROUP BY` and aggregate functions on real data, you'll see why people call SQL magic. 