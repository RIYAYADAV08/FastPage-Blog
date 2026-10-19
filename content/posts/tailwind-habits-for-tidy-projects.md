---
title: "Six Tailwind CSS habits that keep a project tidy"
description: "Long class lists get messy fast. These habits keep Tailwind code readable, consistent and easy to change as your project grows."
date: "2026-08-30"
category: "CSS"
---

Tailwind is quick to start with, but a big project can turn into a wall of classes. These habits keep things under control.

## 1. Extract components, not classes

If you copy the same card markup five times, make a `Card` component. Reuse the component, not the long class string. Then a design change happens in one file.

## 2. Put design decisions in the config

Colours, fonts and spacing used across the site belong in `tailwind.config.js`. Then `bg-brand` means the same thing everywhere and a rebrand is a one-line change.

## 3. Stick to the spacing scale

Use values like `p-4` and `gap-6` from the default scale instead of arbitrary ones like `p-[13px]`. A consistent scale makes layouts look deliberate.

## 4. Go mobile first

Write base classes for small screens, then add `md:` and `lg:` for larger ones. Avoid writing desktop styles first and then undoing them on mobile.

## 5. Format classes automatically

Install the official Prettier plugin, `prettier-plugin-tailwindcss`. It sorts classes into a consistent order every time you save, which makes code reviews much easier.

## 6. Use `@apply` sparingly

`@apply` is handy for base styles, like headings inside rendered Markdown. If you use it everywhere, you lose the main benefit of Tailwind, so reach for a component first.

## One last tip

Use `focus-visible:` and `hover:` classes from the start. Styling interactive states early makes your pages more accessible and saves a round of fixes later.
