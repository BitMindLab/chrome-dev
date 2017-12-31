/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */

 /**
  * 使用 chrome.app.runtime API 管理应用的生命周期。
  * 应用运行时环境管理应用的安装，控制事件页面，并且可以在任何时候关闭应用。 
  * onLaunched 应用启动时触发。通过Chrome://apps中点击相应app，或者在chrome://extensions 中点击launch
  * onRestarted 当 Chrome 浏览器启动时产生，用于 Chrome 浏览器上一次关闭时正在运行的应用。
  * onLaunched 事件将会在用户启动应用时产生，接着它立刻为应用打开一个指定宽度与高度的窗口。
  */
chrome.app.runtime.onLaunched.addListener(function() {
  // Center window on screen.
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;
  var width = 500;
  var height = 300;

  // 与chrome.windows.create 什么区别？
  chrome.app.window.create('index.html', {
    id: "helloWorldID",
    outerBounds: {
      width: width,
      height: height,
      left: Math.round((screenWidth-width)/2),
      top: Math.round((screenHeight-height)/2)
    }
  });
});
