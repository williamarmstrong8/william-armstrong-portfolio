---
title: "Rebuilding ClubPack in Next.js"
excerpt: "Why I rebuilt ClubPack in Next.js and what I learned about structure, durability, and designing for where a product is going."
coverImage: "/blog/rebuilding-clubpack.png"
date: "2025-02-05T12:00:00.000Z"
category: Startups
number: "01."
author:
  name: William Armstrong
  picture: "/william-1.JPG"
ogImage:
  url: "/william-1.JPG"
---

Two weeks ago, I deleted most of ClubPack.

Not the idea.
Not the users.
The foundation.

The original version was a simple React web app. It worked. It let me validate the concept, onboard real clubs, and prove that there was demand. But once usage increased and the product matured, I started to feel subtle friction.

Nothing was broken.
But everything felt slightly heavier than it should.

So I rebuilt it in Next.js.

## Why I Made the Switch

At first, React was perfect. It helped me move fast and stay focused on shipping. Speed mattered more than structure.

As ClubPack grew, structure started to matter more than speed.

Public club pages needed to load instantly. Discoverability became important. Routing complexity increased. I wanted clearer boundaries between what runs on the server and what runs in the browser.

Next.js forced me to think differently.

Routes became part of the product architecture.
Data fetching became intentional instead of reactive.
Performance became a design decision.

It felt less like stitching screens together and more like designing a system.

## What I Learned From Rebuilding

Rebuilding something you already built is a mirror.

You see every shortcut. Every rushed decision. Every place where you chose convenience over clarity.

But you also see growth.

The first version of ClubPack was about validation. The rebuild was about durability.

One thing surprised me. Clean architecture reduces cognitive load. When the structure makes sense, you stop fighting your own codebase. You think more clearly about users, flows, and outcomes.

The rebuild took about two weeks. Intense, focused, slightly obsessive. But by the end, the product felt aligned with where I want it to go, not just where it started.

## For Builders

If you are building something right now, here is a simple reflection exercise:

Ask yourself:

* Is your current structure helping you move faster, or are you quietly designing around its limitations?
* If you had to grow ten times tomorrow, would your foundation hold?

Rebuilding is not always the answer. Sometimes you just need better systems inside your current setup.

But sometimes the most strategic move is not adding more.

It is rebuilding better.

## What This Means for ClubPack

ClubPack now feels lighter. Faster. More intentional.

New features plug in cleanly. Public pages are structured for growth. The architecture matches the ambition.

Rebuilding was not about rewriting code.

It was about deciding that ClubPack deserves infrastructure built for where it is going, not where it began.
