---
layout: layouts/post.vto
title: Phantom In The Machine
date: 2023-07-09
pinned: true
gif: /assets/images/phantom-pc.gif
tags:
  - programming
  - computers
  - algorithms
beta: true
type: weblog
---

![A computer chip](/assets/images/phantom-pc.gif){ optimize width=500 fetchpriority="high" }

The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly. A programmer is ideally an essayist who works with traditional aesthetic and literary forms as well as mathematical concepts, to communicate the way that an algorithm works and to convince a reader that the results will be correct.

The process of preparing programs for a digital computer is especially attractive, not only because it can be economically and scientifically rewarding, but also because it can be an aesthetic experience much like composing poetry or music. In fact, my experiences as I was writing the 3:16 book weren't that different from writing computer books, although I wasn't using integral signs as much.

```typescript
import { Phantom } from "phantom";

const phantom = new Phantom();

(async () => {
  const page = await phantom.createPage();
  await page.on("onResourceRequested", function (requestData) {
    console.info("Requesting", requestData.url);
  });

  const status = await page.open("https://www.google.com");
  console.log("Status:", status);

  const content = await page.property("content");
  console.log("Content:", content);

  await phantom.exit();
})();
```

Overstimulation has been the real drawback. I need to find ways to stop thinking about analysis of algorithms, in order to do various other things that human beings ought to do. I've got this mad urge to get up before a class and present our results: Theorem, proof, lemma, remark. I'd make it so slick nobody would be able to guess how we did it, and everyone would be so impressed.
