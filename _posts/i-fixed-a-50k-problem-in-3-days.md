---
title: "I Fixed a $50k Problem in 3 Days. It Took 30 Iterations."
excerpt: "A small business automation that looked simple turned into a lesson in legacy systems, hidden workflows, and why fast iteration matters more than the first clean solution."
coverImage: "/blog/saving-50k-blog-image.jpg"
date: "2026-06-02T12:00:00.000Z"
category: Engineering
number: "07."
author:
  name: William Armstrong
  picture: "/william-1.JPG"
ogImage:
  url: "/blog/saving-50k-blog-image.jpg"
tags:
  - automation
  - QuickBooks
  - legacy software
  - AI
  - small business
---

## The Problem That Looked Simple

The client came to me with what seemed like a straightforward ask. They were spending hours every week manually moving data between QuickBooks and a legacy operations system they had been running for years. Copy, paste, verify, repeat. Across every invoice, every reconciliation, every reporting cycle.

They wanted it automated. Simple enough.

It was not simple.

The first thing I learned was that the legacy software had no real API. It was a system that had been running so long it predated the expectation of integration. It was the kind of tool where the UI was the interface, where the data lived in formats that reflected 15-year-old decisions, and where any attempt to work around it had to be surgical. The team had workflows built on top of it. Habits built on top of those workflows. You could not just replace it. You had to work inside it.

QuickBooks had its own constraints. The data structures did not map cleanly onto what the legacy system expected. What looked like a simple sync was actually a translation problem with a lot of edge cases hiding inside it.

## The First Solution Did Not Work

My initial approach was too clean. I built something that worked for the base case and broke on the exceptions. The client found 3 edge cases in the first hour of testing.

That is the thing about small business operations. The friction is invisible until you try to remove it. The workarounds are so embedded into how people work that nobody thinks of them as workarounds anymore. They are just the job.

I rebuilt. Hit different edge cases. Rebuilt again.

This is the part where iteration speed becomes the actual product. With Cursor handling the heavy lifting on code changes and Vercel deploying in under a minute, I was making changes and having the client test them in near real time. We were in a call together. They would click through a workflow, something would break, I would fix it, they would reload and try again. The feedback loop that normally takes days compressed into minutes.

The Vercel AI SDK handled the intelligence layer where the data translation got ambiguous. When QuickBooks output something that did not map cleanly, the model filled the gap.

## What Small Businesses Actually Need

Working this close to a small business operation taught me something I did not expect.

Their tools are not bad because they are small. They are deeply integrated in ways that large companies often are not. Every piece of software is connected to a specific person, a specific habit, a specific institutional knowledge that lives in someone's head. The friction is high, but so is the dependency.

The mistake would have been to walk in with a clean-room solution and ask them to change how they work. The right move was to build something that fit inside what they already had, even when what they already had was a 15-year-old piece of software with no API.

The automation I shipped saves them roughly $50k a year in manual labor. It runs without anyone thinking about it. It required 3 days of work and more iteration cycles than I expected.

The lesson is not that the problem was harder than it looked. The lesson is that the first version of the problem is never the real problem. The real problem lives in the exceptions, the workarounds, and the habits of the people who have been living with the friction long enough to stop noticing it.

The only way to find it is to build, test with the actual user, and rebuild fast.

I am curious what that looks like when the legacy system is even more constrained. There are businesses running on software that is older than I am. That is a different class of problem. One I want to understand better.
