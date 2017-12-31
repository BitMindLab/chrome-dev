## from

these version is the packed version, get from chrome install papth.

文件好多好复杂。github也好复杂，为什么还需要编译？还需要后台？需要用到java python c？

## github

https://github.com/adblockplus/adblockpluschrome


## 工作原理


监听入口：



Adblock Plus has two mechanisms, to block content on websites:

*Element hiding*: A CSS snippet is injected in the website, to hide elements that are supposed to be blocked. That way the ads are completely removed from the rendered page, so that the areas otherwise used for ads will now be used for the actual content of the web page, and even content that is part of the web page itself (like text ads) can be blocked. However this doesn't prevent resources from loading in the first place.

*Request blocking*: HTTP requests for retrieving resources that are supposed to be blocked will be prevented from loading. This will make the page load faster, reduce traffic, and even enables blocking content that is loaded from within Flash, like the video ads on YouTube.

Both, the elements to hide on given websites, and the URLs to block, are controlled by filter lists. By default Adblock Plus will use EasyList. But you are free to setup your own filter rules or configure other filter lists.



## filter目录
针对特定于网站的广告过滤规则。


## Q&A

* 是中断的访问，还是访问ad后删除的html element？

* 要对每个http请求都过滤一遍，太慢了吧？怎么做到的效率？

## reference
https://adblockplus.org/en/faq_internal