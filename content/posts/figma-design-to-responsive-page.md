---
title: "From Figma design to responsive page: a step-by-step method"
description: "A repeatable way to turn a Figma file into clean, responsive, accessible code with Tailwind CSS, without guessing at spacing."
date: "2026-09-18"
category: "Front-end"
---

Turning a design into code is mostly about reading the design carefully before you write anything. This is the order that works for me.

## Step 1: pull out the design tokens

Look for the values the designer reuses: colours, font sizes, spacing and corner radius. Put them in `tailwind.config.js` once, so your classes match the design and you never type a random hex code twice.

```js
theme: {
  extend: {
    colors: { brand: "#5B3DF5", ink: "#1B1B2F" },
    borderRadius: { card: "16px" },
  },
}
```

## Step 2: find the repeating parts

Scan the page for pieces that appear more than once, like buttons, cards and section headings. Build each one as a React component first. The page then becomes a short list of components.

## Step 3: build mobile first

Write the small-screen layout first with no prefixes, then add `md:` and `lg:` classes for bigger screens. This keeps the code short, because mobile layouts are usually simpler.

## Step 4: map Auto Layout to flexbox and grid

Figma's Auto Layout is almost the same idea as flexbox. A vertical stack becomes `flex flex-col`, spacing between items becomes `gap-4`, and a row of equal cards becomes a `grid`.

## Step 5: check, then compare

- Resize your browser to about 360px, 768px and 1280px and look for overflow and cramped text.
- Use Figma's Inspect panel to check sizes, and compare your page next to the design.
- Export icons and logos as SVG, and photos as WebP, to keep the page light.

## Step 6: add accessibility as you go

Use real `button` and `a` elements, give images alt text, and pick text colours with enough contrast. It is much easier to do this while building than to fix it at the end.
