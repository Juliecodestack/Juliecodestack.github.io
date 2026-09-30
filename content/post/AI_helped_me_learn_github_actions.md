---
title: "I tried to learn GitHub Actions twice: I failed the first time, but AI helped me succeed the second time"
date: "2026-09-30T08:16:31+08:00"
tags:
  - AI
  - GitHub
  - Hugo
---

The first time I tried to deploy a static site using GitHub Actions, I gave up halfway through the tutorials. The second time, with the help of an AI agent, I had the site deployed in several hours — and I finally understood how it all worked.

## The first time, I gave up

I first encountered GitHub Actions while reading Hugo static site deployment tutorials. Most showed the classic approach: run `hugo` locally, push the `public` folder to GitHub, done. A few mentioned GitHub Actions. This approach uses a workflow and saves time. The automatic workflow sounded efficient and I wanted to give it a try.

But the tutorials were too brief; they only included a few commands and the workflow file (`hugo.yml`). It was hard to follow because some settings were not written clearly enough. I didn't even know where to put these files. Perhaps the authors assumed that readers were already familiar with GitHub Actions and were simply applying it to static site generation. In fact, I had never used GitHub Actions explicitly before. I spent some time trying to figure out what GitHub Actions actually was. This opened up a much broader topic: there are many different kinds of Actions on GitHub. Eventually, I gave up.

I went back to the classic way. It was simpler — build locally, push `public` , and deploy. It worked, but every time I published a post I had to build and then push the whole `public` folder. I told myself I would learn GitHub Actions "someday". 

## The second time, I succeeded

That "someday" came three years later. This time, when I updated my website, I thought, "Why not let an AI agent help me do this and try GitHub Actions again?" 

I opened an AI agent. First, I chatted with it to get a general idea of the differences between the two deployment approaches. It explained that the classic approach builds locally (on your machine) and pushes the output, while GitHub Actions builds on GitHub's servers, so you only need to push your new posts. That was enough context to start.

Then I asked it to set everything up for me. Here is the prompt I used:

> In this folder, Mysite is the original folder used to generate the static website using Hugo, and then it was connected to GitHub to deploy GitHub Pages. I used `hugo` to generate the files and push the public folder to GitHub. 
>
> Now I want to: 1. Switch the theme. The new theme has been configured in the Mysite_paper folder, so please use this folder. 2. Switch from pushing the public folder to using GitHub Actions.
>
> Don't do it now. First tell me your plan.

The AI came back with two decisions I needed to make:

- Where should the Hugo source code live? In the same repository on new branch, or in a separate repository?

- How should the theme be tracked in Git? As a submodule or vendored?

Instead of just picking whatever it recommended, I asked it to explain the trade-offs first. Then I chose the "same repository and new branch" option, so that I wouldn't have to switch between repositories later. I chose to track the theme as a Git submodule. With a submodule, the theme is referenced from its own repository, so you can update it easily later. The vendored approach removes the theme's `.git` directory and commits the files directly. It looks simpler, but you have to update manually.

Then the AI added the Git submodule, a `.gitignore` file, and the workflow file to my local project. After that, it tried to push to GitHub but failed with the error:  `GitHub is unreachable from the current network` .  

So I asked the AI to list what I needed to do manually. Four clear steps. I followed them.

Two things went wrong, and both turned out to be instructive.

First, Git Credential Manager kept asking for authentication. I checked my SSH connection — it was fine. I asked the AI why it thought the connection failed. It realized it had tried HTTPS, whereas I usually used SSH. It then gave me the correct SSH-based command, and the push worked.

Second, the first deployment failed with:

```bash
building succeeded, deploying failed. Branch 'main' is not allowed to deploy to github-pages due to environment protection rules.
```

I pasted the error message to the AI. It explained that GitHub Pages was still configured to deploy from `master` branch, while my repository now uses the `main` branch. I followed its instructions to change the branch settings, and the next build succeeded.

## What made the difference?

So what changed between the first attempt and the second one? It wasn't that GitHub Actions got easier. It was that AI removed the barriers holding me back.

**First, the AI handled the setup work.** It wrote the workflow file (`hugo.yml`), configured the Git submodule, generated the `.gitignore` file. These are the small, tedious tasks that make a beginner feel lost. With them handled, I could focus on understanding what GitHub Actions actually does instead of fighting with config files.

**Second, it lowered the mental barrier.** In the past, I thought "this is too complex, I need to learn all of this first." With AI by my side, I knew I could start and ask when I got stuck. Although I still didn't know enough, I had the confidence to work on it and get it done.

**This flipped my learning order.** I used to think that the right sequence was: learn the theory thoroughly, then practice. Now I think it is: **do first, learn along the way**. 

AI can be a great one-on-one tutor, explaining things to you and guiding you through the process. This time, I didn't look for any tutorials to read. Instead, I asked the AI to tell me what to do at each step. When I didn't understand why to do it, I would pause and asked the AI to explain it. In the end, I got GitHub Actions configured and I learned more through practice than by just reading tutorials.

## Do I understand it now?

To be honest, I can't write a workflow file from scratch yet. But I understand the big picture: GitHub builds the site on its own servers, so I only push my Markdown posts. I know where the workflow file lives, what each major step does, and where to look when something breaks. That's more than I knew a week ago, and it's enough to maintain this setup and debug simple issues.

The key shift is this: I didn't wait until I "fully understood" to start. I started with a working scaffold or starter template, and I understood it piece by piece as I built on it. 

## Final thoughts: start first, learn along the way

This experience changed how I think about learning. For practical skills such as deploying a site, configuring a tool, or building an app, the hardest part isn't understanding. It's starting. Every small roadblock (a confusing config line, an authentication error, a branch setting) is a reason to quit. As a beginner, you don't know where to find the solution. AI can now act as a one-on-one tutor, helping you fix these problems and remove the roadblocks.

If there's a tool or skill you've been putting off because "it's too complex to learn," try this: instead of turning to tutorials, open an AI agent, describe what you want to build or learn. Let the AI give you a general idea first, and then help you get a working version. Ask it to explain what you don't understand as you go. In my experience, once you start working on it, you will run into problems, fix them, and learn a lot along the way.

At least, that was my experience with GitHub Actions. I had put it off for three years. This time, I started with a working setup, asked the AI when I got stuck, and filled in the gaps as I went.

You'll learn more in an afternoon of doing than in a week of reading. And you may find that the thing you've been putting off isn't as hard as you expected.