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

Hola amigxs, my name is Vic and this my cyber space. I will be [writing](/weblog) and sharing my music here, as well as computer programs . Here's a summary of what's happened so far.

# Born and raised in the desert

<figure>
  <picture>

![A dry mountain in the middle of a city](/assets/chihuahua.jpeg)

  </picture>
  <figcaption>

[Chihuahua, Chih. Mexico.](https://en.wikipedia.org/wiki/Chihuahua_City)

  </figcaption>
</figure>

I was born in the state of Chihuahua, in the north of Mexico. It's a very dry region where water and plants are scarce. It's one of the areas of highest scorpionism on the planet.

<figure>
  <picture>

![A scorpion in dry ground](/assets/scorpionism.png)

  </picture>
  <figcaption>

Damn little [xerocoles.](https://en.wikipedia.org/wiki/Scorpion#:~:text=Scorpions%20are%20xerocoles%2C%20meaning%20they%20primarily%20live%20in%20deserts%2C)

  </figcaption>
</figure>

My father got a computer from work when I was young, and I used it in the evenings to surf the internet. Few years later I was a seasoned [bounty hunter](https://en.wikipedia.org/wiki/Music_piracy) of Black Sabbath and Cream **.mp3s** for family and pals.

Back then the web was more like the wild west, and we were all bustin' cyber bullets willy nilly, having fun and getting by. We were also learning other things.

<figure>
  <picture>

!["English, motherf*cker, do you speak it?"](/assets/do-you-speak-it.gif)

  </picture>
  <figcaption>

["English, motherf\*cker, do you speak it?"](https://youtu.be/Y6YBKdmOlM8?t=285)

  </figcaption>

</figure>

I left home at 17 with my guitar _"Wozza"_ and a few books. Years followed in southwestern USA, Osaka, Hong Kong, and Mexico. I was a student, a gardener, a buyer and a dishwasher. I taught for a few years in the Japanese countryside. Boredom struck and created [a bit of doom music](https://open.spotify.com/intl-ja/track/4YinnI3uql8ax8EZyqyIjl?si=c25ebef66fa546bc) and silly animation in that time.

<figure>
  <picture>

<video width="720" controls>
  <source src="/assets/surfing-with-the-alien.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

  </picture>
<figure>

One summer I studied how to program a low resolution game, which ended up becoming _"Phantom Pizza"_, the game in [the homepage](/). Moved to Tokyo, and been here for a few years now. Programming is how I earn my sushi today. I work for an energy company that is [driving the digitization of the electrical grid](https://www.vox.com/energy-and-environment/2017/12/15/16714146/greener-more-reliable-more-resilient-grid-microgrids#:~:text=microgrids%20within%20microgrids.-,Alvin%20Chang,-Next%3A%20microgrids%20need).
