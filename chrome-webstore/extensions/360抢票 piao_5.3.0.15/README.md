





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

- 从某个版本开始，360浏览器已经关掉了开发者模式(即F12 debug)
- 但是其采用的是Webkit内核(与chrome一样)，因此可以把插件导入到chrome中，就可以自由debug了


## 源码分析
