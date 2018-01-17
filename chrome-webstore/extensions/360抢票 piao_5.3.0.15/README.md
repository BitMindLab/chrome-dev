





## 如何获取360抢票插件源码？


### 方式一: 在线下载
1. 下载360抢票浏览器，并打开
1. 进入360应用市场 https://ext.se.360.cn/webstore/home
1. 点击抢票王，并查看版本。 (当前版本为5.3.0.15)
1. 查看源码，并搜索5.3.0.15。可以看到 https:\/\/download.se.360.cn\/ext\/piao_5.3.0.15.crx
1. 下载插件(解压即源码)



### 方式二：本地拷贝
1. 下载360抢票浏览器
1. 地址栏输入：se://settings/advance
1. 查看缓存目录，默认是 C:\Users\Administrator\AppData\Roaming\360se6\User Data\Default\
1. 进入缓存目录中的 Extensions子目录，有个就是抢票王插件


## 如何调试(debug)

- 360浏览器不能debug怎么办？
  - 从某个版本开始，360浏览器已经关掉了开发者模式(即F12 debug)
  - 但是其采用的是Webkit内核(与chrome一样)，因此可以把插件导入到chrome中

- 导入插件到chrome
  - 解压crx (用7zip或者zip),
  - 在chrome地址栏输入 chrome://extensions/
  - 单击 load unpacked extension，选择插件的目录。
  - 导入结束
- 开始调试
  - 进入抢票主页 http://pc.huochepiao.360.cn/
  - 正常刷票，购票。可在js中设置断点，调试


## 常见错误

>无法添加来自此网站的应用、扩展程序和用户脚本

crx不是来自chrome web store，默认不支持。因此需要解压，导入解压后的目录作为插件

> not from Chrome Web Store

同上

## 源码分析
