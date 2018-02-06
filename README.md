## Introduction

* my app  [PrettyPrint](my-extension/PrettyPrint)
* [chrome-extension-samples](chrome-extension-samples): fork from https://developer.chrome.com/extensions/samples
* [chrome-app-samples](chrome-app-samples): fork from fork from https://github.com/GoogleChrome/chrome-app-samples

* Chrome Webstore: popular apps in webstore


## Chrome DevTools Tips and Tricks

- https://tutorialzine.com/2015/03/15-must-know-chrome-devtools-tips-tricks



## TODO

* proxy switch.
* 惠惠购物助手
* lastpass
* zotero ext. It may call a zotero api
* wiznote ext. It may call a wiznote api
- password hash 可以在浏览器插件中，也可以网站提供的service比如谷歌app。不需要，直接找个hashonline网站就行
- Infinity: add news, 订阅，AI相关，微信公众号订阅，
- qq wechat bot
- [360抢票](chrome-webstore/extensions/360抢票%20piao_5.3.0.15)
- chrono download manager

- 给百度地图添加工具，地图二次开发。基于页面、基于百度api。比如链家 我爱我家的地图搜房。

## Q&A

### 权限 & 安全策略 & 执行环境

0. html页面(主要指js，不指后台)、页面的DOM、chrome.tab、chrome.windows、
1. chrome app 应用
2. extension 扩展
	2.1 extension
	2.3 Content script是在一个特殊环境中运行的，这个环境成为isolated world（隔离环境）
3. plugin 插件
4. 内核


权限: 3>2>1>0

* 0的ajax访问受限于同源策略，1,2,3不受限。

    * 浏览器（Webkit内核）的安全策略决定了file协议访问的应用无法使用XMLHttpRequest对象
    *
* app
* content scripts权限 = (0 - 页面js) + chrome.extension接口
* extension权限: 多了很多api，可跨域请求(即可以cross-site XMLHttpRequests)
* plugin



### how to excute command in current tab?

	chrome.tabs.executeScript(

### How to debug background exApp?

1. goto chrome://extensions/
2. click "background page" in your ExApp


### How to debug a injected JS file?

	// in main.js
	chrome.tabs.executeScript(null,{file:"js/content.js"});

	// content.js
	console.log("hello stackoverflow");

**solution**

	// Use the debugger keyword. This is like inserting a breakpoint into your JS code
	debugger;



## chrome url

chrome://components/
chrome://flags/ 实验性特征


## reference


## chrome vs firefox

### chrome多进程

Windows是鼓励“多线程，少进程”，为什么主流浏览器只有chrome选择了多进程呢？

简单的说，chrome是一个用内存换速度的浏览器。

* a main process,
* a GPU renderer process
* a single process for every tab, extension and plugin

**优势**：
1.隔离。每个tab，每个插件都会启动一个进程，这样即使因为某个页面崩溃了也不会影响其他页面，而firefox经常，整个崩掉。（因为各种插件，html和js都是规则比较松散的，任凭浏览器如何强大总会有更多奇怪的东西需要解析和兼容，不可能完全避免崩溃）
2. 速度

**劣势**：
1.如果开启的页面很多，因为大量进程的存在会导致大量资源消耗。

**其他**
因为进程间的通信比线程更加复杂，chrome会有一个主进程去控制协调各个tab和各个插件间的进程。
