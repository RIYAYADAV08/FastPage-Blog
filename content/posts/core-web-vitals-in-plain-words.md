---
title: "Core Web Vitals in plain words"
description: "Three numbers decide whether Google thinks your site feels fast. Here is what LCP, INP and CLS measure and how to improve each one."
date: "2026-10-12"
category: "Performance"
---

Core Web Vitals are three measurements Google uses to judge how a page feels to real visitors. You do not need to be a performance expert to understand them.

## LCP: how fast the main content appears

Largest Contentful Paint measures how long it takes for the biggest visible element to load. On most pages that is the hero image or the main heading. A good score is **2.5 seconds or less**.

To improve it:

- Resize and compress the hero image, and serve a modern format like WebP or AVIF.
- Use the `priority` prop on the first `next/image` on the page so it loads early.
- Avoid loading large scripts before the content.

## INP: how fast the page reacts

Interaction to Next Paint measures how quickly the page responds when someone clicks, taps or types. It replaced the older First Input Delay metric in March 2024. A good score is **200 milliseconds or less**.

To improve it:

- Ship less JavaScript. Every extra library has a cost.
- Split heavy work into smaller tasks so the browser can respond in between.
- Keep click handlers light.

## CLS: how much the page jumps

Cumulative Layout Shift measures unexpected movement, like a button moving just as you tap it. A good score is **0.1 or less**.

To improve it:

- Always set `width` and `height` on images (`next/image` does this for you).
- Reserve space for embeds, ads and banners before they load.
- Load fonts with `next/font` so text does not change size when the font arrives.

## How to measure

Open Chrome DevTools, go to the Lighthouse tab and run a report. That gives you *lab data* from one test. For *field data* from real users, paste your URL into PageSpeed Insights. Aim to fix the metric marked red first, because that is where visitors feel the most pain.
