

## 综述

目前12306已经提供**自动查询**、**提醒**、**自动提交**功能，360插件貌似已经没有任何优势了




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
  - 但是其采用的是Webkit内核(与chrome一样)，因此可以把插件导入到chrome中。（严格讲，360采用的双核，默认使用chrome内核，在用网银之类会自动切换的ie兼容模式）

- 导入插件到chrome
  - 解压crx (用7zip或者zip),
  - 在chrome地址栏输入 chrome://extensions/
  - 单击 load unpacked extension，选择插件的目录。
  - 导入结束
- 开始调试
  - 在chrome中，打开抢票主页 http://pc.huochepiao.360.cn/
  - 正常刷票，购票。可在js中设置断点，调试
  - 关于chrome 插件调试，移步至[360doc](http://open.chrome.360.cn/extension_dev/overview.html) 或官方doc

## 常见错误

>无法添加来自此网站的应用、扩展程序和用户脚本

crx不是来自chrome web store，默认不支持。因此需要解压，导入解压后的目录作为插件

> not from Chrome Web Store

同上



## 抢票原理

TODO

## 源码分析

目录

```python

piao ┬───css───...
     ├─images──...
     ├─js─┬─ticket_bg.min.js     # as bg script
     │    ├─ticket_conent_cross.min.js  # as content_scripts
     │    ├─ticket_conent_helper.min.js
     │    ├─ticket_conent_inject.js
     │    ├─ticket_conent_otn.min.js
     │    ├─ticket_conent.min.js
     │    └─ticket_pop.min.js   # as pop script
     ├lib─┬─base64.min.js
     │    └─...
     ├─plugin───helper.dull
     └─manifest.json

```

manifest.json
```python
"content_scripts": [
  {
    "all_frames": true,
    "js": [
      "lib/jquery.js",
      "lib/jquery_pack.js",
      "lib/md5.js",
      "js/ticket_content_otn.min.js"
    ],
    "matches": [ "*://*.12306.cn/otn/*"],
    "run_at": "document_end"
  },
  {
    "all_frames": false,
    "js": [
      "js/ticket_content_helper.js"
    ],
    "matches": ["http://12306.360.cn/*"], # 这个网页
    "run_at": "document_start"
  },
  {
    "all_frames": false,
    "js": [
      "lib/jquery.js",
      "js/ticket_content_cross.min.js"
    ],
    "matches": ["http://*.huochepiao.360.cn/*","http://p.360.cn/*","https://lxqp.360.cn/*","http://huijia.corp.qihoo.net/*","http://*.12306.360.cn/*","http://se.360.cn/*"],
    "run_at": "document_start"
  }
]
...
"plugins": [
  {
    "path": "plugin/helper.dll"
  }
]

```


extension环境：
- ticket_bg.html
- ticket_bg.min.js  # 由ticket_bg.html加载


content-script环境：

- 对于http://pc.huochepiao.360.cn/
  - ticket_content_cross.min.js
  -
- 对于http://12306.360.cn/
  - ticket_content_helper.js
  - ..
- 对于https://kyfw.12306.cn/otn
  -..


## 主要的12306 api

- 登录：
  - https://kyfw.12306.cn/otn/login/userLogin
  -
- 查询余票：
  - 初始化 https://kyfw.12306.cn/otn/leftTicket/init
  - 点击查询 https://kyfw.12306.cn/otn/leftTicket/queryZ
  - https://kyfw.12306.cn/otn/leftTicket/log
- 购票：




## 按个人需求定制
- 设置短信、邮件、微信提醒
- 自动改签
- 添加验证码识别模块
