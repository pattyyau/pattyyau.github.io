---
layout: post
title:  "Adobe XD Grids"
date:   2020-03-23
tags: [adobe-xd, tips]
---

Adobe XD has a strange way of calculating grids that isn't immediately apparent. If you know the number of columns, gutter width, and column width you want, entering those in that order will cause XD to to resize your gutter width.

<!--more-->

<figure>
  <img src="{{ '/assets/img/blog/xdgrid-1.png' | relative_url }}" alt="Setting up Adobe XD grids">
  <img src="{{ '/assets/img/blog/xdgrid-2.png' | relative_url }}" alt="Setting up Adobe XD grids">
  <figcaption>Trying to set the widths from top to bottom causes the Gutter Width to resize by itself.</figcaption>
</figure>

Instead, calculate the margin width in the current artboard to set the correct column width. Weird hack, but it works! Here's a simple formula:

>  [Artboard Width &minus; # Cols &times; Col Width &minus; (# Cols &minus; 1) &times; Gutter Width
] &divide; 2
>
>  [1920 &minus; (12 &times; 96) &minus; (11 &times; 24)] &divide; 2 = **252**


<figure>
  <img src="{{ '/assets/img/blog/xdgrid-3.png' | relative_url }}" alt="Setting up Adobe XD grids">
  <img src="{{ '/assets/img/blog/xdgrid-4.png' | relative_url }}" alt="Setting up Adobe XD grids">
</figure>

Now if you resize the artboard after the grid has been set, you'll have to re-calculate the margins again.