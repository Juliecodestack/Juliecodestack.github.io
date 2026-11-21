---
title: "I built a dev.to comment reviser so I'd stop re-pasting the same AI prompt"
date: "2026-11-21T08:34:31+08:00"
tags:
  - AI
  - Python
  - FastAPI
---

Before posting a comment on dev.to, I used to paste my draft into an AI chat window, paste the same long prompt, copy the revision back, and paste it into dev.to. Every. Single. Time.

I'm a non-native English speaker. dev.to is where I learn to write in public. I don't want spelling or grammar mistakes to distract readers from what I'm trying to say, so I use AI to catch them before I post. But re-pasting the same prompt every time was tedious. So I built a small local web app: paste a comment, get a revision and an explanation, without re-pasting the prompt.

## What it does

The UI has two columns. Paste a comment in the left panel, click **Revise**, and you get:

- **Revised text**: ready to copy and post
- **Paragraph explanations**: what changed and why
- **History**: your last 10 submissions
- **Markdown syntax preserved**: inline code and code blocks stay intact

![Screenshot of the tool revising a comment](/imgs/screenshot_real_example.png)

The explanation is the part I find most useful. It turns a correction into something I can learn from:

> **Original:** "I have learned the principles behind the main stream AI agent like OpenClaw, Claude Code."
>
> **Revised:** "I have learned the principles behind mainstream AI agents like OpenClaw and Claude Code."
>
> **Explanations:**
>
> - Changed "main stream" to "mainstream" to use the standard spelling.
> - Changed "AI agent like OpenClaw, Claude Code" to "AI agents like OpenClaw and Claude Code" to fix the plural agreement and the list punctuation.

That is the difference between a spell-checker and a writing coach. A spell-checker only tells you *what* changed; this tool also tells you *why*.

## How it works

```text
Browser (HTML + JavaScript)
        │  POST /feedback  { "text": "..." }
        ▼
FastAPI ── validate the input ──► llm.py ──► DeepSeek API
   │                                 │
   │◄── revised + explanations ──────┘
   ▼
SQLite (history.db)
```

The browser sends the comment to `POST /feedback`. FastAPI validates the request first: an empty or whitespace-only comment is rejected before any AI call.

`llm.py` sends two messages to DeepSeek: a fixed system prompt and the user's comment. The system prompt asks for two sections with exact headings, `## Revised Text` and `## Paragraph Explanations`. The code then splits the reply at those headings, so a single AI reply becomes two fields.

Finally, the submission is saved to SQLite and returned as JSON. `GET /history` returns the latest ten submissions by default; it is served by FastAPI, which reads from SQLite.

Three decisions shaped the code:

- **The prompt is a file** (`prompts.py`), not something the user types every time.
- **The output format is a contract.** The prompt demands two headings; the code depends on them.
- **History uses plain SQL** with Python's built-in `sqlite3`, because this project doubles as a SQL learning exercise.

## How I built it

I built the app with GLM-5.3-Flash. The app itself calls DeepSeek's API; its model is set in `.env` (`.env.example` uses `deepseek-flash`).

### Starting with a CLI MVP

I started with the smallest version that could prove the idea. The first version read text from the terminal, sent it with a fixed system prompt, and printed the result. No UI, no database. Its only job was to answer one question: is the AI revision actually useful? It was.

Most of the work went into the prompt. The prompt went through several rounds of revision: first the style for technical writing and comments, then rules about keeping the writer's tone and preserving code blocks and technical terms, and finally the exact output headings the parser needs.

### Adding the UI and SQLite

Next, I extended it into a FastAPI app with one HTML page and a SQLite-backed history. I didn't know FastAPI or databases, so I had the AI write the first version.

### Learning FastAPI and SQL by comparing docs with code

Once the app worked, I tried to understand it and learn FastAPI and SQL. The advice I got from my AI assistant was simple: **read the official docs or tutorials, then find the same pattern in the project and compare the two**. The examples in the docs are easy to follow, while the project code is a real application. Comparing them confirmed what I had learned and showed me what I had missed.

For example, the SQL lessons showed me plain statements:

```sql
INSERT INTO submissions (original, revised, explanation, model, created_at)
VALUES ('...', '...', '...', '...', '...');
```

But the code in the project looked like this:

```python
cur = c.execute(
    """
    INSERT INTO submissions (original, revised, explanation, model, created_at)
    VALUES (?, ?, ?, ?, ?)
    """,
    (original, revised, explanation, model, created_at),
)
```

The values are passed separately as parameters. This is called a parameterized query. This is how real apps insert data at runtime.

## Try it yourself

The code is on GitHub: **[dev-comment-reviser](https://github.com/Juliecodestack/dev-comment-reviser)**.

You need Python 3.10+ and a DeepSeek API key. On Windows, if `python` isn't on your PATH, use `py -m` instead of `python -m`.

```bash
git clone https://github.com/Juliecodestack/dev-comment-reviser.git
cd dev-comment-reviser
python -m pip install -r requirements.txt
cp .env.example .env      # Windows: copy .env.example .env
```

Put your DeepSeek API key in `.env`, then start the server:

```bash
python -m uvicorn main:app --reload
```

Open http://127.0.0.1:8000.

By default, your comments are sent to the DeepSeek API for revision. History stays on your machine in a local SQLite file.

If you want to use another provider's API, set `DS_BASE_URL`, `DS_MODEL`, and `DS_API_KEY` in `.env`. Any OpenAI-compatible API should work; for a non-compatible API, you'll need to change the client in `llm.py`.

## Feedback welcome

The whole reason I built this was to stop re-pasting the same prompt. I'm curious how other people handle it: **do you use AI to revise your writing, and if so, which tool do you reach for?**

That answer will shape what I build next.