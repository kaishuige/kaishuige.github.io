
var table = document.getElementById("table");
var addBtn = document.getElementById("button");
var form = document.getElementById("form").children;


// 添加数据出发事件

addBtn.onclick =  function(){
	// console.log(form.username.value)
	var info = [
		"#",
		form.username.value,
		form.sex.value,
		form.xs.value,
		form.zy.value
	]
	
	// 调用一次函数，重新生成
	infoLists([info]);
}



var infoList = [
	["#","张三","男","清华大学","it专业"],
	["#","张三1","男","清华大学","it专业"],
	["#","张三2","男","清华大学","it专业"],
]

// 页面首次显示
infoLists(infoList);
getIndex();

function infoLists(data){
	// 循环数组里面数组
	for(var i = 0;i < data.length;i++){
		var ul = document.createElement("ul");
		ul.className = "clearfix";
		
		for(var j = 0;j < data[i].length;j++){
			var li = document.createElement("li");
			var text = document.createTextNode(data[i][j]);
			li.appendChild(text);
			ul.appendChild(li);
		}
		
		// 单独添加按钮
		var libtn = document.createElement("li");
		var btn = document.createElement("button");
		var btntext= document.createTextNode("删除");
		btn.appendChild(btntext);
		libtn.appendChild(btn);
		ul.appendChild(libtn);
		
		

		btn.onclick = function(){
			console.log("删除");
			console.log(this.index);
			table.removeChild(table.children[this.index+1]);
			getIndex();
		}
		
		// console.log(ul);
		// 把ul添加表格里面
		table.appendChild(ul);
		
	}
	
	getIndex();
	
}

// 计算每个ul对象位置
function getIndex(){
	var uls = table.getElementsByTagName("ul");
	for(var i = 0;i < uls.length;i++){
		if(i!=0){
			uls[i].firstElementChild.innerText = i;
			uls[i].lastElementChild.children[0].index = i;
		}
	}
	
}