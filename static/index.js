//Pro Vs Con
//Bugs:
//1、（初步判断已解决）一顿操作后 通过Space Enter快捷键无法关闭面板
//2、（初步判断已解决）一顿操作后 计时加速 无法通过控制台调试stopPos()暂停
//初步判断是 Semantic-ui 或 readInformation() 的问题
//Optimization:
//1、快捷键特定起效
const timesup = new Audio("./static/timeup.mp3");
const minleft = new Audio("./static/30s.mp3");
var tPos = 0;
var tNeg = 0;
var posTimeGoing = "";
var negTimeGoing = "";
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
var stages = ["赛前准备", "正方立论", "反方质询", "正方回答", "反方立论", "正方质询", "反方回答", "正方立论", "反方质询", "正方回答", "反方立论", "正方质询", "反方回答", "正方立论", "反方立论", "自由辩论", "反方总结", "正方总结", "赛后总结"]
var stageNow = 0; //第几个阶段
//Start
function refreshPos() {
	posTimeGoing = true;
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
	negTimeGoing = true;
	stopPos(); //暂停正方计时器
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
	posTimeGoing = false;
	clearInterval(posloop);
	document.getElementById('startPos').setAttribute('onclick', "refreshPos()");
}
function stopNeg() {
	negTimeGoing = false;
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
	if (stageNow < (stages.length - 1)) { stageNow++; }
	document.getElementById("stage").innerHTML = "当前环节：" + stages[stageNow];
	document.getElementById("next").innerHTML = "下一环节：" + stages[stageNow + 1];
}
function exchangeBack() {
	if (stageNow > 0) { stageNow--; }
	document.getElementById("stage").innerHTML = "当前环节：" + stages[stageNow];
	document.getElementById("next").innerHTML = "下一环节：" + stages[stageNow + 1];
}
//Reset
function reset() {
	//阶段及辩手
	stageNow = 0;
	document.getElementById("mainHeader").innerHTML = title;
	document.getElementById("stage").innerHTML = "当前环节：" + stages[stageNow];
	document.getElementById("next").innerHTML = "下一环节：" + stages[stageNow + 1];
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
		tPos = m * 60000 + n * 1000;
		tNeg = m * 60000 + n * 1000;
		document.getElementById('startPos').setAttribute('onclick', "refreshPos()");
		document.getElementById('startNeg').setAttribute('onclick', "refreshNeg()");
		document.getElementById('clockp').innerHTML = String((tPos%6000000)/600000 | 0) + String((tPos%600000)/60000 | 0) + ":" + String((tPos%60000)/10000 | 0) + String((tPos%10000)/1000 | 0);
		document.getElementById('clockn').innerHTML = String((tNeg%6000000)/600000 | 0) + String((tNeg%600000)/60000 | 0) + ":" + String((tNeg%60000)/10000 | 0) + String((tNeg%10000)/1000 | 0);
		stopPos();
		stopNeg();

	} else {
		if (m != 0 || n != 0) {
			alert('请输入范围为0~60的整数 最大计时60分钟');
		}
	}
	if (document.getElementById("title").value == "") {
		title = "辩论计时器";
	} else {
		title = document.getElementById("title").value;
	}
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
	$('.ui.setting').modal('hide');
}
//更换背景图片
function setBackground() {
    const API = "https://api.whitrayhb.top:19960/BingImage.php";
    let body = document.getElementById("body");
    let input = document.getElementById("bgSetting").value;
    if (/#[\da-f]{6}/.test(input)) {
        body.style.backgroundImage = "url()";
        body.style.backgroundColor = input;
    }
    else {
        body.style.backgroundImage = "url("+input+")";
        body.style.backgroundColor = "";
    }
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
//切换至下一阶段 Right Arrow →
$(document).keydown(function (event) {
    if (event.keyCode == 39) {
        document.getElementById("exchange").click();
    }
});
//切换至上一阶段 Left Arrow ←
$(document).keydown(function (event) {
    if (event.keyCode == 37) {
        exchangeBack();
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
//打开使用说明 H
$(document).keydown(function (event) {
    if (event.keyCode == 72) {
        document.getElementById("readme").click();
    }
});
//设置面板 确定 Enter
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        document.getElementById("yes").click();
    }
});