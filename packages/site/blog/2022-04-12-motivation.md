---
slug: motivation
title: Motivation
authors: mrchantey
tags: [assemblyscript]
---
Partly to clarify my own thoughts I'd like to lay out the reasons for developing Koora.

My career started in game development and has shifted to the web, and in terms of platform targets I see myself as married to the browser. The main reason is that, especially for indie game developers, the problem of sharing your work is so much bigger than the issue of whether it has that extra performance boost that native development brings.
<!--truncate-->
All this said, as someone who is used to making games in more 'disciplined' languages like C# or C++, JavaScript can be a bit of a jump. I could list some technical considerations about the differences but honestly for me it is a *feeling* of just being a little too far from the metal. To some degree TypeScript and ES6 Classes have helped us get back that feeling, but at the end of the day a JavaScript `number` is still a JavaScript `number`. I never thought I'd say this, but I miss my integer division bugs!

And this brings us to Web Assembly, the dream-come-true target for indie developers with the portability of the web and the predictability of static typing. All that's left is to pick a language. Not wanting to revisit the build systems and foot guns of C++, and knowing nothing about Rust, a TypeScript-Like language directly targeting WebAssembly seemed the perfect choice.

And so here we are, building a game framework in AssemblyScript. The first target is WebGL2, but I am interested in other targets. Being a long-time Arduino hacker I hope to one day get a port of the library working with some sensor-based games through technology like [wasm3](https://github.com/wasm3/wasm3), that could be a lot of fun.