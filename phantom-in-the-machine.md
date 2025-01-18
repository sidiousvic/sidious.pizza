---
layout: layouts/post.vto
title: Phantom In The Machine
date: 2023-07-09
pinned: true
gif: /assets/images/phantom-pc.gif
tags:
  - programming
  - computers
beta: true
type: weblog
---

![A computer chip](/assets/images/phantom-pc.gif){ optimize width=500 fetchpriority="high" }

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
