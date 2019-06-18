$(function () {
// 生成一个随机数1~100
var num = Math.floor(Math.random() * 100);
// 定义一个字符串,也就是要添加的类名
var str = '';
// 计算概率
if (num <= 50) {
// num<=50表示有50%的概率抽到10元
str = 'jl10'
}else if (num < 71 ) {
// num->51~70,概率为20%
str = 'jl20'
} else if (num < 86) {
str = 'jl50'
}else if (num < 95) {
str = 'jl100'
} else if (num < 99) {
str = 'jl200'
}else if(num <= 100){
str = 'jl500'
}

setTimeout(function () {
// 页面加载2s后.添加类名,开始抽奖
$('.two').addClass(str);
},200)

setTimeout(function () {
// 页面加载2s后.添加类名,开始抽奖
$('.one').addClass(str);
},200)

})