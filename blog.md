---
title: Blog
layout: page
---

# {{ page.title }}

<ul class="post-list --bordered">
  {% for post in site.posts %}
      <li>
        <article>
          <h3>
            <a href="{{ post.url }}">{{ post.title}}</a>
          </h3>
          <p>{{ post.excerpt }}</p>
          <footer>
            <span class="date">{{ post.date | date: "%b %-d, %Y" }}</span>
            {% if post.tags.size > 0 %}
              <ul class="tag-list">
                {% for tag in post.tags %}
                  <li class="tag">
                    {{ tag }}
                    <!-- <a class="post" href="/tag/{{tag}}">{{tag}}</a> -->
                  </li>
                {% endfor %}
              </ul>
            {% endif %}
          </footer>
        </article>
      </li>
  {% endfor %}
</ul>