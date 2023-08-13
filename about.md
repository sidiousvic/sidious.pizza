---
layout: layouts/post.njk
title: VIC
templateClass: tmpl-post
menu:
  visible: true
  order: 2
beta: true
---

<style>
.info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.vic-profile-pic {
  margin: 1vw;
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
  <picture class="vic-profile-pic">
    <img alt="vic" width=250 src="/@/vic.png"/>
  </picture>

  <article>

|           |                                                                             |
| --------- | --------------------------------------------------------------------------- |
| _Name_    | <div class="ypewriter">Victor René Molina Rodríguez</div>                   |
| _Work_    | [Programmer, energy industry](https://github.com/sidiousvic)                |
| _Lives_   | [澁谷東京](https://goo.gl/maps/1YfuGi5HYgRpBjN7A)                           |
| _Born_    | _(And raised in)_ [Xicuahua, Mexico](https://goo.gl/maps/Ja9LxnZ6kosdRa586) |
| _Age_     | <span id="age_µs">?</span>                                                  |
| _Loves_   | 🍕                                                                          |
| _Hobbies_ | Football, music, writing, programming                                       |

  </article>
</div>

Hola amigxs, my name is Vic and this my cyber space. I will be [writing](/weblog) and sharing my music and computer programs here.

# Born and raised in the desert

<figure>
  <picture>

![A dry mountain in the middle of a city](/@/chihuahua.jpeg)

  </picture>
  <figcaption>

[Chihuahua, Chih. Mexico.](https://en.wikipedia.org/wiki/Chihuahua_City)

  </figcaption>
</figure>

I was born in the state of Chihuahua, in the north of Mexico. It's a very dry region where water and plants are scarce. It's the [birthplace of the burrito](https://en.wikipedia.org/wiki/Burrito#:~:text=Burritos%20are%20a%20traditional%20food%20of%20Ciudad%20Ju%C3%A1rez%2C%20a%20city%20bordering%20El%20Paso%2C%20Texas%2C%20in%20the%20northern%20Mexican%20state%20of%20Chihuahua%2C%20where%20people%20buy%20them%20at%20restaurants%20and%20roadside%20stands.%20Northern%20Mexican%20border%20towns%20like%20Villa%20Ahumada%20have%20an%20established%20reputation%20for%20serving%20burritos.), and one of the areas of highest scorpionism on the planet.

<figure>
  <picture>

![A scorpion in dry ground](/@/scorpionism.png)

  </picture>
  <figcaption>

Your deadly neighborhood [arachnid](https://en.wikipedia.org/wiki/Scorpion#:~:text=Scorpions%20are%20xerocoles%2C%20meaning%20they%20primarily%20live%20in%20deserts%2C)

  </figcaption>
</figure>

# Misled youth

I was a bit of a goblin when young, and used to skip school to play ball and skateboard. I spent a lot of time listening to hard rock records. My heroes became [Jamie Thomas](https://www.youtube.com/watch?v=452Oxqm4E3Y) and Jimi Hendrix.

I remember listening to [Foxey Lady](https://www.youtube.com/watch?v=_PVjcIO4MT4) on my discman while taking out the trash. I broke my arm crashing into a parked car trying to do a _"hardflip"_.

<figure>
  <picture>

![Fish-eye view of a man doing a skateboard trick called a hardflip](/@/hardflip.gif)

  </picture>
  <figcaption>

Hardflips are really hard

  </figcaption>
</figure>

I was a seasoned [bounty hunter](https://en.wikipedia.org/wiki/Music_piracy) of _.mp3s_ which I shared with family and friends. I spent a lot of my teenage years surfing the web, playing Zelda and watching MTV.

<figure>
  <picture>
  
![MTV logo](/@/mtvlogo.gif)

  </picture>
  <figcaption>
    <em>"Because MTV brings out the bitch in you"</em>
  </figcaption>
</figure>

# Skating away

I left home at 17 with my guitar _"Wozza"_ and a few books. Years followed in southwestern USA, Osaka, and Hong Kong, tumbling back to Mexico from time to time, but [never staying there too long](https://en.wikipedia.org/wiki/Timeline_of_the_Mexican_drug_war). I went back to Japan and never left.

<figure>
  <picture>

![Animated gif of a skateboarder ollying over a laundry bottle on the street](/@/skating-tokyo.gif)

  </picture>
  <figcaption>
  This is an anti-social activity.
  </figcaption>
</figure>

When boredom struck I biked, read a shit ton of books, wrote [haiku](/tags/haiku), made [doomer music](https://open.spotify.com/intl-ja/track/4YinnI3uql8ax8EZyqyIjl?si=c25ebef66fa546bc) and even made silly web cartoons to pass the time.

<figure>
  <picture>

![Animated gif of a cartoon alien surfing](/@/surfing-with-the-alien.gif)

  </picture>
  <figcaption>

[Xeno the Alien, 2017](https://www.youtube.com/watch?v=cu3iGtqeYD4)

  </figcaption>
</figure>

I had these misadventures under the pseudonym _"Vic Sidious"_ a play on [Sid Vicious](https://www.youtube.com/watch?v=rDyb_alTkMQ). I'm fascinated by villains and anarchists like Sid. For a while I felt like one, but it was too easy to confuse half-assing everything with being a rebel. After 25 I was ready to whole-ass something.

# Tokyo boy

One summer I studied how to program a low resolution game using C#, which ended up becoming _"Phantom Pizza"_, the game on [the homepage](/). It was fun like hell. I was saving up to buy a motorcycle at the time, but I used the money to continue mashing keys and move to Tokyo to find work with computers.

<figure>
  <picture>

![A view of Kanda river near Asakusabashi, Tokyo](/@/tokyo.gif)

  </picture>
  <figcaption>
    Kanda river 
  </figcaption>
</figure>

Programming is how I earn my sushi today. I work for a company that is driving the digitization of the electric grid in Japan, making energy use more green.

I still play guitar and skate sometime. I'm saving up for a motorcycle again. I dedicate some time to my craft, such this website, but I really spend most of the time drinking and laughing with friends.

<figure>
  <picture>

![Two kids playing a game on a bed, laughing](/@/ichigo.jpg)

  </picture>
  <figcaption>
  
<span style="font-style: italic;">"We made the mountains shake with laughter as we played <em>/</em> Hiding in our corner of the world <em>/</em> Then we did the demon dance and rushed to nevermore <em>/</em> Threw away the key and locked the door."</style>
  </figcaption>
</figure>

Thank you for reading. _どうもどうも！_ I'll see you around [sidious.pizza](/). Welcome and I hope you have a great time here.
