---
layout: layouts/post.njk
title: VIC
templateClass: tmpl-post
menu:
  visible: true
  order: 2
---

<style>
.info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

<script type="text/javascript" async>
document.addEventListener("DOMContentLoaded", () => {
  const ageElement = document.getElementById("age_µs");
  const MS_TO_µs_FACTOR = 1000;
  const UNIX_TIME_START_YEAR = 1970;
  const unixZero = new Date(+0); 
  const vicsBirthday = new Date("September 24, 1991");
  setInterval(() => {
    const unixNow = new Date(); 
    const vicsAgeDate = new Date(unixNow.getTime() - vicsBirthday.getTime());
    const vicsAgeMs = vicsAgeDate.getTime();
    const vicsAgeµs = vicsAgeMs * MS_TO_µs_FACTOR;
    const vicsAgeFemto = vicsAgeMs * MS_TO_µs_FACTOR;
    ageElement.innerHTML = `${vicsAgeµs}<sub><em>µs</em></sub> <em>(${Math.abs(vicsAgeDate.getUTCFullYear() - UNIX_TIME_START_YEAR)})</em>`
  });
});
</script>

<div class="info">
  <picture style="margin-right: 3vw;">
    <img alt="vic" width=250 src="/assets/vic.png"/>
  </picture>

  <article>

|           |                                                                             |
| --------- | --------------------------------------------------------------------------- |
| _Name_    | <div class="ypewriter">Victor René Molina Rodríguez</div>                   |
| _Work_    | [Programmer, energy industry]()                                             |
| _Lives_   | [澁谷東京](https://goo.gl/maps/1YfuGi5HYgRpBjN7A)                           |
| _Born_    | _(And raised in)_ [Xicuahua, Mexico](https://goo.gl/maps/Ja9LxnZ6kosdRa586) |
| _Age_     | <span id="age_µs">?</span>                                                  |
| _Loves_   | 🍕                                                                          |
| _Hobbies_ | Football, music, writing, programming                                       |

  </article>
</div>

Hola amigxs, my name is Vic and this my little corner of the web. I want this domain to be a cyber representation of myself. I will be [writing](/weblog) and sharing my music here, as well as computer programs like _"Phantom Pizza"_, the game in [the homepage](/).

# Born and raised in the desert

<figure>
  <picture>
    <img alt="desert dunes of samalayuca, chihuahua" src="/assets/samalayuca.png">
  </picture>
  <figcaption> 
    <a href="https://goo.gl/maps/ZW6aMxr8pxJyaVhJ7">Salamayuca dunes, Chihuahua</a>
  </figcaption>
</figure>

I was born in the state of Chihuahua, Mexico.
