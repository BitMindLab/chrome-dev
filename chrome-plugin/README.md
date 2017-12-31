
## Introduction

- 在Chromium中，除了可以使用Extension增强浏览器功能，还可以使用Plugin。两者最大区别是前者用JS开发，后者用C/C++开发。这意味着Plugin以Native Code运行，在性能上要优于Extension，适合执行计算密集型工作。不过，以Native Code运行，使得Plugin在安全上面临更大挑战。

- Chromium最初支持两种类型的Plugin：NPAPI Plugin和PPAPI Plugin。两者的区别在于使用了不同的API规范。其中，NPAPI来自于Mozilla，而PPAPI来自于Google。