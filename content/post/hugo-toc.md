---
title: "Hugo: How to add a table of contents (TOC) to your post?"
date: 2023-04-21T18:23:29+08:00
draft: false
tags:
- Hugo 
- Blog
 
categories:
- Tools

---



Maybe you want to add a Table of Contents ( TOC ) to the articles on your Hugo site but don’t know how to do it, or maybe you want to insert a TOC somewhere in the middle of your post. This is the tutorial for you.

<!--more-->

### 1. The TOC configuration

First you need to see if your Hugo theme contains Table of Contents ( TOC ) settings.  Open the `config.toml` file in your Hugo site folder ( Later we’ll call it `YourSite` in this article ), find the parameter `tableOfContents` ( or `toc` ), set it to be `true` like this:

```toml
tableOfContents = true
```

Then, if your Hugo theme has a TOC configuration, a TOC will be added at the beginning of every post.

Q: What if I don’t want to show the TOC of one article?

A: Go to the front matter of that article, and set:

```md
toc: false
```

Then only the TOC of that article won’t be shown. 

### 2. How to insert a TOC in the middle of your post?

However, some Hugo themes don’t have Table of Contents ( TOC )  settings, or you may want to insert a TOC somewhere in the middle of the post. In that case, you can use Hugo shortcodes.

 [Hugo Shortcodes Page](https://gohugo.io/content-management/shortcodes/)  introduces shortcodes as this:

> A shortcode is a simple snippet inside a content file that Hugo will render using a predefined template. 

We can think of a shortcode as a function. When we call it,  Hugo will render in the way the shortcode defined.

**How to use shortcodes?**

Add the following line to anywhere you you want to use the shortcode in the markdown article:



![image-20230421173703982](/imgs/image-20230421173703982.png)



Actually, if you’ve read [my first tutorial](https://juliecodestack.github.io/2023/04/13/build_hugo_site/) , you may have already used shortcodes. In it the shortcode `figure` is used to display an image and its title. 



![image-20230416211605682](/imgs/image-20230416211605682.png)



`figure` is a built-in shortcode. There is no built-in shortcode for Table of Contents ( TOC ) , so we need to define it, which is a bit hard for beginners. Thankfully the author of Hugo theme [hugo-octopress](https://github.com/parsiya/Hugo-Octopress) has done it for us. You just need to download [this repository on GitHub](https://github.com/parsiya/Hugo-Shortcodes) . Go to `YourSite > layouts` folder, create a `shortcodes` folder in it if it doesn’t exist. Then copy the `toc.html` from the downloaded `Hugo-Shortcodes > shortcodes` folder to `YourSite > layouts > shortcodes`  folder. 

To insert TOC somewhere in your article, just write a line:



![image-20230421181940766](/imgs/image-20230421181940766.png)



For example, I add a TOC here:

{{% toc %}}

### 3. Set the range of headings to be displayed

Sometimes you may find the page doesn’t show all the headings, and you can fix it by setting in `YourSite > config.toml`:

```toml
[markup]
  [markup.tableOfContents]
    startLevel = 3
    endLevel = 5
```

The `startLevel` and `endLevel` refer to the highest and lowest levels of the headings to be shown. For example, the above setting means that the TOC only shows headings between level 3 and level 5. 

### References 

1. [Hugo Shortcodes Page](https://gohugo.io/content-management/shortcodes/) 

2. The author of the [hugo-octopress theme](https://github.com/parsiya/Hugo-Octopress) introduced the use of shortcodes in detail and I find it helpful : https://github.com/parsiya/Hugo-Octopress/blob/master/README.md#shortcodes





