---
layout: post
title:  "Remaking a TCG pt. 1"
date:   2020-04-09
tags: [jekyll]
---

As I rummaged through an old hard drive, I came across some nostalgic source code from my days playing in online TCGs. TCGs were a niche labor of love for people whose passions intersected between creating websites in the early noughties and collecting virtual pixel "trading cards".

<!--more-->

I fell down a deep research rabbit hole and was pleasantly surprised to find a few of them still around. That kicked off an unshakable desire to make one again, but what would I do differently this time?

My early TCG trade post was entirely hardcoded using rudimentary PHP includes for the header/footer and a simple contact form. The state of the web has changed since then, it seems like many people have since adopted a popular tradepost management script called [eTCG](https://github.com/filler00/etcg). However, this time I wanted to step away from PHP and MySQL databases and take advantage of Jekyll's simpler flat file system.

<figure>
  <img src="{{ '/assets/img/blog/silverstream.jpg' | relative_url }}" alt="My Old TCG">
  <figcaption>My TCG at the tender age of 15</figcaption>
</figure>

The new website should be automatically generated as much as possible. My requirements were:

1. Runs off Jekyll and Github Pages
2. All card information should be located in a single data file per TCG
3. All TCG subpages should be dynamically created

The final site architecture should look like:

- Index
- TCG List
  - TCG-1
    - Stats (Log)
    - Collecting (Current, Future)
    - Trading (Pending, Doubles, Willing-to-Trade, Maybes)
    - Mastered
    - Form
  - TCG-2
    - ...
  - TCG-3
    - ...
- Contact


The vanity URLs should look like:
```
./
./tcg-1
./tcg-1/collecting
./contact
```

The YAML data should look like:

``` yaml
name: TCG-1
url: /tcg1
imgdir: /img
extension: .png
# other metadata
collecting:
  - name: Lions
    total: 20
    row: 5
    cards:
      - lions01
      - lions02
later:
  cards:
    - tiger05
pending:
  - name: Joe Exotic
    date: 2020-04-01
    cards:
      - tigers10
doubles:
willing:
  cards:
    - bears01
    - bears20
maybe:
mastered:
```

The idea behind this setup is that I can easily manage and update all the cards by touching only one file. The question was, is it possible to generate all the subpages (Collecting, Trading, Mastered, Form) with just the single YAML data and no Front Matter pages? I wanted to keep the project slim and not have to duplicate all the individual subpages for TCG-2 and TCG-3.

Let's break it down. I essentially have one massive data file that I am applying different layouts to hide or show the appropriate cards on each subpage, and these subpages should only be created during build time.

My first attempt was to create a `.yml` file for each TCG in the `_data` folder. However, in order to create individual pages from each of those, I'd still have to create an `.md` for each TCG in order to access the custom data, which would defeat the purpose of a dynamic project. The closest solution I found was a plugin called [jekyll-data-page_gen](https://github.com/avillafiorita/jekyll-datapage_gen), but unfortunately it's not supported by Github Pages.

Next I looked into Jekyll's Collections. I moved all the data into the page's Front Matter in a folder called `_tcg`, which I then placed into a collection in the `_config.yml`. I then scoped the collection to different layouts and permalinks to create the subpages. Since they were grabbing from the same collection, only the last defined values were being used. The fix was creating **Symbolic Links** for each subfolder (`_collecting`, `_trading`, etc) pointing to `_tcg` and creating a collection for each.

Run Command Prompt as Administrator:

``` console
mklink /d _collecting/ _tcgs/
```

Final `_config.yml`:
``` yaml
collections:
  tcgs:
    output: true
  collecting:
    output: true
  trading:
    output: true
  mastered:
    output: true
  form:
    output: true

defaults:
  - scope:
      path: "_tcgs"
    values:
      layout: "tcg-stats"
      permalink: /:title/
  - scope:
      path: "_collecting"
    values:
      layout: "tcg-collecting"
      permalink: /:title/collecting/
  - scope:
      path: "_trading"
    values:
      layout: "tcg-trading"
      permalink: /:title/trading/
  - scope:
      path: "_mastered"
    values:
      layout: "tcg-mastered"
      permalink: /:title/mastered/
  - scope:
      path: "_form"
    values:
      layout: "tcg-form"
      permalink: /:title/form/
  - scope:
      path: ""
    values:
      layout: "default"
```