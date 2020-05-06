---
layout: post
title:  "Extra styles.css in build"
date:   2020-04-09
tags: [github-pages, tips]
---

When building my Jekyll project, I noticed a heavy styles.css being included in my `assets/css` folder despite having no style file in my scss folder or Gruntfile.

<!--more-->

It turns out this is due to the Github Pages gem fallback to `jekyll-theme-primer` when I removed the `theme: minima`{:.language-yaml} from the `_config.yml`

To fix this, make sure to set theme to `null`{:.language-yaml} in the config instead.

Issue on Github: [#7478](https://github.com/jekyll/jekyll/issues/7478)