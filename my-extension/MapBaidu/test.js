
var canvas = $("canvas")[0];
var gl = canvas.getContext('webgl');

gl.clearColor(0,0,0,1); // 红、绿、蓝和透明度。
gl.clear(gl.COLOR_BUFFER_BIT); // 以上代码把清理颜色缓冲区的值设置为黑色
