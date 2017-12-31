
## Chrome 扩展（Extension）VS 应用（App） VS 主题 VS 游戏
** 共同点：**
* 都在*https://chrome.google.com/webstore*中下载

** 不同点 **
chrome://extensions/
chrome://apps/  app和game都在该目录

有些app格式是crx
有些游戏格式是crx

** 出发点不同 **
Apps 通常具备独立的用户界面，并且具备典型且丰富的用户互动，更大程度上是一个具备互动性的东东。Google 的目的也是希望 Web Apps 能够像安装在你电脑中的软件一样具备互动性。

　而扩展的作用主要是丰富浏览器或网站的功能，而不是像 Web Apps 一样属于某个网站的专用产品或者说不具备独立性。相对于 Web Apps 来说，扩展程序适用于网站以及 Web Apps ，一般来说适用于所有网站，但 Apps 不具备该特性，它们是独立的，就像一个传统的网站或者应用程序。

** 收费 & 开源 **
有些 Apps 是需要银子的，而扩展则全都是免费的
extensioin和app都开源吧，但是可以采用调用远程服务的方式收费。

** 打包方式 & 发布 **

** api权限 **

** 登录google账号



flash player肯定不是extension，是plugin，算app吗？
估计不算app，plugin最底层，extension和app都是应用层的。

https://gxnotes.com/article/176036.html




## Chrome 扩展（Extension）VS 插件（Plugin）

* 扩展（Extension），指的是通过调用 Chrome 提供的 Chrome API 来扩展浏览器功能的一种组件，工作在浏览器层面，使用 HTML + Javascript 语言开发[*]。比如著名的 Adblock plus。
* 插件（Plug-in），指的是通过调用 Webkit 内核 NPAPI 来扩展内核功能的一种组件，工作在内核层面，理论上可以用任何一种生成本地二进制程序的语言开发，比如 C/C++、Delphi 等。比如Flash player 插件，就属于这种类型。一般在网页中用 <object> 或者 <embed> 标签声明的部分，就要靠插件来渲染。


* 插件管理页：chrome://plugins/，扩展管理页：chrome://extensions/。
chrome://plugins was removed in Chrome version 57. goto chrome://components/ and chrome://settings/content
* plugin 是偏底层的应用。extension 则偏上层。
* 如果把浏览器比作操作系统，扩展就好比工具类应用程序，插件则好比驱动程序。
* .crx是扩展，.exe是插件
* 扩展是在游览器原有功能上进行开发，插件是添加新的功能（比如flash）

