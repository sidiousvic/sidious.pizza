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
      <th>AKA</th>
      <td>Victor, Toru, @sidiousvic</td>
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

Victor Rene Molina Rodriguez, known as Vic Sidious, was born in Chihuahua, Mexico, and grew up in a working-class family. His father sold electric mining cable and his mother taught at a public primary school. He has one younger brother.

Much of his childhood was spent at his grandmother’s house, where he was surrounded by extended family, including his uncles, godfather, and many cousins. The family did not have much money, but they took local trips when they could and kept a steady routine of shared activities.

The region of northern Mexico is defined by scarce water and desert landscapes, and many residents work in cattle ranching or mechanical trades. As a major route for northbound drug trafficking, the area also experienced frequent cartel violence. Gunfire and armed conflict were part of the broader atmosphere where he and his friends grew up.
