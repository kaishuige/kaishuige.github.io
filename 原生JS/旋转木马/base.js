// 获取对象
// 			document.getElementById("div")  id获取   $("#div")
// 			document.getElementsByClassName("div")[0] class获取 $(".div")
// 			document.getElementsByTagName("div")[0]  标签获取  $("div")
			
			
			function $(names){
				var d = names.substr(0,1);  // # .
				var doc = names.substr(1); //#div ==>div
				switch(d){
					case "#":
						return document.getElementById(doc);
						break;
					case ".":
						return getClass(doc);
						break;
					default:
						return document.getElementsByTagName(names);
				}
			}
			
			function getClass(Cname){
				//判断浏览器是否兼容
				if(document.getElementsByClassName){
					return document.getElementsByClassName(Cname);
				}
				
				// 编写兼容ie浏览器写法
				var arr = []; //空数组存放数据
				var dom = document.getElementsByTagName("*");
				
				for(var i = 0;i <dom.length;i++){
					// 判断所有标签类名
					// 类名 "aa com bb"
					var sql = dom[i].className.split(" ");//字符串转数组
					for(var j = 0;j < sql.length;j++){
						if(sql[j] == Cname){
							arr.push(dom[i]);
						}
					}
				}
				return arr;
				
			}
			
			
			// 滚动条获取top与left值
			function scroll(){
				
				if(window.pageYOffset != null){
					return {
						top:window.pageYOffset,
						left:window.pageXOffset
					}
				}
				
				if(document.compatMode =="CSS1Compat"){
					return {
						top:document.documentElement.scrollTop,
						left:document.documentElement.scrollLeft
					}
				}
				
				return {
					top:document.body.scrollTop,
					left:document.body.scrollLeft
				}
			}
			
			// client家族 宽度高度兼容
			function client(){
				// ie9+ 最新浏览器兼容
				if(window.innerHeight != null){
					return {
						width: window.innerWidth,
						height: window.innerHeight
					}
				}
				
				// 标准浏览器兼容
				if(document.compatMode === "CSS1Compat"){
					return {
						width: document.documentElement.clientWidth,
						height: document.documentElement.clientHeight
					}
				}
				// 怪异浏览器
				return {
					width:document.body.clientWidth,
					height:document.body.clientHeight
				}
			}
			
			// 匀速运动函数
			function animate1(obj,num){
				clearInterval(obj.clear);
				
				var speed = obj.offsetLeft < num ? 10 :-10;
				
				obj.clear = setInterval(function(){
					// 计算总距离与移动距离之差
					var result = num - obj.offsetLeft;
					
					obj.style.left = obj.offsetLeft + speed +"px";
					
					// Math.abs()绝对值  -10 ==>10 
					if(Math.abs(result) <= 10){
						clearInterval(obj.clear);
						// 直接跳转到目标位置
						obj.style.left = num + "px";
						
						
					}
					
				},20)
			}
			
			// 缓动运动效果
			function animate(obj,json,callback){
				clearInterval(obj.timer);
				
				obj.timer =setInterval(function(){
					// 获取样式
// 					attr 属性名  key
// 					target 目标距离 value
					var flag = true; //用来判断是否停止定时器
					for(attr in json){
						var current = 0;
						
						if(attr == "opacity"){
							current = Math.round(getStyle(obj,attr) * 100) || 0; //0.3 *100
						}else{
							current = parseInt(getStyle(obj,attr)); //100px ==>100
						}
						
						
						//盒子本身位置 + 步长(不断变化)
						var leader =(json[attr] - current)/10;
						
						leader = leader > 0? Math.ceil(leader) :Math.floor(leader);
						
						// 判断透明度与层级区分
						if(attr == "opacity"){ //透明度
							if("opacity" in obj.style){  //浏览器兼容问题
								obj.style.opacity = (current+ leader) /100;
							}else{
								obj.style.filter = "alpha(opacity:" + (current+ leader) + ")"
							}
						}else if(attr =="zIndex"){ //层级
							obj.style.zIndex = json[attr];
						}else{
							obj.style[attr] = current + leader +"px";
						}
						
						// 目标的距离 != 对象距离
						if(json[attr] != current){  //只要其中一个不满足条件,不停止定时器
							flag = false;
						}
						
					}
					
					// 判断结束条件
					if(flag){
						clearInterval(obj.timer);  //清除定时器
						// 定时器运动结束后,调用函数
						if(callback){
							callback();  //回调函数 运行函数
						}
					}
					
				},30)
			}
			
			
			
			
						// 解决浏览器兼容内嵌式与外链式样式
			function getStyle(obj,attr){
				if(obj.currentStyle){
					return obj.currentStyle[attr];
				}else{
					return window.getComputedStyle(obj,null)[attr];
				}
			}