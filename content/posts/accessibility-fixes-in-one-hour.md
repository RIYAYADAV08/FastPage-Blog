---
title: "Five accessibility fixes you can make in one hour"
description: "Small changes to alt text, labels, contrast, focus and headings make a site usable for more people, and they help SEO too."
date: "2026-09-09"
category: "Accessibility"
---

Accessibility sounds big, but a lot of the value comes from a handful of habits. Here are five you can apply to almost any site today.

## 1. Write useful alt text

Every meaningful image needs a short description of what it shows. If an image is purely decoration, use an empty `alt=""` so screen readers skip it.

## 2. Label every form field

A placeholder is not a label, because it disappears when you type. Connect a visible label to its input.

```html
<label for="email">Email address</label>
<input id="email" type="email" />
```

## 3. Check colour contrast

Normal body text needs a contrast ratio of at least **4.5:1** against its background. Light grey text on white is the most common failure. Chrome DevTools shows the contrast ratio when you inspect a colour.

## 4. Keep the focus outline visible

Put your mouse away and press the Tab key. You should always be able to see where you are on the page. Never write `outline: none` without adding a clear replacement.

## 5. Use the right element

A `div` with a click handler is not a button. It cannot be reached with the keyboard and screen readers do not announce it. Use `button` for actions, `a` for links, and keep headings in order, with one `h1` and then `h2` and `h3` below it.

## Test it yourself

Spend ten minutes using your site with only the keyboard. Then run the Lighthouse accessibility audit. Lighthouse catches many issues but not all of them, so the keyboard test matters just as much.
