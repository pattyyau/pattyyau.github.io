---
layout: default
---

<section class="works-grid">
  {% for item in site.data.works %}
    <a class="work" href="{{ item.url | prepend: 'work/' | relative_url }}">
      <img class="lazy" data-src="{{ item.thumb | prepend: 'assets/img/works/t/' | relative_url }}" alt="{{ item.title }}">
      <span class="work__icon">
        <svg class="icon"><use xlink:href="{{ 'assets/img/icons/ui.svg#i-search' | relative_url }}" /></svg>
      </span>
      <div class="work__caption">
        <h2 class="">{{ item.title }}</h2>
      </div>
    </a>
  {% endfor %}
  <div class="work">
    <img class="lazy" data-src="{{ 'assets/img/works/t/models.jpg' | relative_url }}">
    <div class="work__caption">
      <h2 class="">3D Animation</h2>
    </div>
  </div>
  <div class="work">
    <img class="lazy" data-src="{{ 'assets/img/works/t/game.jpg' | relative_url }}">
    <div class="work__caption">
      <h2 class="">Game Design</h2>
    </div>
  </div>
</section>