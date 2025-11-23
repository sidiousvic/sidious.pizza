---
layout: base.eta
title: Vic
type: page
shellClass: vod-wide
---

<p class="eyebrow">About myself</p>

# Vic

<div class="about-intro">
  <table class="about-facts">
    <tr>
      <th>Age</th>
      <td><span id="age-live" class="age-counter">...</span></td>
    </tr>
    <tr>
      <th>Base</th>
      <td>Tokyo, Japan</td>
    </tr>
    <tr>
      <th>From</th>
      <td>Northern Mexico</td>
    </tr>
    <tr>
      <th>Work</th>
      <td>Engineer at Toyota</td>
    </tr>
    <tr>
      <th>Likes</th>
      <td>Guitar, burritos, engines, fights, brews</td>
    </tr>
    <tr>
      <th>Aliases</th>
      <td>Victor, Tōru, <strong>@sidiousvic</strong></td>
    </tr>
  </table>
</div>

<script>
  (() => {
    const ageEl = document.getElementById("age-live");
    if (!ageEl || typeof performance === "undefined") return;

    // Birth: 1991-09-24T11:58-06:00 -> 1991-09-24T17:58:00Z
    const birthMs = Date.parse("1991-09-24T17:58:00Z");
    const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
    // Align performance.now() with epoch for stable, high-res timing.
    const epochOffset = Date.now() - performance.now();

    const update = () => {
      const nowMs = epochOffset + performance.now();
      const years = (nowMs - birthMs) / msPerYear;
      ageEl.textContent = years.toFixed(12);
      requestAnimationFrame(update);
    };

    update();
  })();
</script>

## Early Life

My name is Victor Rene Molina Rodriguez, and I was born in the town of Chihuahua, northern Mexico. I grew up in a working-class family. My father sold electric mining cable and my mother taught at a public primary school. I have one younger brother. 

I studied university in the USA, and visited Japan during as an exchange student. To this day, it is difficult to explain what drew me here. Maybe it was my fascination with the films of Ozu and Kurosawa, the memories I made during my visit, or simply the sentō culture. But here we are, many misadventures and defeats later, in Tokyo. 

