---
title: "Switching from Hexo to Hugo"
date: 2023-04-25T18:39:37+08:00
draft: false
tags:
- Hugo 
- Blog
- GitHub
- Git   
categories:
- Tools

---

Several months ago I switched this site from Hexo-building to Hugo-building. Some readers asked me why the move and how to do it, so here I’d like to share my experience with you.

<!--more-->

### 1. Hugo v.s. Hexo

Both Hexo and Hugo are static site generators, so why did I choose Hugo?

**Hugo is super fast**. At first I thought it means the page load time is short, so my readers could view the pages of my site instantly, and that’s the reason I decided to switch to Hugo. Later I realized it refers to the site building speed ( < 1ms per page according to [Hugo site](https://gohugo.io/) ), which means I can build the site fast and preview the changes in real time. It’s really a benefit, especially when you have written hundreds of articles, for you can still build your site in seconds (or even in a second) .

Besides, Hexo depends on Node.js. Sometimes when you install a wrong version of Node.js, it leads to problems. You don’t need to worry about that in Hugo because you don’t need to install external dependencies for it.

What about Hugo’s drawbacks?

From my experience, compared with Hexo, the site configuration of Hugo is a bit difficult for beginners. Hexo provides a default theme for you to begin with. While in Hugo, at first you have to pick a theme and install it. Besides, Hexo has a site configuration as well as a theme configuration. The site configuration fits all themes and saves your time when you change the theme. While Hugo has only one configuration file, and different themes have different settings, which makes beginners a little confused. 

### 2. How I switched from Hexo to Hugo?

Since I have written some posts on the Hexo site, **the main question is how to switch to Hugo without changing the links of the posts**. I find [this article](https://jdhao.github.io/2018/10/10/hexo_to_hugo/) helpful, so I followed the instructions in it to make the change.

#### 2.1. Generate the pages by Hugo locally

First I followed the step0 and step1 in [my first tutorial](https://juliecodestack.github.io/2023/04/13/build_hugo_site/) to build a Hugo site. Then:

(1) **Copy** the posts from `MyHexoSite > source > _posts` to `MyHugoSite > content > post` folder. 

> Please use `copy` , not `move` , so that if something went wrong, you can go to `MyHexoSite` folder and try it again. And I also advice you to make a backup of  `MyHexoSite` folder.

(2) Change the front matter of the posts. 

In Hexo the the published date is formatted as `date:yyyy-mm-dd HH:MM:SS` , while in Hugo a time zone needs to be added. For example, in my articles the format is `date:yyyy-mm-ddTHH:MM:SS+08:00` .

(3) Change the image links ( You may read [Step1.5 in my first tutorial](https://juliecodestack.github.io/2023/04/13/build_hugo_site/#15-how-to-display-images) first)

**For local images:**

Copy all images from `MyHexoSite > source > _posts > imgs` folder to `MyHugoSite > static > imgs` folder, then change the links in the markdown files. 

If in Hexo the link is like:

```markdown
![image1_title](imgs/image1.jpg)
```

In Hugo it’s changed to:

```markdown
![image1_title](/imgs/image1.jpg)
```

If in Hexo the link is like:

```md
<img src="imgs/image1.jpg" alt="image1_title" align=center />
```

> Here `align=center` is optional. It’s set to display the image in the center of the line.

In Hugo it’s changed to:



![image-20230424212753828](/imgs/image-20230424212753828.png)



**For web images:**

If in Hexo the link is like:

```text
![image2_title](image2_weblink)
```

You can keep the links as the same.

If in Hexo the link is like:

```text
<img src="image2_weblink" alt="image2_title" align=center />
```

You need to remove the double quotes around `image2_weblink` and `image2_title`.

(4) permanent link

To be consistent with the URL of my Hexo site, I set the permanent links in the `config.toml` of the Hugo site as:

```toml
[permalinks]
  post = "/:year/:month/:day/:filename/"
```

> I used the Next theme of Hexo. You may need to refer to the links of your own Hexo site before setting the `permalinks`.

#### 2.2. Push to GitHub for the first time

(1) Save the links of several articles of your Hexo site. Later you can use them to check the links of your Hugo site.

(2)  Follow the step2 in [my first tutorial](https://juliecodestack.github.io/2023/04/13/build_hugo_site/), except one thing. Because I have pushed Hexo-generated pages to GitHub before, the GitHub repository was not empty, the first time I added `-f` after `git push` as follows:

```bash
git add .
git commit -m "YourCommitMessage"
git push -f upstream master
```

From the next time I use `git push upstream master` .

(3) Clicking the links saved in step(1) and check whether the links point to the same articles as before.

### References

1. Comparison of Hexo and Hugo: https://www.stackshare.io/stackups/hexo-vs-hugo
2. Switch from Hexo to Hugo: https://jdhao.github.io/2018/10/10/hexo_to_hugo/





