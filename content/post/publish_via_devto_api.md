---
title: "How to publish posts via the dev.to API"
date: "2026-10-21T12:00:00+08:00"
tags:
  - API
  - Python
  - HTTP
---

Every time I copied a post into the dev.to editor, added tags and cleaned up the formatting, I'd wonder whether there was a way to automate it. If you have the same question, this article is for you.

The answer: the dev.to API.

In this post I'll show you two ways to use it. First a `curl` command, so you'll see the exact request the API expects. Then a Python script that automates it. I'll also cover the one thing that trips people up: images.

## Get your dev.to API key

First you'll need an API key.

In your dev.to account, go to **Settings → Extensions → DEV Community API Keys**. Give your key a name and click **Generate API Key**. 

Then expand the **Active API Keys** list below the button and click the arrow next to your key to reveal it. 

Don't paste the key into your source code. We'll load it from an environment variable in the Python version.

## Approach 1 (starter example): curl from the command line

Let's start with a simple example, so you can see the HTTP request behind the whole thing.

Open a terminal (on Windows, you may use `Git Bash`), and run the command below, replacing `YOUR_KEY` with your own API key.

```bash
curl -X POST https://dev.to/api/articles \
  -H "api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "article": {
      "title": "My First Post",
      "body_markdown": "# Hello\n\nThis is my post.",
      "tags": ["python", "api"],
      "published": false      
    }
  }'
```

Here is what each part does:

- `curl -X POST` tells the API to create a new article. 
- `-H` adds a header. One header carries your `api-key`; the other says the request body is JSON.
- `-d` is the body, in JSON format.

> Note: `published` is `false` (the default), so the post is created as a draft, which you can see in your **Dashboard**. You can open it, check the formatting, edit it, and publish when you're ready. Set it to `true` and the post goes live immediately.

The downside: you have to type or paste the API key, title, tags, and body into the terminal every time. That's exactly the busywork we were trying to avoid, so let's use a script to do it. Python is a good choice.

## Approach 2 (recommended): a Python script

If you write your posts in Markdown, you probably already have front matter at the top of each file, and you can reuse it.

If you haven't used front matter before, it's simple. It looks like this:

```markdown
---
title: My First Post
tags: [python, api]
---
```

Just add these few lines to the top of your Markdown file. Make sure there is a space after each colon, as YAML won't parse `title:My First Post`. Also note that dev.to accepts **at most four tags** per post.

First, install two packages: `requests` to talk to the API, and `python-frontmatter` to read the front matter out of your post. Run this in your terminal:

```bash
pip install requests python-frontmatter
```

Then save the code below as a Python file. Point `frontmatter.load()` at your post, and set your key as an environment variable (`export DEVTO_API_KEY="your_key"` in Git Bash, or `$env:DEVTO_API_KEY="your_key"` in PowerShell).

```python
import os

import frontmatter
import requests

URL = "https://dev.to/api/articles"
API_KEY = os.environ["DEVTO_API_KEY"]

post = frontmatter.load("posts/my-post.md")

article = {
    "article": {
        "title": post["title"],
        "body_markdown": post.content,
        "tags": post.get("tags", []),
        # Optional: if the same post also lives on your own blog
        # "canonical_url": "https://your-blog.example.com/my-post",
        "published": False
    }
}

response = requests.post(
    URL,
    json=article,
    headers={"api-key": API_KEY, "Content-Type": "application/json"}
)

if response.status_code == 201:
    print("Published:", response.json()["url"])
else:
    print("Failed:", response.status_code, response.text)
```

Comparing `requests.post()` with the curl command, you'll find that they send the same three things: **a URL, headers, and a JSON body**. Both are plain HTTP requests. The script just saves you from typing one out every time.



## About images

If your Markdown points at local images like `./imgs/screenshot.png`, those links break on dev.to. The post has no access to your disk, so you'd have to upload each image by hand.

The fix is to use image URLs that are publicly accessible — from your own blog, GitHub, or another image host. When you publish through the API, dev.to fetches each image and stores its own copy, so the post looks the same there as it does at home.

> Note: The URL has to be public. Images behind a login or on a private network won't load.



## Wrapping up

Publishing through the API turns a five-minute copy-paste into one command. A few tips:

- If you also publish the posts to your blog, set `canonical_url` so search engines know where it was first published.
- For all the parameters of the API, you may refer to [the API documentation](https://developers.forem.com/api/v1#tag/articles/operation/createArticle).
- Keep your API key in an environment variable, and never commit it to a public repo.

How do you publish to dev.to — via the API, the editor, or something else? I'd like to hear what's worked for you.

> Special thanks to [Pascal CESCATO](https://dev.to/pascal_cescato_692b7a8a20), whose [great post](https://dev.to/pascal_cescato_692b7a8a20/actually-static-when-wordpress-stops-being-the-enemy-37h5) and the detailed explanation in its comments gave me the push to try the dev.to API. 



