"use strict";
(function(a) {
    a.sendMessage = function(b, c) {
        if (typeof(chrome.extension.sendMessage) === "function") {
            a.sendMessage = function(d, e) {
                chrome.extension.sendMessage(d, e)
            }
        } else {
            if (typeof(chrome.extension.sendRequest) === "function") {
                a.sendMessage = function(d, e) {
                    chrome.extension.sendRequest(d, e)
                }
            }
        }
        a.sendMessage(b, c)
    };
    a.sendMessage({
        type: "getServerConfig"
    }, function(b) {
        console.log(b)
    })
})({});