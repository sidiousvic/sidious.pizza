---
layout: layouts/post.vto
title: Fa = k(Fo)
date: 2023-01-26
weblog: true
goodbye: ...Fa with care!
tags:
  - life
---

With the help of a Finnish friend and fellow mathematics enthusiast, I've derived an algebraic formula that might prove useful to those wanting to find out.

![A T-Rex chasing a caveman who was fucking about](/assets/images/fa-equals-k-fo.webp){ optimize width=800 fetchpriority="high" caption="The more you fuck about, the more you find out" }

Let `Fa` be amount you fuck about, and `Fo` how much you do find out. We specify _a priori_ that a direct linear relationship exists between fucking about and finding out. This relationship can be represented in a simple, yet elegant equation, as follows.

```math

Fa = k(Fo)

```

Where `k` is a constant of proportionality that represents the _efficiency_ of fucking about in terms of generating _`(k)`onsequences_ and thus gained experience, or things found out.

```bash

Fa (Fucking about)

 9 ·         ✧ 9 = (0.6)15
   ·        /
   ·       /
 6 ·      /
   ·     /     k = 0.6
   ·    /
 3 ·   /
   ·  /
   · /
   + · · · · · · · · · · · · · > Fo (Finding out)
 0       9     18     ...

```

Therefore we have a way to solve for how much we need to fuck about in order to find out.

## A slight impediment

Unfortunately, it has also been proven that certain inconvenient initial conditions such as being dead result in the amount of finding out (`Fo`) collapsing to `undefined`.

Moreover, one may fuck about in a way by which the numerical value of `Fa` trangresses a limit which represents a state of [pining for the fjords](https://www.youtube.com/watch?v=4vuW6tQ0218).

It is imperative then to incorporate into the formula a limit to account for a scenario where excessive fucking about (denoted as `Fmax`) results in the mildly annoying eventuality of death.

The modified formula is as follows,

```math

Fa = \left\{~Fo<m:kFo,~Fo>=Fmax:undefined~\right\}

```

...where _`k⋅Fo`_ is the formula for knowledge gained from fucking about, _`1{Fo < Fmax}`_ is an indicator function that equals 1 when `Fa` is less than `Fmax` and `undefined` otherwise, and _`undefined⋅1{Fo >= Fmax}`_ is an indicator function that equals `undefined` when `F` is greater than or equal to `Fmax`, effectively bringing `Fo` to an incomputable-value.

```bash

Fa (Fucking about)

 9 ·
   ·                             k = 0.6
 6 ·     ✧ 5.394 = 0.6(8.99)     Fmax = 9
   ·    /
 3 ·   /
   ·  /    undefined
   · /    ↓
   + · · · · · · · · · · · · > Fo (Finding out)
 0       9     18    ...

```

Thus, when `Fa < Fmax` the amount of finding out is directly proportional to `F`. When `Fa` reaches or exceeds `Fmax`, well, shit.

This piecewise function demonstrates that while the fucking about generally leads to increased finding out, _there is a crucial limit beyond which it becomes counterproductive to fuck about_.

![A T-Rex with a full belly](/assets/images/belly-full.webp){ optimize width=800 fetchpriority="high" caption="Be careful" }

This is a useful by means of which we can compute the optimal amount of finding out, provided we are able to predict `k` and `Fmax` with any degree of practical accuracy (a bit of a pain in the a`$$`).

<!-- ## Computing k and Fmax -->

Thanks to Ville, my dear snowman pal and collaborator in this research. Stay tuned for more, and remember...
