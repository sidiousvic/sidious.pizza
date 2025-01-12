---
layout: layouts/post.vto
date: 2018-07-07
gif: /assets/images/spacephantom.gif
title: SPACE PHANTOM
bullet: ⧎
tags:
  - projects
---

![An alien spaceship shooting at another dark ship in space](/assets/images/space-phantom.webp){ optimize width=800 priority="high" }

_"Space Phantom"_ is my maiden software project. It was built with C# and Unity3D following a Unity Engine game development manual. It was inspired by the arcade classic [Space Invaders](https://en.wikipedia.org/wiki/Space_Invaders).

<script>
addEventListener("DOMContentLoaded", () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile) document.getElementById("game-link").innerHTML = '<em style="font-family: var(--font-family-title)">This game is not available on mobile devices.</em>'
})
</script>

<p id="game-link">
    <a href="game" style="display:table;margin:auto">
        <button style="font-family: var(--font-family-title) !important;">
            Play SPACE PHANTOM
        </button>
    </a>
</p>
The ship gyrates towards the direction of motion, adjusting the angle of shooting. Implementing the maths of this orbit transform and its limit (so that the ship did not over rotate) was **wicked fun** and what I consider my "hello world" moment.

![A screengrab of the game Space Phantom, depicting an alien ship destroying enemies in the shape of red skulls with laser beams.](/assets/images/spacephantom.gif){ optimize priority="high" caption="Space invaders, with a twist." }

The music was made using Logic Pro X drum machine and graphics w/ a pixel editor. I would love to create a manual for it in the style of old NES projects sometime.
