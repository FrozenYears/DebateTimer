const timesup = new Audio("./static/timeup.mp3");
const minleft = new Audio("./static/1min.mp3");
var tPos = 0;
var tNeg = 0;
var side = "";
var title = "辩论计时器";
let posloop = null;
let negloop = null;
var posDebater1 = "";
var posDebater2 = "";
var negDebater1 = "";
var negDebater2 = "";
var posDebater3 = "";
var posDebater4 = "";
var negDebater3 = "";
var negDebater4 = "";
var stages = ["赛前准备", "正方立论", "反方质询", "反方立论", "正方质询", "正方立论", "反方质询", "反方立论", "正方质询", "正方立论", "反方质询", "反方立论", "正方质询", "自由辩论", "反方总结", "正方总结", "赛后总结"]
var stageNow = 0; //第几个阶段
//Start
function refreshPos() {
	stopNeg(); //暂停反方计时器
	console.info("Positive Loop");
	document.getElementById('startPos').removeAttribute('onclick'); //避免连点加速
	posloop = setInterval(function(){
		if (tPos > 0) {
			tPos = tPos - 10;
			document.getElementById('clockp').innerHTML = String((tPos%6000000)/600000 | 0) + String((tPos%600000)/60000 | 0) + ":" + String((tPos%60000)/10000 | 0) + String((tPos%10000)/1000 | 0);
		} 
		if (tPos - 1000 == 30000) { minleft.play(); } //倒计时30秒提醒 有误差
		if (tPos - 500 == 0) { //时间到提醒 有误差 - 1000 
			timesup.play();
			clearInterval(posloop);
		}
		if (tPos == 0) { stopPos(); }
	},10);
}
function refreshNeg() {
	stopPos(); //暂停反方计时器
	console.info("Negative Loop");
	document.getElementById('startNeg').removeAttribute('onclick'); //避免连点加速
	negloop = setInterval(function(){
		if (tNeg > 0) {
			tNeg = tNeg - 10;
			document.getElementById('clockn').innerHTML = String((tNeg%6000000)/600000 | 0) + String((tNeg%600000)/60000 | 0) + ":" + String((tNeg%60000)/10000 | 0) + String((tNeg%10000)/1000 | 0);
		} 
		if (tNeg - 1000 == 30000) { minleft.play(); }
		if (tNeg - 500 == 0) { //时间到提醒 有误差 - 1000 
			timesup.play();
			clearInterval(negloop);
		}
		if (tNeg == 0) { stopNeg(); }
	},10);
}
//Pause
function stopPos() {
	clearInterval(posloop);
	document.getElementById('startPos').setAttribute('onclick', "refreshPos()");
}
function stopNeg() {
	clearInterval(negloop);
	document.getElementById('startNeg').setAttribute('onclick', "refreshNeg()");
}
//Skip
function skipPos() {
	if (tPos != 0 && tNeg != 0) {
		tPos = 1500;
		document.getElementById('clockp').innerHTML = String((tPos%6000000)/600000 | 0) + String((tPos%600000)/60000 | 0) + ":" + String((tPos%60000)/10000 | 0) + String((tPos%10000)/1000 | 0);
	}
}
function skipNeg() {
	if (tPos != 0 && tNeg != 0) {
		tNeg = 1500;
		document.getElementById('clockn').innerHTML = String((tNeg%6000000)/600000 | 0) + String((tNeg%600000)/60000 | 0) + ":" + String((tNeg%60000)/10000 | 0) + String((tNeg%10000)/1000 | 0);
	}
}
//Exchange
function exchange() {
	//目前只有切换到下一阶段 浪子回不了头
	if (stageNow < (stages.length - 1)) { stageNow++; }
	document.getElementById("stage").innerHTML = "当前环节：" + stages[stageNow];
}
//Reset
function reset() {
	//阶段及辩手
	stageNow = 0;
	document.getElementById("mainHeader").innerHTML = title;
	document.getElementById("stage").innerHTML = "当前环节：" + stages[stageNow];
    document.getElementById("nameListp").innerHTML = "正方一辩 " + posDebater1 + "<br>正方二辩 " + posDebater2 + "<br>正方三辩 " + posDebater3 + "<br>正方四辩 " + posDebater4;
    document.getElementById("nameListn").innerHTML = negDebater1 + " 反方一辩<br>" + negDebater2 + " 反方二辩<br>" + negDebater3 + " 反方三辩<br>" + negDebater4 + " 反方四辩";
	//时间
	stopPos();
	stopNeg();
	tPos = 0;
	tNeg = 0;
	document.getElementById('minute').value = "";
	document.getElementById('second').value = "";
	document.getElementById('clockp').innerHTML = "00:00";
	document.getElementById('clockn').innerHTML = "00:00";
	document.getElementById('startPos').setAttribute('onclick', "refreshPos()");
	document.getElementById('startNeg').setAttribute('onclick', "refreshNeg()");
}
//Settings
function readInformation() {
	//时间
	var m = Number(document.getElementById('minute').value);
	var n = Number(document.getElementById('second').value);
	if (m >= 0 && m <= 60 && n >= 0 && n <= 60 && m + n != 0 && m % 1 == 0 && n % 1 == 0 && !(m == 60 && n > 0)) {
		tPos = m * 60000 + n * 1000; // + 1000
		tNeg = m * 60000 + n * 1000;
		document.getElementById('startPos').setAttribute('onclick', "refreshPos()");
		document.getElementById('startNeg').setAttribute('onclick', "refreshNeg()");
		document.getElementById('clockp').innerHTML = String((tPos%6000000)/600000 | 0) + String((tPos%600000)/60000 | 0) + ":" + String((tPos%60000)/10000 | 0) + String((tPos%10000)/1000 | 0);
		document.getElementById('clockn').innerHTML = String((tNeg%6000000)/600000 | 0) + String((tNeg%600000)/60000 | 0) + ":" + String((tNeg%60000)/10000 | 0) + String((tNeg%10000)/1000 | 0);
	} else {
		alert('请输入范围为0~60的整数 最大计时60分钟');
	}
	title = document.getElementById("title").value;
    posDebater1 = document.getElementById("pos1").value;
    posDebater2 = document.getElementById("pos2").value;
	posDebater3 = document.getElementById("pos3").value;
    posDebater4 = document.getElementById("pos4").value;
    negDebater1 = document.getElementById("neg1").value;
    negDebater2 = document.getElementById("neg2").value;
    negDebater3 = document.getElementById("neg3").value;
    negDebater4 = document.getElementById("neg4").value;
	document.getElementById("mainHeader").innerHTML = title;
    document.getElementById("nameListp").innerHTML = "正方一辩 " + posDebater1 + "<br>正方二辩 " + posDebater2 + "<br>正方三辩 " + posDebater3 + "<br>正方四辩 " + posDebater4;
    document.getElementById("nameListn").innerHTML = negDebater1 + " 反方一辩<br>" + negDebater2 + " 反方二辩<br>" + negDebater3 + " 反方三辩<br>" + negDebater4 + " 反方四辩";
}
//绑定键盘
//正方 A S D
$(document).keydown(function (event) {
    if (event.keyCode == 65) {
        document.getElementById("startPos").click();
    }
});
$(document).keydown(function (event) {
    if (event.keyCode == 83) {
        document.getElementById("pausePos").click();
    }
});
$(document).keydown(function (event) {
    if (event.keyCode == 68) {
        document.getElementById("skipPos").click();
    }
});
//反方 J K L
$(document).keydown(function (event) {
    if (event.keyCode == 74) {
        document.getElementById("startNeg").click();
    }
});
$(document).keydown(function (event) {
    if (event.keyCode == 75) {
        document.getElementById("pauseNeg").click();
    }
});
$(document).keydown(function (event) {
    if (event.keyCode == 76) {
        document.getElementById("skipNeg").click();
    }
});
//切换阶段 E
$(document).keydown(function (event) {
    if (event.keyCode == 69) {
        document.getElementById("exchange").click();
    }
});
//初始化 R
$(document).keydown(function (event) {
    if (event.keyCode == 82) {
        document.getElementById("reset").click();
    }
});
//打开设置面板 Spacebar
$(document).keydown(function (event) {
    if (event.keyCode == 32) {
        document.getElementById("settings").click();
    }
});
//设置面板 确定 Enter
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        document.getElementById("yes").click();
    }
});