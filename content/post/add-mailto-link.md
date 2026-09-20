---
title: "How to add a Mailto link on each page in Hugo?"
description: ""
date: "2023-12-05T20:06:52+08:00"
thumbnail: ""
categories:
  - "Tools"
tags:
  - "Hugo"
---

On this website, I put my email link at the end of each post in place of the comment system. This was inspired by [Eli Bendersky's website](https://eli.thegreenplace.net/2018/turning-off-blog-comments/).  How to make it?

<!--more-->

The following are the steps:

Go to `YourSite > layouts > _default > single.html`. You’re going to add the mailto link after the `<main>...</main>` part (corresponding to the main body of the post). Let’s start with a simple link:

```html
<a href="mailto:your_email@example.com"> EmailLink </a>
```

Open Git Bash Command on `YourSite` folder, and enter `hugo server`  to see the pages locally. You’ll see that after each post, there is an `EmailLink`. When you click the link, the mail app will be opened and the address(your_email@example.com) is already in the receiver field. 

If you’d like to add the subject and body to the mailto link, you may use the following script:

```html
<a href="mailto:your_email@example.com"?subject=subject&body=text> EmailLink</a>
```

Or you can go to the site [Mailto link generator](https://mailtolinkgenerator.com/) , enter the content and generate it.

I want to put a sentence at the end of each post: “Thank you for reading! For comments or discussions, please send me an email.” In HTML, `<a></a>` contains links. `<p></p>` contains paragraphs(pure text) . So here’s what I finally wrote in `single.html`:

```html
<p>Thank you for reading! For comments or discussions, please send me an <a href="mailto:my_email"><u>email✉️</u></a>.</p>
```

Here the `<u></u>` underscores the mailto link for I found the link was not highlighted on the page. As for the sign of envelope✉️, I copied the Emoji from the Internet.

References:

[Mailto Link – How to Make an HTML Email Link](https://www.freecodecamp.org/news/mailto-link-how-to-make-an-html-email-link-example-code/)

[Mailto link generator](https://mailtolinkgenerator.com/)

