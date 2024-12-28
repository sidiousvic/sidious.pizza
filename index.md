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
document.addEventListener('DOMContentLoaded', () => {
	if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
		const main = document.querySelector('#main');	
		main.innerHTML = '';
		window.location.href = '/sitemap';
	}
});
</script>

<script inline src="/_esnext/phantompizza.js"></script>
