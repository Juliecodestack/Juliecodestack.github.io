---
title: "How to schedule future-dated posts with Github Actions"
date: "2026-10-04T18:30:00+08:00"
tags:
  - GitHub
  - Hugo
---

Sometimes you may write several posts in one sitting when you have ideas, but you may not want to publish them all at once. Instead, you'd like to publish them one at a time on future dates. 

You can automate this with GitHub Actions. Here's how.



## Step 1: Add a scheduled trigger to the GitHub Actions workflow

### First, set the schedule in `hugo.yml`.

Open your Hugo workflow file, usually at `.github/workflows/hugo.yml` or `.github/workflows/hugo.yaml`. In the `on:` section, add a `schedule` trigger as follows:

```yml
on:
   push:
    branches:
      - main
   
   #add the following two lines
   schedule:
      - cron: '0 1 * * *'
```

**What do the cron fields mean?**

The first two fields specify the minute (0-59) and the hour (0-23) of the scheduled time (**in UTC**), respectively. In the example above, `0 1` specifies 01:00 UTC.

The last three fields specify the day of the month (1-31), the month (1-12), and the day of the week (0-6, where Sunday is 0). An asterisk (`*`) matches all values in that field. So when the last three fields are `* * *` , there is no restriction on the day, month, or day of the week, and the workflow runs daily. Together with `0 1`, `0 1 * * *` means the workflow runs daily at 01:00 UTC.

### Then, push the workflow file to GitHub.

```
git add .github/workflows/hugo.yml
git commit -m"add daily schedule build for future posts"
git push
```

> Note: Scheduled workflows run from the default branch, and **GitHub may delay scheduled runs during periods of high load**.



## Step 2: Set a future date in the post front matter

In the front matter of a new post, set the `date` field to the time when you want it to be published. 

Set the time in the `date` field slightly earlier than the schedule build time. For example, if the workflow runs at 01:00 UTC, use 00:00 UTC or earlier. This ensures that the post is no longer in the future when Hugo builds the site.



## Previewing future posts locally

You can run `hugo server` to preview your site locally, but future-dated posts will not appear. To include them, run `hugo server --buildFuture` or `hugo server -F`.

> Note: Do not add `--buildFuture` to the GitHub Actions build command (`hugo`); otherwise, future-dated posts will be published immediately.

## Can I use the classic deployment approach?

The key to scheduling future posts is that the build must happen after the post's scheduled publication time. With GitHub Actions, the build runs on GitHub's servers, so it can be scheduled. In the classic approach, you build the site locally and then push the `public/` folder to GitHub. The build is performed manually.

Therefore, the classic approach cannot schedule builds by itself. You would need to set up a scheduled task on your own machine or another server to run `hugo` and push the generated files.

