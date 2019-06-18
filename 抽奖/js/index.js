mui.init();

var app = new Vue({
	el: '#app',
	data: {
		shouye:true,
		isShow: false,
		zj_bg:false,
		zj_leibie:'500金币',
		tk_tishi:false,
		//login:false,
		index:0,
		isClick:true,
	},

	mounted(){
		//console.log('你好')
		var that=this
	$.ajax({
		type:"post",
		url:"http://yl.uplsd.com/api/get_rem_times",
		datatype:'jsonp',
		data:'',
		success:function(res){
			//console.log('qweqrr',res)
			if(res.code==90011){
				that.index=res.times
			}
		},
	});
	},
	methods: {
		//点击抽奖按钮

	dj_choujiang(e){
	if(this.isClick) {
	this.isClick = false;
	//事件
	//console.log('data-id',e)
	var that=this
	$.ajax({
		type:"post",
		url:"http://yl.uplsd.com/api/luck_draw",
		datatype:'jsonp',
		data:'',
		success:function(res){
			console.log(123456,res)
			//未登录，转盘不旋转，弹出登录框
			 if(res.code==90007){
				//that.login=true
				var zhezhao = document.getElementById("zhezhao");
				var login = document.getElementById("login");
				var bt = document.getElementById("bt");
				var btclose = document.getElementById("btclose");
				zhezhao.style.display = "block";
				login.style.display = "block";
				zhezhao.style.zIndex = 1000;
				login.style.zIndex = 1500;
				btclose.addEventListener('click',function(){
					zhezhao.style.display = "none";
					login.style.display = "none";
					zhezhao.style.zIndex = 0;
					login.style.zIndex = 0;
				});
			//中奖次数已达上限，弹出警告，没有抽奖次数
			}else  if(res.code==90010){
				console.log('你的抽奖次数已经用完')
//						alert('你的抽奖次数已经用完');
				var twoyuan = document.getElementById('twoyuan')
				//var that=this
//						twoyuan.addEventListener('click', function(e) {
					//通过ajax获取是否能继续抽奖判断再进行抽奖转盘操作问题
					
//							var v=2
//							if(v<3){
//							zd();
//							zj_tk
//							}else if(v>3){
						e.stopPropagation();
						clearInterval(zj_tk)
						var tk_tishi=document.querySelector('.tk_tishi')
						var ts=document.querySelector('.ts_content')
						ts.innerHTML=`<h4>你的抽奖次数已达上限</h4>
										<h4>下次再继续吧！</h4>`
						//tk_tishi.style.display='block'
						that.tk_tishi=true
						
						document.getElementById('tk').addEventListener('click',function(){
							that.tk_tishi=false;
							tk_tishi.style.display='none';
							ts.innerHTML='';
								});
							//};
							
//								},false);
						
			//登录了，转盘旋转，返回抽中奖品	
			}else if(res.code==90009){
				var twoyuan = document.getElementById('twoyuan')
				
//						twoyuan.addEventListener('click', function(e) {
				var zhezhao = document.getElementById("zhezhao");
				var login = document.getElementById("login");
				var zj_tankuang = document.querySelector('.zj_tankuang')
				var zj_text = document.querySelector('.zj_text')

				//隐藏登录验证页面
				zhezhao.style.display = "none";
				login.style.display = "none";
				//2转盘开始转动？？？？
				zd();
				//ajax请求获取中奖档次
				that.zj_leibie=res.msg
				that.index=res.times
				//3弹出中奖弹框
				 zj_tk= setInterval(function() {
					zj_tankuang.style.zIndex = 2000
					zj_text.style.zIndex = 2500
					that.isShow = true
				}, 3000);
					

				
			};
			
			
			
			
		},
	});
	
	
///////////			console.log($(this).attr("data-val"));
	//定时器
	setTimeout(function() {
		that.isClick = true;
	}, 3500);//一秒内不能重复点击
}
			
			
		},
		
		//验证手机格式，并发送到后台做基础验证
		dj_huoque() {
			
			 ph_value = $('#ph_num').val().replace(/\s*/g, '')
			 yz_value=$('#ym').val().replace(/\s*/g, '')
			 new_p = document.querySelector('.ph_tishi')

			console.log('电话',ph_value)
			console.log('验证码',yz_value)
				//				var regu = '/^[1][0-9][0-9]{9}$/'; 
			if(new_p) {
				new_p.parentNode.removeChild(new_p)
			}

			if(!(/^[1][0-9][0-9]{9}$/.test(ph_value))) {
				var phon_num = document.querySelector('.phon_num')
				var newdiv = document.createElement('p')

				//错误提示
				newdiv.className = 'ph_tishi'
				newdiv.innerHTML = '输入号码有误，请重新输入'
				phon_num.appendChild(newdiv)
				//console.log("手机号码有误，请重填")
			} else {

				
				//通过ajax发送账号数据给后台，不存在的用户给一个友好提示
				$.ajax({
				type:"post",
				url:"http://yl.uplsd.com/api/get_code",
				datatype:'jsonp',
				data:{'phone':ph_value},
				success:function(res){
					//console.log('你好是否获取到手机号',res)
					var new_p = document.querySelector('.ph_tishi')
						if(new_p) {
							new_p.parentNode.removeChild(new_p)
						}
						if(res.status==false){
							var phon_num = document.querySelector('.phon_num')
							var newdiv = document.createElement('p')
							newdiv.className = 'ph_tishi'
							newdiv.innerHTML = res.msg
							phon_num.appendChild(newdiv)
						}else{
							//获取验证倒计时
							var daojishi = $('.daojishi')
							var time = 60;
							var timend = setInterval(function() {
								if(time == 0) {
									clearInterval(timend);
									daojishi.val('重新获取')
								} else {
									daojishi.val(time + 's后重试')
									time--;
								}
							}, 1000);
							//使得两个按钮颜色转变
						$('#yz').toggleClass('ph_success')
					    //$('#lg').toggleClass('yz_success')
				
				document.getElementById('yz').addEventListener('click',function(e){
					e.stopPropagation();
					clearInterval(timend);
				},false);
				
						};
						
				},
					
					
				});
			
				
				
	
				
			
			};
			//监听登录事件
//			document.getElementById('lg').addEventListener('click',function(){
//				
//			});

		},
	
		//点击验证按钮
		lj_yanzheng() {
			//console.log('测试是否')
			//通过ajax将电话号码传至后端基础验证，，，，，看是否能通过验证
			//console.log('登录')
			var ph_value = $('#ph_num').val().replace(/\s*/g, '')
			var  yz_value=$('#ym').val().replace(/\s*/g, '')
			var that = this
			//先验证输入框是否有空如果有返回信息
				console.log(ph_value)
				var new_p = document.querySelector('.ph_tishi')
					if(new_p) {
						new_p.parentNode.removeChild(new_p)
					}
				if(ph_value==''||yz_value==''){
							var phon_num = document.querySelector('.phon_num')
							var newdiv = document.createElement('p')
							newdiv.className = 'ph_tishi'
							newdiv.innerHTML = '你输入的信息有误！'
							phon_num.appendChild(newdiv)
				}else{
					var new_p = document.querySelector('.ph_tishi')
					if(new_p) {
						new_p.parentNode.removeChild(new_p)
					}
				}
				var phyz={
					'phone':ph_value,
					'sms_code':yz_value,
				}
				//点击立即验证向后台发送数据，并检验是否合格
				$.ajax({
				type:"post",
				url:"http://yl.uplsd.com/api/login",
				datatype:'jsonp',
				data:phyz,
				success:function(res){
					var new_p = document.querySelector('.ph_tishi')
					if(new_p) {
						new_p.parentNode.removeChild(new_p)
					}
					//console.log('你好该手机号是否能登陆',res)
					if(res.status==false){
						var phon_num = document.querySelector('.phon_num')
							var newdiv = document.createElement('p')
							newdiv.className = 'ph_tishi'
							newdiv.innerHTML = res.msg
							phon_num.appendChild(newdiv)
							var zhezhao = document.getElementById("zhezhao");
							var login = document.getElementById("login");
							zhezhao.style.display = "block";
							login.style.display = "block";
							
					}else{
						//1验证成功后执行如下？？？
						var zhezhao = document.getElementById("zhezhao");
						var login = document.getElementById("login");
						zhezhao.style.display = "none";
						login.style.display = "none";
						that.index=res.times

					}
						
					},
				});
			

			
			//验证之后才能有我的中奖记录
			var jl=document.querySelector('.jl')
			jl.addEventListener('click',function(e){
				e.stopPropagation();
				that.shouye=false;
			var zj_jilu=document.querySelector('.zj_jilu');
			zj_jilu.style.zIndex=3000;
			that.zj_bg=true;
			
			
			var zjlv_txt=document.getElementById('zjlv_txt')
			zjlv_txt.style.display='block'
			
			var back2=document.getElementById('back2');
			var zj_my=document.getElementById('zj_my');
			var zj_md=document.getElementById('zj_md');
			//控制zindex的
			var hz_bg=document.querySelector('.hz_bg')
			var hz=document.querySelector('.hz')
			hz_bg.style.zIndex=10
			hz.style.zIndex=20

			});
			
			
		},
		//点击领取,关闭中奖页面,是否要通过ajax进行后台通告???
		lianqu(e) {
			var that=this
			this.isShow = false
			var twoyuan = document.getElementById('twoyuan')
				clearInterval(zj_tk)		
			twoyuan.addEventListener('click', function(e) {
			
			if(that.index==0){
				e.stopPropagation();
				var tk_tishi=document.querySelector('.tk_tishi')
				var ts=document.querySelector('.ts_content')
				ts.innerHTML=`<h4>你的抽奖次数已达上限</h4>
								<h4>下次再继续吧！</h4>`
				//tk_tishi.style.display='block'
				that.tk_tishi=true
				
				document.getElementById('tk').addEventListener('click',function(){
					that.tk_tishi=false;
					tk_tishi.style.display='none';
					ts.innerHTML='';
						});
			}

			},false)
			
					//clearInterval(zj_tk)
			
		},
		//点击中奖记录
		zhongjiang_jlu(){
			var zj_jilu=document.querySelector('.zj_jilu');
			zj_jilu.style.zIndex=3000;
			this.zj_bg=true;
			var back2=document.getElementById('back2');
			var zj_my=document.getElementById('zj_my');
			var zj_md=document.getElementById('zj_md');
			//控制zindex的
			var hz_bg=document.querySelector('.hz_bg')
			var hz=document.querySelector('.hz')
			//让中奖记录显示
			
			var zjlv_txt=document.getElementById('zjlv_txt')
			zjlv_txt.style.display='block'
			hz_bg.style.zIndex=10
			hz.style.zIndex=20
			this.shouye=false
			var that=this
			console.log('中将记录')
			/* $.ajax({
				type:"get",
				url:"http://yl.uplsd.com/api/get_result/all",
				 data:'', 
				success:function(res){
				//获取对象里的多个对象
				var all_lists=''
				for(var i in res.data){
					//console.log(i)
						//console.log(res.data[i].phone,res.data[i].result_described,res.data[i].create_time)
				var all_list=`
						<div class="txtcontent">
		                            <div class="phnum">${res.data[i].phone}</div>
		                            <div class="leibie">${res.data[i].result_described}</div>
		                            <div class="time">${res.data[i].create_time}</div>
		                        </div>
						`
				all_lists+=all_list
				};
				$('#zjlv_txt').html(all_lists)		
				},
	
				}); */
				$.ajax({
				type:"get",
				url:"http://yl.uplsd.com/api/get_result/my",
				 //dataType: "jsonp",
				 data:'', 
				success:function(res){
					//console.log(123,res.code==90007)
					
					if(res.code==90007){
						//console.log('你还未登录')
						var zhezhao = document.getElementById("zhezhao");
						var login = document.getElementById("login");
						var bt = document.getElementById("bt");
						var btclose = document.getElementById("btclose");
						zhezhao.style.display = "block";
						login.style.display = "block";
						zhezhao.style.zIndex = 10000;
						login.style.zIndex = 15000;
						btclose.addEventListener('click',function(){
							zhezhao.style.display = "none";
							login.style.display = "none";
							zhezhao.style.zIndex = 0;
							login.style.zIndex = 0;
						});
				
					}else if(res.data.length==0){
						//console.log('您暂时还没中奖记录哦!',res.data)
						var zjlv_txt=document.getElementById('zjlv_txt')
						zjlv_txt.innerHTML=`<h4 style="color:gray;margin-left:0.4rem;margin-top:0.2rem;">您暂时还没中奖记录哦!</h4>`
					}else{
						//console.log('向后台请求我的奖品')
						var my_lists=''
						for(var i=0;i<res.data.length;i++){
							console.log(i)
							var all_list=`
								<div class="txtcontent">
				                            <div class="phnum">${res.data[i].phone}</div>
				                            <div class="leibie">${res.data[i].result_described}</div>
				                            <div class="time">${res.data[i].create_time}</div>
				                        </div>
								`
								my_lists+=all_list
						};
						$('#zjlv_txt').html(my_lists)
					}
				
				},
					
				});
			
			
			//点击返回按钮
			back2.addEventListener('click',function(){
				that.zj_bg=false;
				that.shouye=true;
				
			var zjlv_txt=document.getElementById('zjlv_txt')
			zjlv_txt.style.display='none'
			});
			//点击我的奖品
			zj_my.addEventListener('click',function(){
				console.log('点击我的奖品')
				$.ajax({
				type:"get",
				url:"http://yl.uplsd.com/api/get_result/my",
				 //dataType: "jsonp",
				 data:'', 
				success:function(res){
					//console.log(123,res.code==90007)
					
					if(res.code==90007){
						//console.log('你还未登录')
						var zhezhao = document.getElementById("zhezhao");
						var login = document.getElementById("login");
						var bt = document.getElementById("bt");
						var btclose = document.getElementById("btclose");
						zhezhao.style.display = "block";
						login.style.display = "block";
						zhezhao.style.zIndex = 10000;
						login.style.zIndex = 15000;
						btclose.addEventListener('click',function(){
							zhezhao.style.display = "none";
							login.style.display = "none";
							zhezhao.style.zIndex = 0;
							login.style.zIndex = 0;
						});

					}else if(res.data.length==0){
						//console.log('您暂时还没中奖记录哦!',res.data)
						var zjlv_txt=document.getElementById('zjlv_txt')
						zjlv_txt.innerHTML=`<h4 style="color:gray;margin-left:0.4rem;margin-top:0.2rem;">您暂时还没中奖记录哦!</h4>`
					}else{
						//console.log('向后台请求我的奖品')
						var my_lists=''
						for(var i=0;i<res.data.length;i++){
							console.log(i)
							var all_list=`
								<div class="txtcontent">
				                            <div class="phnum">${res.data[i].phone}</div>
				                            <div class="leibie">${res.data[i].result_described}</div>
				                            <div class="time">${res.data[i].create_time}</div>
				                        </div>
								`
								my_lists+=all_list
						};
						$('#zjlv_txt').html(my_lists)
					}

				},
	
				});
				

			});
			//点击中奖名单
			zj_md.addEventListener('click',function(){
				console.log('向后台请求所有中奖名单')
				$.ajax({
				type:"get",
				url:"http://yl.uplsd.com/api/get_result/all",
				data:'', 
				success:function(res){
				//获取对象里的多个对象
				var all_lists=''
				for(var i in res.data){
					console.log(i)
					var all_list=`
						<div class="txtcontent">
		                            <div class="phnum">${res.data[i].phone}</div>
		                            <div class="leibie">${res.data[i].result_described}</div>
		                            <div class="time">${res.data[i].create_time}</div>
		                        </div>
						`
				all_lists+=all_list
				};
				$('#zjlv_txt').html(all_lists)		
				},
	
				});
				
			});
		
		},
		

	},
});


var zd=function(){
//	 var rotate=function(){
//	    	var angle=360-3000
//	        $(".little_yuan").rotate({
//	            angle:angle,
//	            animateTo:-10,
//	            duration:5000,
//	            callback:rotate,
//	            center:["80","80"],
//	            easing: function (x,t,b,c,d){
//	              return c*(t/d)+b;
//	           },
//	           bind:{
//	                   click:function(){
//	                       $(this).stopRotate();
//	                   }
//	           }
//	        });
//	    },
	    
	    var rotate1=function(){
	    	var num = Math.floor(Math.random() * 1000);
	    	var angle=360+3000+num
	        $(".one").rotate({
	            angle:10,
	            animateTo:angle,
	            duration:3000,
	            //callback:rotate,
	            center:["80","80"],
	            easing: function (x,t,b,c,d){
	              return c*(t/d)+b;
	           },
	           bind:{
	                   click:function(){
	                       $(this).stopRotate();
	                   }
	           }
	        });
	    }
	    rotate1();
//	    rotate();
}

var zj_tk =function(){
	var zj_tankuang = document.querySelector('.zj_tankuang')
	var zj_text = document.querySelector('.zj_text')
setInterval(function() {
							zj_tankuang.style.zIndex = 2000
							zj_text.style.zIndex = 2500
							that.isShow = true
						}, 3500);
}