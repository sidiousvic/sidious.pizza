---
layout: article.eta
type: project
title: 障道
subtitle: Notes toward an athletic philosophy of nature
project: shodo
order: 1
date: 2025-03-01
languages: [en]
logo: /images/shodo.webp
templateEngine: ["eta"]
featured: true
---

<p>
This is a collection of observations defining the principle of Shodō (障道, lit. "the way of obstacles") which places nature’s flow as the teacher and our posture toward it as the practice.
</p>

<p>
They map how I've observed growth and deception in difficult times in my own life, and what occurs when we move in respect to the terrain and what happens when we move against it. 
</p>

<p>
Shodō is not an ethics, it's only an interpretation of nature. It does not propose methods, only observations.
</p>

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
