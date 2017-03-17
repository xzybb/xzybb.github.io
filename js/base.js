
//channelId频道

//获取class
function classNA(domclass){
    var odiv = document.getElementsByTagName("*");
    var a=[];
    var op=0;
    for(var p = 0; p<odiv.length; p++){
    	odiv[p].index=p;
       if(odiv[p].className == domclass){
            a[op]= odiv[p];
            op++;
       }
    }
    return a;
}

//随机位置
var bgBoxDiv=document.getElementById("bg_box").getElementsByTagName("div");
digDiv();
function digDiv(){
	randomDiv("box_one","boxOne");
	randomDiv("box_two","boxTwo");
	randomDiv("box_three","boxTthree");
	randomDiv("box_four","boxFour");
}
function randomDiv(obj,set){
	for(var p=0;p<classNA(obj).length;p++){
		classNA(obj)[p].style.animation=set +" 10s "+-Math.random()*20+"s"+" infinite linear";
	}
}
bgBoxDivxyz();
function bgBoxDivxyz(){
	for(var p=0;p<bgBoxDiv.length;p++){
		bgBoxDiv[p].style.left=Math.random()*80+10+"%";
		bgBoxDiv[p].style.top="-100px";
	}
}

//头部头部
//function elimi(){
//	var boxTopList=document.getElementById("boxTopList");
//	var boxTopListlia=document.getElementsByTagName("a");
//	boxTopListlia[0].className="indpxss";
//	for(var o=0;o<boxTopListlia.length;o++){
//		boxTopListlia[o].index=o;
//		boxTopListlia[o].onclick=function(){
//			for(var r=0;r<boxTopListlia.length;r++){
//				boxTopListlia[r].className="ind";
//			}
//			this.className="indpxss";
//		}
//	}
//}
//elimi();



