---
layout: layouts/post.vto
date: 2023-12-30
title: "HELLO, WORLD!"
weblog: true
beta: true
tags:
  - programming
  - art
---

I have a dear friend, [Beau](https://beaunus.com). We met at a Xmas dinner not long after I started a position as a programming teacher in an engineering school in Tokyo. We sat with dozens at opposite sides of a long table, and between chomps o' turkey and chugs o' beer he broke the ice with a very interesting question.

> "Hey Vic, what was your "Hello, World!" moment?"

_"Hello, world!"_ is a program used to celebrate your first lines of code written in a new language.

```rust
fn main() {
  println!("こんにちは世界!"); // "Hello, World!"
}
```

You print the greeting to the computer output, usually a terminal. Its both a ritual and a way to test that a program has compiled, a little like playing ["Mary Had a Little Lamb"](https://www.youtube.com/watch?v=1S8bC2JL9gg) on an instrument you're picking up.

_"When was the moment you were like, man, this sh\*t is for me!"_.

For me, it happened when I was making [Space Phantom](/spacephantom).

## Aliens on board

It began as a bedroom project.

![A japanese classroom with an alien drawn on the blackboard](/assets/images/aliens-on-board.webp){ optimize priority="high" width=800 }

A few years ago, I was living rural Japan. I taught music and sports at elementary schools in the deep countryside. Days were fun, but physically heavy, and I had a lot of quietness between bursts of work.

There was also solitude. I had a girlfriend, but she lived hours away. I would spend days at home without much money, far away from other humans.

It's not surprising what happens to us when we're alone. We occupy ourselves with pursuits that make us feel less so. We go to worlds in films and music and books to experience what our wants through them. When that is not enough, we resort to making our own.

That spring, I wrote [Tattsu](/posts/tattsu) on a school piano at Oiwake Elementary. I drew [Xeno the Alien](https://www.youtube.com/watch?v=cu3iGtqeYD4) on a 4th grade clasroom blackboard. My journal would be ridden with stories about undead bounty hunters and space assassins. Wacky little worlds erupted one after another.

I learned something about art that spring. I was happy with my experiments, but they wouldn't connect with others as much as I wanted. Maybe I would have edge if I said that I was making it all for myself. But again, I was doing this to connect with others.

As a kid I'd wanted to make videogames one day. The thought had been dead for years, but it suddenly made more sense. Graphics, music, story. All these things come together in a game. _"So that's it gon' be then... a game. How hard can that be?"_

## Shot in the dark

![A spaceship](/assets/images/shot-dark.webp){ optimize width=800 }

Cicadas rang outside. The fan was running on high, blowing the smoke of a halved marlboro on the ashtray into the haze of Japanese summer. A programming manual and a can of Asahi sat on the desk, next to my computer. On the screen, Microsoft Visual Studio, and my maiden lines of _C#_ code.

```csharp
using System;

class BurritoDispenser // This is a dramatization
```

I was crying on the shower floor. `// also a dramatization`

I'd never experienced this before. Symbols and expressions looked like black magic. I was shining a torch to hierogplyphs in a dark dungeon, a big puzzle of the occult that I was tired to decipher.

I wasn't used to getting lost. I wasn't used to being wrong.

```csharp
Unhandled exception. System.NullReferenceException:
    Object reference not set to an instance of an object.
        at Program.Main() in C:\f*ck\you.cs:line 666
```

Time after time, I had to take a walk and go remind myself just what the hell I was putting myself through. _"Who enjoys this?"_ I bet you had to be wired different. For Satan's sake, I was just following a game development manual. I wasn't even building my own thing.

![A torch illuminarting ancient symbols on a dungeon wall.](/assets/images/indy-torch.webp){ optimize width=500 }

Progress was slow and following manuals was tedious. `function`, `static`, `plumbus`, `class`, `object`, `bloober`, `walpurg`, it was all fucking voodoo to me.

Bit by bit, I put the jigsaw together. One of discipline, another of obedience, and before long I had a prototype. It was a clone of [Space Invaders](https://en.wikipedia.org/wiki/Space_Invaders), with enemy ships and lasers and power ups. The physics were simple. Your ship moves sideways, evade and shoot. Lose a point if the enemy touches you. Win one if you shoot them down. Lose three lives and you're toast. All very standard.
