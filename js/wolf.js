//获取元素
var scoreDiv=document.querySelector('#scoreDiv');//分数
var timerDiv=document.querySelector('#timerDiv');//倒计时
var startM=document.querySelector('#startM');//游戏开始
var overM=document.querySelector('#overM');//游戏结束
var again=document.querySelector('#again');//重新开始
var wolves=document.querySelector('#wolves');//狼容器
var flag = true;

//全局变量   
//所有位置 posArr[i][0]=>left  posArr[i][1]=>top
var posArr = [
			['98px','115px'],
			['17px','160px'],
			['15px','220px'],
			['30px','293px'],
			['122px','273px'],
			['207px','295px'],
			['200px','211px'], 
			['187px','141px'],
			['100px','185px']
		];
		var createWolfTimer;//创建狼的计时器
		var score=0;//分数
		
//随机函数
		function rN(min,max){
			return Math.round(Math.random()*(max-min)+min);
		}
		
		//创建wolf
		function createWolf(){
			//创建元素
			var wolf=document.createElement('img');
			//根据随机数的比例设置类型
			wolf.type=rN(1,100)<80?'h':'x';
			wolf.index=0;//图片的顺序初始为0；
			//设置src，js文件的图片引入路径，只与引入js文件的html文件有关，与js文件本身无关。
		    wolf.src='img/'+wolf.type+wolf.index+'.png';
//		    console.log(wolf);
//           确定当前图片的位置
           var bol=true;
           while(bol){
           	//生成下标
           	var index=rN(0,posArr.length-1);
           	//如果这个下标存在，重新生成
           	var wolfArr=wolves.children;//所有狼
           	for(var i=0;i<wolfArr.length;i++){
           		if(wolfArr[i].style.left==posArr[index][0]){
           			//这个位置已经有狼，结束for循环，继续执行while循环，重新生成一个下标
           			break;
           		}
           	}
           	// 如果不存在，这个下标可用，while循环结束
           	if(i==wolfArr.length){
           		//代表当前index可用
           		bol=false;
           	}
           }
           //为当前的狼设置位置
           wolf.style.left=posArr[index][0];
           wolf.style.top=posArr[index][1];
           wolves.appendChild(wolf);
           return wolf;
		}
		//狼动起来
		function wolfFn(){
			//创建狼
			var lang=createWolf();
			//将当前狼出现的计时器绑定为自定义属性，狼与狼之间就不互相影响
			lang.appearTimer=setInterval(function(){
				//自己的index++
				lang.index++;
				//index累加之后重新设置src
				lang.src='img/'+lang.type+lang.index+'.png';
				//index累加到被击打前的最后一个状态，清除狼出现的计时器
				if(lang.index==5){
					clearInterval(lang.appearTimer);
					//狼消失
					lang.disappearTimer=setInterval(function(){
						lang.index--;
						lang.src='img/'+lang.type+lang.index+'.png';
						//完全消失，清除消失的计时器
						if(lang.index==0){
							clearInterval(lang.disappearTimer);
							//将狼从DOM中移除
							lang.remove();//wolves.removeChild(lang);
						}
						
					},100);
				}
			},100);
			hitWolf(lang);
		}
		
		// 击打狼
		function hitWolf(w){
			//标志位，控制狼只能被击打一次，自定义属性，自己控制自己的
			w.bol=true;
			w.onclick=function(){
				if(!w.bol){
					return;
				}
				//计算分数
				if(w.type=='h'){
					score+=10;
				}
				else{
					score-=10;
				}
				scoreDiv.innerText=score;
				
				
				//清除狼消失或者出现的计时器
				clearInterval(w.appearTimer);
				clearInterval(w.disappearTimer);
				// index从5的位置开始累加
				w.index=5;
				//被击打之后的计时器
				w.hitTimer=setInterval(function(){
					w.index++;
					w.src='img/'+w.type+w.index+'.png';
					//击打后的最后一个状态，清除计时器，移除节点
					if(w.index==9){
						clearInterval(w.hitTimer);
						w.remove();
					}
				},100);
				w.bol=false;
			}
		}
		
		
		//按频率创建狼
	function gameRun(){
		//隔一段时间创建一只狼
		createWolfTimer=setInterval(function(){
			wolfFn();
		},1000)
	}
//	gameRun();
	
	//倒计时
	function djs(){
		//djsTimer
		//获取time当前的宽度
		//在此基础上累减
		//将累减之后的值设置成新的宽度
	   
		if(flag){
			var djsTimer=setInterval(function(){
			var timerW=timerDiv.offsetWidth;
			timerW--;
			timerDiv.style.width=timerW+'px';
			if(timerDiv.style.width=='0px'){
				overM.style.display='block';
				again.style.display='block';
				clearInterval(djsTimer);
				clearInterval(createWolfTimer);
				wolves.innerHTML='';
			}
		
			//timeDiv.style.width=--timeDiv.offsetWidth+'px';
		},10);
			flag=false;
		}
		
//		console.log(timerDiv.style.width);
			
	}
//	djs();
	
	startM.onclick=function(){
		startM.style.display='none';
		gameRun();
		djs();
	}
	again.onclick=function(){
		timerDiv.style.width='';
		overM.style.display='none';
		again.style.display='none';
		flag=true;
		score=0;    
		scoreDiv.innerText=score;
		gameRun();
		djs();
	}
	
	

	
	
//	w.bol=true;
//	w.onclick=function(){
//		if(w.bol){
//			//执行代码
//			w.bol=false;
//		}
//	}
//	w.bol=true;
//	w.onclick=function(){
//		if(!w.bol){
//			return;
//		}
//		//执行代码
//		w.bol=false;
//	}


		

