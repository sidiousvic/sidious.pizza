---
layout: base.eta
title: About Myself
type: page
shellClass: vod-wide
---

<p class="eyebrow">Primate of the species mēhxican</p>

# Vic Sidious

<img style="width: 400px; animation: floating 3s ease-in-out infinite;" src="/images/vic-mural.png">

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
      <td>Guitar, burritos, engines, football, brews</td>
    </tr>
    <tr>
      <th>Aliases</th>
      <td>Victor, Tōru, @sidiousvic, Don Vic</td>
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

Born _Victor Rene Molina Rodriguez_, in the town of Santa Isabel, Chihuahua, in northern Mexico. Grew up in a working-class family, his father sold electric mining cable and mother taught at a public primary school. He has one younger brother. 

## Work

Engineer at Toyota in Tokyo, where he leads a small group of fellow primates building software for electric systems.
