// 获取元素
var scoreDiv = document.querySelector('#scoreDiv'); // 分数
var timeDiv = document.querySelector('#timeDiv'); // 倒记时
var startM=document.querySelector('#startM');//游戏开始
var overM=document.querySelector('#overM');//游戏结束
var again=document.querySelector('#again');//重新开始
var wolves = document.querySelector('#wolves'); // 狼容器

// 全局变量  
// 所有位置 posArr[i][0]=>left   posArr[i][1]=>top 
var posArr = [
	['98px','115px'], // 
	['17px','160px'],
	['15px','220px'],
	['30px','293px'],// 
	['122px','273px'],
	['207px','295px'],
	['200px','211px'],// 
	['187px','141px'],
	['100px','192px'] 
];
var createWolfTimer; // 创建狼的计时器
var score = 0; // 分数

// 随机数函数 
function rN(min,max) {
	return Math.round(Math.random() * (max - min) + min);
}

// 创建wolf
function createWolf() {
	// 创建元素
	var wolf = document.createElement('img');
	// 根据随机数的比例设置类型
	wolf.type = rN(1,100) < 80 ? 'h' : 'x'; 
	wolf.index = 0; // 图片的顺序初始为0
	// 设置src
	wolf.src = 'img/' + wolf.type + wolf.index + '.png';
	
	// 确定当前图片的位置
	var bol = true;
	while(bol) {
		// 生成下标
		var index = rN(0,posArr.length - 1); 
		// 如果这个下标存在，重新生成
		var wolfArr = wolves.children; // 所有狼
		for(var i = 0;i < wolfArr.length; i++) {
			if(wolfArr[i].style.left == posArr[index][0]) {
				// 这个位置已经有狼，结束for循环，继续执行while循环，重新生成一个下标
				break;
			}
		}
		// 如果不存在，这个下标可用，while循环结束
		if(i == wolfArr.length) {
			// 代表当前index可用
			bol = false;
		}
	}
	// 为当前的狼设置位置
	wolf.style.left = posArr[index][0];
	wolf.style.top = posArr[index][1];
	wolves.appendChild(wolf);
	
	return wolf;
}

// 狼动起来
function wolfFn() {
	// 创建狼
	var lang = createWolf();
	lang.runtype = 'appear';
	lang.runTimer = setInterval(function() {
		if(lang.runtype == 'appear') {
			lang.index++;
			if(lang.index == 5) {
				lang.runtype = 'disappear';
			}
		} else if(lang.runtype == 'disappear') {
			lang.index--;
			if(lang.index == 0) {
				clearInterval(lang.runTimer);
				lang.remove();
			}
		} else if(lang.runtype == 'hit') {
			lang.index++;
			if(lang.index == 9) {
				clearInterval(lang.runTimer);
				lang.remove();
			}
		}
		lang.src = 'img/' + lang.type + lang.index + '.png';
	},100);
	
	hitWolf(lang);
}

// 击打狼
function hitWolf(w) {
	w.bol = true;
	w.onclick = function() {
		if(w.bol) {	

			if(w.type=='h'){
				score+=10;	
			}
			else{
				score-=10;
			}		
			w.runtype = 'hit';
			w.index = 5;
			w.bol = false;
			scoreDiv.innerText=score;
		}
	};
}
// 按频率创建狼
function gameRun() {
	createWolfTimer = setInterval(function() {
		wolfFn();
	},500);
}
// gameRun();

// 倒计时
var bol=true;
function djs() {
	if(!bol){
		return;
	}
	// djsTimer
	var djsTimer = setInterval(function() {
		// 获取timeDiv当前的宽度
		// 在此基础上累减
		// 将累减之后的值设置成新的宽度
		timerDiv.style.width = --timerDiv.offsetWidth + 'px';
		if(timerDiv.style.width=='0px'){
			overM.style.display='block';
			again.style.display='block';
			wolves.innerHTML='';
			clearInterval(createWolfTimer);
			clearInterval(djsTimer);
		}
	},100);
	bol=false;
}
// djs();

startM.onclick=function(){
	gameRun();
	djs();
	startM.style.display='none';
}
again.onclick=function(){
	timerDiv.style.width='';
	overM.style.display='none';
	again.style.display='none';
	bol=true;
	score=0;
	scoreDiv.innerText=score;
	gameRun();
	djs();
	
}



//w.bol = true;
//w.onclick = function() {
//	if(w.bol) {
//		// 执行代码
//		w.bol = false;
//	}	
//}
//
//w.bol = true;
//w.onclick = function() {
//	if(!w.bol) {
//		return;
//	}
//	// 执行代码
//	w.bol = false;
//}





















//