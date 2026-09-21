---
title: "Now that AI writes code, what should we actually learn?"
description: "If AI writes most of the code, what should we actually learn — and how?"
date: "2026-09-12T08:16:46+08:00"
tags:
  - AI
  - programming
---



**With AI coding, I can build things faster than ever. Yet I've never felt less in control.**

Last November, with the launch of GPT 5.1 and Claude Opus 4.5, something changed: AI started producing production-ready code in minutes. 

Since then, I've found myself thinking about building more things. In the past, a lot held me back: where should I start? Should I learn more frontend and backend before diving in? Now AI can put together a project in minutes, and I can study the code afterwards. 

But at the same time, I feel like I'm losing control over the projects. I'm not writing the code myself,  and I have no idea what exactly each line of code does. 

If AI writes most of the code, what should we actually learn — and how?



### What to Learn

#### Regaining Control

I used to think I could only truly understand a project if I understood, or even wrote every line of code myself. 

**Now that AI writes most of the code, we need to change our perspective and see AI coding as a higher level of abstraction.** It produces modules and functions. As long as these parts pass tests and behave as expected, we can use them without knowing every implementation detail.

When scripting languages such as JavaScript and Python came out, some programmers argued that these were not "real" programming languages like C or assembly, because they used a higher level of abstraction and did not compile directly to native machine code in the same way. Today, these scripting languages are widely used. We may see AI coding as an even higher level of abstraction. 

But abstraction does not mean blind trust. We regain control by managing module boundaries and risks: what each module is responsible for, what goes in and out, how it fails, and what breaks if we change it. Tests and clear interfaces make this practical. We do not need every detail; we need to know where the risks are and how to check them.

This is control at a higher level. The skills behind it are what we turn to next.

#### The Core of Coding Skills

I used to think that if AI did the coding, my coding skills would be hard to improve without deliberate practice. However, as [Pascal CESCATO](https://dev.to/pascal_cescato_692b7a8a20) pointed out in [our conversations about AI coding](https://dev.to/pascal_cescato_692b7a8a20/comment/3e7ha), "(With AI coding,) I feel that I can spend more time thinking about the system instead of spending hours translating my thoughts into syntax." 

This leads me to ask what really matters—the core of coding skills. Syntax still matters, but translating ideas into code is no longer the bottleneck. **What matters more is the ability to decompose a problem, choose the right abstractions, design clear interfaces, model data, trace control flow, evaluate trade-offs, and verify behavior.** These are the skills that let you supervise AI output rather than merely accept it.

When we read AI-generated code, we should treat it as a design to be examined, not just a result to be accepted. Identify the key decisions: where the module boundaries are, why the interfaces look the way they do, how data is modeled, and which dependencies point in which direction. Then ask whether we would have made the same choices—and what trade-offs those choices imply.

We do not need to study every line, but need to understand the structure well enough to test it and improve it.  That kind of understanding is best built in real projects.



### How to Practice: Through Projects

Some might argue that basics like syntax are the foundation of coding. If you don't even practice and master them until they become muscle memory, how can you master higher-level skills like architecture? 

Don't get me wrong—syntax and other basics are very important; we need to master them. But instead of typing the same lines of code over and over to memorize them, we can now learn them by using them in a project. This approach is more effective.

Start with a project you are interested in. Let AI build the first version. 

Then read it as a design: map the modules, trace the data, check the interfaces, and ask what trade-offs it makes. 

Finally, rewrite the core part yourself—the part where the real design decisions live—so you use the fundamentals without writing boilerplate again and again.

I had a similar experience before the AI era. When I was learning list comprehensions in Python, I typed out the examples, but I didn't use them in my own code. Some time later, I forgot how to use them. 

Then, in a Kaggle competition, the dataset had a huge number of columns. How should I select a few to analyze? In a highly upvoted notebook, the author used list comprehensions to select columns and extract the data. Its elegance impressed me. I had learned the syntax, but I did not know I could apply it to the dataset. Following the notebook's example, I tried selecting different columns as I wanted. After that, I finally knew how to use list comprehensions. Learning them in context was far more effective than studying examples.



### Final Thoughts

So what should we learn in the age of AI? The same things that have always mattered—just in a different way. 

We still need to learn the fundamentals, but we learn them best by using them in real projects. 

We still need to understand code, but not every line. 

We regain control not by writing every line of code ourselves, but by understanding how the system fits together and why some parts matter more than others.



> Special thanks to [Pascal CESCATO](https://dev.to/pascal_cescato_692b7a8a20) . Our conversations inspired this post.





