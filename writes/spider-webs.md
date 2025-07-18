---
title: spider webs
date: 2025-01-23
---

In 2015, hackers broke into three Ukrainian power companies. They took control of the [SCADA](https://en.wikipedia.org/wiki/SCADA) systems and turned off breakers at 30 substations, cutting power to one quarter of a million people for up to six hours. They also killed backup power to the control center and attacked call centers so people couldn't report outages.

Six hours without electricity meant homes went dark and cold in the dead of winter. No heating systems. No refrigeration. No traffic lights. Hospital emergency generators kicked in, but smaller clinics went dark. Cell towers drained their backup batteries. ATMs stopped working. Credit card readers at stores shut down. Water pumps failed. People were trapped in elevators. And worst of all, they had no idea what happened or when power would return.

In the past few years, power grids, water systems, and fuel systems are being woven together through the cloud.

But networks break in unusual ways. Small local problems can spread across the whole system. Networks act unpredictably when parts fail and create unexpected connections. They can be damaged if someone hits the important nodes, causing major damage from one small hit. Feedback loops make the system unstable. And there's hidden connections where systems that seem separate fail together (as a programmer, I see this all the time).

In graph theory, we call these high-tension connection points [centrality nodes](https://en.wikipedia.org/wiki/Centrality). They're like the officer handling traffic at a busy intersection. Take it down, and everything dies. Our energy infrastructure networks share the same vulnerability as distributed computing systems. The point is that the same race conditions, deadlocks, and memory leaks that crash software now threaten physical systems. 

I was with my manager Dan at the pub once talking about this. At one point he held up his phone and said, "This could cause a terror attack." He had admin access to our cloud infrastructure that controlled almost 6GW of energy resources. Our company managed over 500,000 devices. Batteries, solar panels, wind turbines, and power plants. 

Ever seen a spider web catch fire?
