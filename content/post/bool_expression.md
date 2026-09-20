---
title: "What’s the return value of a bool expression in Python?"
date: 2023-01-07T20:54:13+08:00
draft: false
tags:
- Python
categories:
- Programming
---

We know that the boolean value of 0 is False, and the boolean value of 1 is True. What about the boolean value of a negative number, for example, -2 ? What’s the result of the expression `True and 3` in Python? Is it True or False, or other value? Let’s find it out. 

<!--more-->

### 1. Boolean Value

Here is a question I came across while I was doing [a lab of Berkeley CS61A Course](https://inst.eecs.berkeley.edu/~cs61a/fa20/lab/lab01/) . What would Python print? 

```bash
>>> positive = 28 

>>> while positive: 

...     print("positive?") 

...     positive -= 3
```

I thought that after printing “positive?” 10 times , the variable “positive” would become negative, so the program would stop. But my answer didn’t pass the test, so I ran it locally to see what happened. To my surprise, the program didn’t stop! It’s an infinite loop. Why? 

Because the boolean value of a negative number is True. **Only the boolean value of 0 is False, while the boolean value of a positive or negative number is True**, so `bool(-2)=True` .

> In Python, the boolean value of False (or 0, or ‘’, or None) is False. The boolean value of others is True.



Then how to evaluate the bool expression?

### 2. Bool Expression

A bool expression usually contains logic operators such as `and`, `or`, `not`.  

#### (1)  `<exp1> and <exp2>` 

The result of `False and True` is False, so for the expression `<exp1> and <exp2>` , only when the value of the first element `<exp1>` is True do we need to check the second element `<exp2>` . For example, the value of `True and 0` is 0. 

That is, **`and` stops evaluating at the first false value.** For example:

```bash
>>> 0 and 2
0
>>> False and -2
False
```

If all values evaluate to be True, the last value is returned. So the value of expression `True and 3` is 3, while the expression `3 and True` returns True. The following is another example of `and` between two numbers:

```bash
>>> 2 and -3
-3
>>> -3 and 2
2
```

From the results above, you’ll see that **the return value of  a bool expression like `<exp1> and <exp2>` is not always True or False**. Take `True and 3` as an example, it evaluates the boolean value of `<exp1>` /`<exp2>` ( `bool(3)=True` ), but returns the actual value ( 3 ), so it’s a number. 



#### (2)  `<exp1> or <exp2>`

`or` expression uses an evaluating order like `and` expression. The result of `True or False` is True, so for the expression `<exp1> or <exp2>` , only when the value of the first element `<exp1>` is False do we need to check the second element `<exp2>` . 

That is, **`or` stops evaluating at the first true value.** For example:

```bash
>>> 0 or -1
-1
>>> 2 or -1
2
>>>True or 2
True
>>>0 or False or -3 or 1 / 0
-3
```

Here the last element `1/0 ` in the last expression won’t be evaluated, otherwise it’ll produce an error. 

If all values evaluate to be False, the last value is returned. For example:

```bash
>>> False or 0
0
>>> 0 or False
False
```



#### (3)  `not <exp>` 

Unlike `and` and `or` expression, `not` expression returns the opposite boolean value of  `<exp>`, so the result is either True or False. For example:

```bash
>>> not 10
False
```



**Reference**:

[Lab 1: Variables & Functions, Control | CS 61A Fall 2020](https://inst.eecs.berkeley.edu/~cs61a/fa20/lab/lab01/)

[disc01| CS 61A Fall 2020](https://inst.eecs.berkeley.edu/~cs61a/fa20/disc/disc01.pdf)





