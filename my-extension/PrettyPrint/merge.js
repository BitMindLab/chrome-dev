


UrlSelector = {
	"help.github.com":".km-article-link", // $(".km-article-link")[0].href
	"en.wikipedia.org":["navbox"]
}


MergeElement = {
	"help.github.com":["navbox"],
	"en.wikipedia.org":["navbox"]
}




function getUrlList() {
	var urlList = [];
	var urlSelector = UrlSelector[window.location.host];
	if(urlSelector!=undefined) {
		for(var i=0; i<$(urlSelector).length; i++) {
			urlList.push($(urlSelector)[i].href);
		}
	}
	return urlList;
}


// 异步调用，
function httpRequest(callback) {

	var stocks = localStorage.stocks || 'sh000001';
	var url = 'http://hq.sinajs.cn/list=' + stocks;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

// 同步调用，XMLHttpRequest
function XHRRequest() {
	// request page
	var xhr = new XMLHttpRequest();
	//xhr.open("get", "example.txt", false);

	// get element
}

// 同步调用，jquery




// 
function merge() {

	// 1. get url list
	var urlList = getUrlList();

	// 2. http request
	var elementlList = [];  
	for(var i=0; i<urlList.length; i++) {
		var html = $.ajax({
		  url: urlList[i]+"/",
		  async: false
		}).responseText;
		//var parser = new DOMParser()
  		//var doc = parser.parseFromString(html, "text/xml");
  		//var element = doc.getElementsByClassName("article");
  		var doc = $(html);
  		var article = $(".article", $(html))[0].outerHTML;
  		var banner = $(".breadcrumbs", $(html))[0].outerHTML;
		elementlList.push(banner+article);
	}

	// 3. merge elements into one page
	$(".article").remove();
	var allPage = elementlList.join("");
	$(".chevron")[0].innerHTML = allPage;



}

