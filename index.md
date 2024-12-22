---
layout: layouts/base.vto
visible: false
title: SIDIOUS.PIZZA
order: 0
---

<style>
    picture {
        mix-blend-mode: difference;
    }
</style>

<script>
addEventListener("DOMContentLoaded", () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile) document.getElementById("zen-mode-tip").style.display = 'none'
  if(isMobile) document.getElementById("sitemap-tip").style.display = 'block'
})
</script>

<h2>Hello, my name is VIC.</h2>
<h2>Welcome to my website.</h2>

<picture class="no-border">
    <!--<img width=400 src="assets/images/vic.gif">-->
</picture>

<span id="zen-mode-tip">Press the <em>`z`</em> key anytime to enter zen mode.</span>
<span style="display:none" id="sitemap-tip">You can explore by going to the <a href="/sitemap">sitemap.</a></span>
