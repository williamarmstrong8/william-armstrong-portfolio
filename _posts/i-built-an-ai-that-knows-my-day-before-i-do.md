---
title: "I Built an AI That Knows My Day Before I Do"
excerpt: "Every morning I was starting my day behind, not on work, but on context. So I automated a 7am briefing: email, calendar, news, and a personalized audio podcast in my inbox before I open a single app."
coverImage: "/blog/podcast-thumbnail.png"
date: "2026-04-29T12:00:00.000Z"
category: Product
number: "05."
author:
  name: William Armstrong
  picture: "/william-1.JPG"
ogImage:
  url: "/blog/podcast-thumbnail.png"
tags:
  - automation
  - n8n
  - AI
  - Claude
---

For the past few months I have been obsessed with one problem.

Every morning I was starting my day behind.

Not behind on work. Behind on context.

Phone in hand, half awake, bouncing between Gmail, Google Calendar, the news, whatever had blown up overnight. By the time I actually sat down to build something I had already spent 30 minutes just catching up. And none of that time felt like progress. It felt like overhead.

So I built something to fix it.

Every morning at 7am, before I open a single app, an AI has already read my emails, checked my calendar, scanned the Vercel blog, and pulled the morning news. Then it writes a script, generates a personalized audio briefing, and sends it straight to my inbox.

I called it the Daily Brief.

This is how I built it.

## How I Approach Automations

Before I get into the actual build I want to share how I think about automations in general. Because the tools are not the hard part. The thinking is.

I always start with the outcome, not the stack.

The question I ask is: what does the perfect version of this look like if a brilliant human did it? In this case the answer was clear. Imagine having an assistant who woke up an hour before you, read everything, connected the dots, and handed you a clean briefing as you walked out the door. Not a list. Not a summary. A briefing. From someone who actually understood your life and your work.

That mental picture becomes the spec. From there I work backwards. What data does that assistant need? Where does it live? What decisions are they making with it? Those questions map almost perfectly to nodes in n8n, which is my automation tool of choice. It sits in a sweet spot between power and speed. Native integrations for almost everything, an HTTP node for anything it does not cover natively, and you can drop Claude or any LLM directly into a workflow without writing glue code. For someone who can code but wants to move fast, it is hard to beat.

The other principle I hold onto is this. Build the dumbest version first. Get data flowing end to end even if the output is rough. A workflow that runs and produces bad output is infinitely more useful than a perfectly designed workflow that does not exist yet. You iterate your way to good.

## Building the Daily Brief

Here is the actual workflow and how I thought about each piece.

### The trigger

A Schedule node set to 7am every day. Everything else flows from there. Simple as that.

### Five parallel data branches

This is the core of the workflow. Five branches fire at the same time the moment the trigger runs, each one pulling a different source.

- **The Vercel Blog branch** sends an HTTP request to the Vercel RSS feed and runs a JavaScript node to parse and clean the response down to just the recent posts worth including.
- **The Daily Weather branch** uses OpenWeatherMap to pull current conditions for my location. Another JavaScript node formats it into something clean and readable before it moves downstream.
- **The Get Unread Emails branch** connects directly to Gmail, pulls my unread messages, and runs a JavaScript node to extract just the subject, sender, and body snippet. I do not need the full email text. I just need enough for Claude to understand what deserves attention.
- **The Calendar branch** pulls all of today's events from Google Calendar and formats them the same way. Titles, times, and any notes I have attached to events. Those notes matter more than people realize. If I write context into a calendar event, it flows straight into the briefing.
- **The Get Daily News branch** is the most interesting one structurally. It runs three separate RSS feeds in parallel, each covering a different topic area. Each one feeds into a Limit node to cap the number of stories, then all three merge together and run through a JavaScript node that filters and deduplicates before passing a clean list downstream.

### Data formatting for AI

Once all five branches finish, everything flows into a Merge node that appends all the inputs together. A final JavaScript node then formats the combined data into a structured prompt. This step matters a lot. You are not just dumping raw data at Claude. You are shaping it into something Claude can reason over cleanly.

### Podcast script generation and audio

The formatted data hits Claude via the Anthropic node. The prompt tells Claude to write in a specific voice, treat all five sources as a unified context rather than five separate summaries, find the connections between them, and keep it tight. No filler. No recapping things I already know.

The output is a clean script. That script then feeds directly into an audio generation node that converts it to speech.

### Email me

The final node sends the audio to my inbox. Subject line, date, done. It is sitting there every morning before I wake up.

## The Thing That Actually Made It Good

The first version had Claude summarizing each source separately. Weather block. Email block. Calendar block. It sounded like a robot reading a checklist.

The breakthrough was restructuring the prompt to give Claude everything at once and ask it to think across all of it together. Suddenly it would notice that I had a meeting with someone who had just emailed me. It would flag a Vercel post as relevant because it knew what I was working on that week. It would connect a news story to something on my calendar.

That is the difference between a summary and a briefing. And it is entirely a prompting decision, not a technical one.

## Build Your Own

The full n8n workflow template is coming soon. If you want it when it drops, follow along here and I will share it the day it goes live.

The stack is n8n, Claude via the Anthropic API, OpenWeatherMap, Google Calendar, Gmail, and a handful of RSS feeds. It costs me under two dollars a month to run.

Start with one data source. Get it flowing into Claude. See what comes out. Then add the next one. The compounding is what makes it feel like magic.
