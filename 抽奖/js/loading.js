//获取浏览器页面可见高度和宽度
var _PageHeight = document.documentElement.clientHeight/100,
    _PageWidth = document.documentElement.clientWidth/100;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
var _LoadingTop = _PageHeight > 61/100 ? (_PageHeight - 61/100) / 2/100 : 0,
    _LoadingLeft = _PageWidth > 215/100 ? (_PageWidth - 215/100) / 2/100 : 0;
//在页面未加载完毕之前显示的loading Html自定义内容
//<div id="loadingDiv" 
//style="position:absolute;left:0;width:100%;height:'
//+ ${_PageHeight}+ 'rem;top:0;background:#f3f8ff;opacity:1;
//filter:alpha(opacity=80);z-index:10000;">
//<div style="position: absolute; cursor1: wait; left: ' 
//+${_LoadingLeft}+ 'rem; top:' + ${_LoadingTop}+ 'rem; 
//width: auto; height: 0.57rem; line-height: 0.57rem;
//padding-left: 0.50rem; padding-right: 0.05rem; 
//background: #fff url(image/dd.png) 
//no-repeat scroll 0.05rem 0.10rem; border: 0.02rem solid #95B8E7;
//color: #696969; font-family:\'Microsoft YaHei\';">页面加载中，请等待...</div></div>
var _LoadingHtml = `<div id="loadingDiv"><div id='loading'>页面加载中，请等待...</div></div>`;

//呈现loading效果
document.write(_LoadingHtml);
//window.onload = function () {
//    var loadingMask = document.getElementById('loadingDiv');
//    loadingMask.parentNode.removeChild(loadingMask);
//};
//监听加载状态改变
document.onreadystatechange = completeLoading;
//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        var loadingMask = document.getElementById('loadingDiv');
        loadingMask.parentNode.removeChild(loadingMask);
    }
}
