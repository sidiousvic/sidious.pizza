---
layout: article.eta
type: project
title: 障道
subtitle: The obstacle is the way
project: shodo
order: 1
date: 2025-03-01
languages: [en, jp]
logo: /images/shodo.webp
templateEngine: ["eta"]
featured: true
---

<img src="/images/shodo-banner.jpeg" style="filter: none">

<section data-lang="en">
<p>
Here is a set of observations that form the principle of Shōdō (障道, “the way of obstacles”), which describes how we move with or away from the quiet shifts and terrains of nature. 
</p>

<p>
It grew out of a rough period in my life, when deception, clarity and growth all revealed themselves through changes in stance. 
</p>

<p>
Shōdō is not an ethics system. It is simply an interpretation of nature. It offers no methods and only observations.
</p>
</section>

<section data-lang="jp">
<p>
障道（しょうどう）は、いくつかの気づきをまとめたもので、静かに移り変わる自然の流れや地形に、私たちが寄り添ったり離れたりする姿を捉えようとする考え方です。
</p>

<p>
これは私自身の苦しい時期に、欺きや明瞭さや成長が姿勢の変化を通して現れた経験から生まれました。
</p>

<p>
障道は倫理ではなく、ただ自然を読み取ろうとする見方であり、方法を示すものではなく、観察だけを残すものです。
</p>
</section>

<% const shodoPosts = (it.posts ?? it.site?.data?.posts ?? []).filter((p) => (p.project || "").toLowerCase() === "shodo" && p.type != "project"); %>

<% if (shodoPosts.length) { %>
<ul class="post-list">
  <% shodoPosts
    .slice()
    .sort((a, b) => (new Date(b.date || 0).getTime()) - (new Date(a.date || 0).getTime()))
    .forEach((post) => { %>
    <li>
      <a href="<%= post.url %>">
        <div class="post-title"><%= post.title %></div>
      </a>
      <div class="post-meta">
        <% if (post.date) { %><span><%= new Date(post.date).toDateString() %></span><% } %>
      </div>
    </li>
  <% }); %>
</ul>
<% } else { %>
<p>No Shodō entries found.</p>
<% } %>
