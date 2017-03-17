var myApp = angular.module("myApp",["ngRoute","moviecatJsonpApp"]);
myApp.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/homepage",{
		controller:"homepageController",//首页
		templateUrl:"homepage.html"
	}).when("/singer",{
		controller:"singerController",//歌手
		templateUrl:"singer.html"
	}).when("/album",{
		controller:"albumController",//专辑
		templateUrl:"album.html"
	}).when("/ranking",{
		controller:"rankingController",//排行榜
		templateUrl:"ranking.html"
	}).when("/mvVideo",{
		controller:"mvVideoController",//mv视频
		templateUrl:"mvVideo.html"
	}).when("/mvVideo/:mvplay",{
		controller:"mvplayController",//mv播放
		templateUrl:"mvplay.html"
	}).when("/singer/:pers",{
		controller:"personalController",//个人信息
		templateUrl:"personal.html"
	}).when("/album/:mass",{
		controller:"massController",//专辑信息mass
		templateUrl:"albummass.html"
	}).when("/singer/:pers/:play",{
		controller:"playController",//歌曲播放
		templateUrl:"play.html"
	}).otherwise({
		redirectTo:"/homepage",
	})
}])
myApp.controller("bycontroller",["$scope","jsonpService","$http","$timeout","$routeParams",function($scope,jsonpService,$http,$timeout,$routeParams){
	$scope.keys;
	$scope.jsonfun=function(){
		jsonpService.jsonp("https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?key="+$scope.keys,function(data){
			$scope.jsda=data;
			console.log($scope.jsda);
			$scope.$apply();
		})
	}
	$scope.byclif=false;
	$scope.byclick=function(e){
		$scope.byclif=false;
		if(e!==undefined&&e.length>0){
			$scope.byclif=true;
			$scope.keys=e;
			$scope.jsonfun();
		}
	}
	$scope.bycli=function(){
		var out=function(){
			$scope.byclif=false;
		}
		$timeout(out,300);
	}
	$scope.ndpx=1;
	$scope.ndpxex=function(e){
		$scope.ndpx=e;
	}
}]);
//首页
myApp.controller("homepageController",["$scope","jsonpService","$http","$interval","$routeParams",function($scope,jsonpService,$http,$interval,$routeParams){
	jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg?page=other",function(data){
		$scope.data=data;
		console.log($scope.data);
		$scope.funt($scope.data.data.focus)
		$scope.$apply();
		
	})
	$scope.cass=[];
	$scope.funt=function(sonj){
		var o=1;
		for(var p=0;p<sonj.length;p++){
			$scope.cass[p]="p"+o;
			o++;
		}
	}
	
	$scope.btract=function(){
		$interval.cancel(timer);
		var op=$scope.cass[$scope.cass.length-1];
		var i;
		for(i=$scope.cass.length-1;i>0;i--){
			$scope.cass[i]=$scope.cass[i-1]
		}
		$scope.cass[0]=op;
		$scope.tim();
	}
	$scope.plus=function(){
		$interval.cancel(timer);
		var op=$scope.cass[0];
		for(var i=0;i<$scope.cass.length-1;i++){
			$scope.cass[i]=$scope.cass[i+1];
		}
		$scope.cass[$scope.cass.length-1]=op;
		$scope.tim();
	}
	var timer;
	$scope.tim=function(){
		timer=$interval(function(){
			$scope.btract();
		},3000)
	}
	$scope.tim();
	$scope.poLi=function(index){
		$interval.cancel(timer);
		var scpp= $scope.cass;
		for(var p=0;p<scpp.length;p++){
			var op=scpp[0];
			for(var i=0;i<scpp.length;i++){
				scpp[i]=scpp[i+1];
			}
			scpp[scpp.length-1]=op;
			if("p2"==scpp[index]){
				$scope.cass=scpp;
				$scope.tim();
				return;
			}
		}
	}
	$scope.opk=0;
	$scope.xpe=0;
	$scope.dirTab=["全部","港台","日本","韩国","内地","欧美"];
	$scope.opklia=function(index){
		$scope.xpe=index;
		$scope.opk=index;
	}
	$scope.onmou=function(){
		var popularSong=document.getElementById("popularSong");
		var poSongUl=popularSong.getElementsByTagName("ul")[0];
		window.onscroll=function(){
			if(document.body.scrollTop>700){
				popularSong.style.height=poSongUl.offsetHeight*3+"px";
				window.onscroll="";
			}
		}
		
	}
	$scope.onmou();
}]);

//歌手
myApp.controller("singerController",["$scope","jsonpService","$http","$interval","$routeParams",function($scope,jsonpService,$http,$interval,$routeParams){
	$scope.cli=["all_all","all"];
	$scope.namame=1;
	$scope.clifun=function(id,obj){
		console.log(id+obj);
		if(id==1){
			$scope.cli[0]=$scope.ingerFF[obj];
		}else if(id==2){
			$scope.cli[1]=$scope.inidFFF[obj];
		}
		$scope.namame=1;
		$scope.jsonfff($scope.cli,$scope.namame);
	}
	$scope.jsonfff=function(obg,po){
		var opx=obg[0]+"_"+obg[1];
		jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&pagesize=100&format=jsonp&key="+opx+"&pagenum="+po,function(data){
			$scope.data=data;
			console.log($scope.data);
			$scope.Intercept($scope.data.data.list,po);
			$scope.$apply();
		})
	}
	$scope.Intercept=function(onj,po){
		$scope.ceptA=[];
		$scope.ceptB=[];
		for(var p=0;p<onj.length;p++){
			if(p<10&&po==1){
				$scope.ceptA[p]=onj[p];
			}else{
				$scope.ceptB[p]=onj[p];
			}
		}
	}
	$scope.jsonfff($scope.cli,$scope.namame);
	$scope.inger=["全部","华语男","华语女","华语组合","韩国男","韩国女","韩国组合","日本男","日本女","日本组合","欧美男","欧美女","欧美组合","乐团","演奏家","作曲家","指挥家","其他"];
	$scope.ingerFF=["all_all","cn_man","cn_woman","cn_team","k_man","k_woman","k_team","j_man","j_woman","j_team","eu_man","eu_woman","eu_team","c_orchestra","c_performer","c_composer","c_cantor","other_other"];
	$scope.inid=["热门","A","B","C","D","E",'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];
	$scope.inidFFF=["all","A","B","C","D","E",'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','9'];
	$scope.tasta=0;
	$scope.tastb=0;
	$scope.tastafun=function(v,e){
		if(v==1){
			$scope.tasta=e;
		}else if(v==2){
			$scope.tastb=e;
		}
	}
	
	$scope.namafun=function(id){
		$scope.namame=id;
		$scope.jsonfff($scope.cli,$scope.namame);
	}
	$scope.ifckfun=function(id,lb){
		if(id==1&&$scope.namame>1){
			$scope.namame-=1;
		}else if(id==2&&lb>$scope.namame){
			$scope.namame+=1;
		}
		$scope.jsonfff($scope.cli,$scope.namame);
	}
}]);

//专辑
myApp.controller("albumController",["$scope","jsonpService","$http","$interval","$routeParams",function($scope,jsonpService,$http,$interval,$routeParams){
	$scope.jponpfun=function(obj){
		obj-=1;
		jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/album_library?cmd=get_album_info&pagesize=20&language="+$scope.datalist[0]+"&genre="+$scope.datalist[1]+"&pay="+$scope.datalist[2]+"&type="+$scope.databsi[0]+"&year="+$scope.databsi[1]+"&company="+$scope.databsi[2]+"&page="+obj+"&sort="+$scope.newest,function(data){
			$scope.data=data;
			$scope.numss=Math.ceil($scope.data.data.sum/20);
			console.log($scope.data);
			$scope.$apply();
		})
	}
	$scope.typess=["语种","流派","价格","筛选"];
	$scope.languages=["全部","国语","粤语","英语","韩语","日语","法语","西班牙语"];
	$scope.languss=["-1","0","1","5","4","3","6","16"];
	$scope.schools=["全部","流行","古典","爵士","摇滚","电子","拉丁","轻音乐","世界音乐","嘻哈","原声","乡村","舞曲","R&B","民谣","金属"];
	$scope.schoss=["0","1","2","3","36","22","27","21","39","34","37","19","20","33","23","28"];
	$scope.price=["全部","免费","付费"];
	$scope.pricess=["0","1","2"];
	$scope.scre=["类别","年代","唱片公司"];
	$scope.scress=["0","1","2"];
	$scope.screa=["全部","专辑","EP","Single","演唱会","动漫","游戏"];
	$scope.screeass=["-1","0","11","10","1","3","4"];
	$scope.screb=["全部","2016","2015","2014","一零年代","零零年代","九十年代","八十年代","七十年代","六十年代"];
	$scope.screbss=["1","7","8","9","2","3","4","5","6","13"];
	$scope.screc=["全部","华纳唱片","索尼音乐","环球唱片","杰威尔音乐","麦爱音乐","三胜文化","英皇唱片","福茂唱片","金牌大风","YG","少城时代","华谊兄弟","华纳PLG","Cube","Loen","当然娱乐","梦响强音","乐华圆娱","梦响当然","林暐哲音乐","和平之月"];
	$scope.screcss=["-1","3","5","35","2317","8482","8416","2","10","372","1021","1360","20","9628","6958","1390","1065","7913","1020","2597","2067","740"];
	$scope.aggregate=[$scope.languages,$scope.schools,$scope.price,$scope.scre];
	$scope.aggress=[$scope.languss,$scope.schoss,$scope.pricess,$scope.scress];
	$scope.scree=[$scope.screa,$scope.screb,$scope.screc];
	$scope.screess=[$scope.screeass,$scope.screbss,$scope.screcss];
	$scope.datalist=["-1","0","0",'0'];
	$scope.dianji=["0","0","0","0"];
	$scope.aggrefun=function(id,obg){
		$scope.datalist[id]=$scope.aggress[id][obg];
		$scope.dianji[id]=obg;
		$scope.jponpfun();
		console.log($scope.datalist);
	};
	$scope.databsi=["-1","1","-1"];
	$scope.dianbx=["0","0","0"];
	$scope.grefun=function(id,obg){
		$scope.databsi[id]=$scope.screess[id][obg];
		$scope.dianbx[id]=obg;
		$scope.jponpfun();
		console.log($scope.databsi);
	};
	$scope.newest=1;
	$scope.switchfun=function(id){
		$scope.newest=id;
		$scope.jponpfun();
	}
    /*页码*/
	$scope.namame=1;
	$scope.jponpfun($scope.namame);
	$scope.namafun=function(id){
		$scope.namame=id;
		$scope.jponpfun($scope.namame);
	}
	$scope.ifckfun=function(id,lb){
		if(id==1&&$scope.namame>1){
			$scope.namame-=1;
		}else if(id==2&&lb>$scope.namame){
			$scope.namame+=1;
		}
		$scope.jponpfun($scope.namame);
	}
	/*页码*/
}]);

//https://c.y.qq.com/v8/fcg-bin/album_library?cmd=get_album_info&page=0&pagesize=20&language=0&year=7&pay=1&type=0&company=3&genre=22
//&language=5 语种
//&genre=22  流派
//&pay=2  价格
//&type=11 筛选第一个
//&year=13 筛选第二个
//&company=2317 筛选第三个
//&sort=1 最新 最热2



//排行榜
myApp.controller("rankingController",["$scope","jsonpService","$http","$interval","$routeParams","$location",function($scope,jsonpService,$http,$interval,$routeParams,$location){
	$scope.dataPass;
	$scope.jsonpfunA=function(){
		$scope.numss=$scope.numss-1;
		jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&v8debug=1",function(data){
			$scope.data=data;
			$scope.dataPass($scope.data);
			$scope.dataPass=$scope.data[0].List[0].topID;
			$scope.jsonpfunB();
			console.log($scope.data);
			$scope.$apply();
		})
	}
	$scope.jsonpfunA();
	$scope.numss=1;
	$scope.jsonpfunB=function(){
		$scope.numsp=($scope.numss-1)*30;
		jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?song_num=30&format=jsonp&topid="+$scope.dataPass+"&song_begin="+$scope.numsp,function(data){
			$scope.dabt=data;
			console.log($scope.dabt);
			$scope.numss=Math.ceil($scope.dabt.total_song_num/30);
			$scope.$apply();
		})
	}
	$scope.listLi=["0","no"];
	$scope.data;
	$scope.dataPass=function(data){
		$scope.data=data;
	}
	$scope.navlistLi=function(id,index){
		$scope.numss=1;
		$scope.listLi[id]=index;
		if(id==0&&index==$scope.data[id].List.length-2){
			$location.url('/mvVideo');
			console.log($location)
		}
		if(id==0){
			$scope.listLi[1]="no";
			$scope.dataPass=$scope.data[id].List[index].topID;
			$scope.jsonpfunB();
		}else if(id==1){
			$scope.listLi[0]="no";
			$scope.dataPass=$scope.data[id].List[index].topID;
			$scope.jsonpfunB();
		}
	}
	$scope.toFix=function(index){
		$scope.bate=$scope.dabt.songlist[index].data.interval/60;
		$scope.bate=$scope.bate.toFixed(2);
		return $scope.bate;
	}
	/*页码*/
	$scope.namame=1;
	$scope.jponpfun=($scope.namame);
	$scope.namafun=function(id){
		$scope.namame=id;
		$scope.numss=$scope.namame;
		$scope.jsonpfunB();
	}
	$scope.ifckfun=function(id,lb){
		if(id==1&&$scope.namame>1){
			$scope.namame-=1;
		}else if(id==2&&lb>$scope.namame){
			$scope.namame+=1;
		}
		$scope.numss=$scope.namame;
		$scope.jsonpfunB();
	}
	/*页码*/
}]);
//排行榜
//https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&v8debug=1&jsonCallback=jsonCallback

//https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?topid=36&song_begin=0&song_num=30&format=jsonp
//&song_begin=0 后续添加

//mv视频 mvVideoController
myApp.controller("mvVideoController",["$scope","jsonpService","$http","$interval","$routeParams","$location",function($scope,jsonpService,$http,$interval,$routeParams,$location){
	$scope.jsonpfun=function(){
		$scope.namaPP=$scope.namame-1;
		jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/getmv_by_tag?pagecount=20&area="+$scope.datalist[0]+"&tag="+$scope.datalist[1]+"&year="+$scope.datalist[2]+"&type="+$scope.newest+"&pageno="+$scope.namaPP,function(data){
			$scope.data=data;
			console.log($scope.data);
			$scope.numss=Math.ceil($scope.data.data.sum/20);
			console.log($scope.numss)
			$scope.$apply();
		})
	}
	//	地区
	$scope.region=["全部","内地","港台","欧美","韩国","日本","其他"];
	$scope.regionss=["0","1","2","3","4","5","6"];
//	类型
	$scope.types=["全部","官方版","影视原声","舞蹈","混音版","KTV版","音乐电影","演唱会","颁奖礼","动漫","翻制版","预告版","花絮版","游戏","广告","Flash动画","创意","搞笑","制服","一镜到底","迷幻","重口味","鬼畜","穿越","剧情","清新","民族风","弹奏","景色","杀马特","戏曲","儿歌"];
	$scope.typesss=["0","2","3","9","10","11","12","13","14","16","23","26","27","28","29","30","40","41","43","45","46","47","48","49","50","51","52","53","54","55","56","57"];
//	年份
	$scope.years=["全部","2017","2016","2015","2014","2013","2012","2011","2010","00年代","其他"];
	$scope.yearsss=["0","11","8","7","1","2","3","4","9","5","6"];
	//分类
	$scope.ongli=["地区","类型","年份"];
	//总结
	$scope.retyye=[$scope.region,$scope.types,$scope.years];
	$scope.retyyess=[$scope.regionss,$scope.typesss,$scope.yearsss];
	$scope.datalist=["0","0","0"];
	$scope.dianji=["0","0","0"];
	$scope.aggrefun=function(id,obg){
		$scope.datalist[id]=$scope.retyyess[id][obg];
		$scope.dianji[id]=obg;
		$scope.jsonpfun();
		console.log($scope.datalist);
	};
	$scope.newest=1;
	$scope.switchfun=function(id){
		$scope.newest=id;
		$scope.jsonpfun();
		console.log($scope.newest);
	}
	/*页码*/
	$scope.namame=1;
	$scope.namafun=function(id){
		$scope.namame=id;
		$scope.jsonpfun();
	}
	$scope.ifckfun=function(id,lb){
		if(id==1&&$scope.namame>1){
			$scope.namame-=1;
		}else if(id==2&&lb>$scope.namame){
			$scope.namame+=1;
		}
		$scope.jsonpfun();
	}
	/*页码*/
	$scope.jsonpfun();
}]);
//&area=1 地区
//&tag=2  类型
//&year=8 年份
//&type=1 热度

//个人信息 歌手信息 personalController
myApp.controller("personalController",["$scope","jsonpService","$http","$interval","$routeParams","$location",function($scope,jsonpService,$http,$interval,$routeParams,$location){
	console.log($routeParams.pers);
	$scope.route=$routeParams.pers;
	$scope.num=10;
	$scope.jsonpfun=function(){
		jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?order=listen&begin=0&singermid="+$routeParams.pers+"&num="+$scope.num,function(data){
			$scope.data=data;
			console.log($scope.data);
			$scope.$apply();
		})
	}
	$scope.toFix=function(index){
		$scope.bate=$scope.data.data.list[index].musicData.interval/60;
		$scope.bate=$scope.bate.toFixed(2);
		return $scope.bate;
	};
	$scope.whole=function(id){
		$scope.num=id;
		$scope.jsonpfun();
	}
	$scope.jsonpfun();
	
}]);

//"http://i.y.qq.com/v8/fcg-bin/fcg_get_song_detail.fcg?songid="+$routeParams.song


//专辑信息
myApp.controller("massController",["$scope","jsonpService","$http","$interval","$routeParams","$location",function($scope,jsonpService,$http,$interval,$routeParams,$location){
	console.log($routeParams.mass);
	$scope.route=$routeParams.mass;
	$scope.num=10;
	$scope.jsonpfun=function(){
		jsonpService.jsonp("https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid="+$routeParams.mass,function(data){
			$scope.data=data;
			console.log($scope.data);
			$scope.$apply();
		})
	}
	$scope.toFix=function(index){
		$scope.bate=$scope.data.data.list[index].interval/60;
		$scope.bate=$scope.bate.toFixed(2);
		return $scope.bate;
	};
	$scope.whole=function(id){
		$scope.num=id;
		$scope.jsonpfun();
	}
	$scope.jsonpfun();
	
}]);



//歌曲播放
myApp.controller("playController",["$scope","jsonpService","$http","$interval","$routeParams","$location","$sce",function($scope,jsonpService,$http,$interval,$routeParams,$location,$sce){
	console.log($routeParams.play);
	$scope.jsonpfun=function(){
		jsonpService.jsonp("http://i.y.qq.com/v8/fcg-bin/fcg_get_song_detail.fcg?songid="+$routeParams.play,function(data){
			$scope.data=data;
			console.log($scope.data);
			$scope.daurl="http://ws.stream.qqmusic.qq.com/"+data.data.songinfo.songid+".m4a?fromtag=38";
			console.log($scope.daurl)
			$scope.locetex="";
			if($scope.data.data.info!=null&&$scope.data.data.info.length){
				$scope.lyrics=$scope.data.data.info[$scope.data.data.info.length-1].content.value.split('\n');
				var it=0;
				var locetex=[];
				for(var i=0;i<$scope.lyrics.length;i++){
					if($scope.lyrics[i].split(']')[1].length>0){
						locetex[it]=$scope.lyrics[i].split(']')[1];
						it++;
					}
				}
				$scope.locetex=locetex;
			}else{
				$scope.locetexwww="木有歌词  ┻━┻︵╰(‵□′)╯︵┻━┻";
			}
			console.log($scope.locetex)
			$scope.$apply();
		})
	}
	$scope.music="播放";
	$scope.jsonpfun();
	var videoId=document.getElementById("videoId");
	$scope.objff=false;
	$scope.muted=false;
	$scope.iconPlay=function(){ 
	    if (!videoId.paused) {
	        videoId.pause();
	       $scope.music="播放";
	    }else{
	        videoId.play();
	        $scope.music="暂停";
	    }
	    $scope.objff=!$scope.objff;
	};
	$scope.voice=function(){
        $scope.muted=!$scope.muted;
        if(videoId.muted==false){
        	videoId.muted=true;
        }else{
        	videoId.muted=false;
        }
    }
	$scope.trustSrc = function(url){
		console.log(url)
		return $sce.trustAsResourceUrl(url);
	}
	//播放器
	$scope.present="0.00";
	$scope.preospe="0.00";
	$scope.currdura="0%";
	videoId.ontimeupdate=function(){
//		$scope.present=(this.duration/60).toFixed(2);
//		$scope.preospe=(this.currentTime/60).toFixed(2);
		$scope.durat(1,this.duration);
		$scope.durat(2,this.currentTime);
		$scope.currdura=(this.currentTime/this.duration)*100+"%";
		console.log(this.currentTime/this.duration);
		$scope.$apply();
	}
	$scope.durat=function(a,e){
		var dua=Math.floor(e/60);
		var dub=Math.floor((e/60).toFixed(2).split(".")[1]*0.6);
		if(a==1){
			$scope.present=dua+":"+dub;
		}else{
			$scope.preospe=dua+":"+dub;
		}
//		console.log($scope.present)
//		console.log($scope.preospe)
	}
//	var progiff=document.getElementById("progiff");
//	var progi=document.getElementById("progi");
//	var ta;
//	var tc=0;
//	progi.onmousedown=function(e){
//		console.log(e)
//		ta=e.clientX;
//		tc=9;
//	}
//	progi.onmouseup=function(e){
//		console.log(tc)
//		console.log(e.clientX);
//		progi.style.left=(e.clientX-ta)/progiff.offsetWidth*progiff.offsetWidth-50+"px";
//	}
//	progi.onmousemove=function(e){
//		tc=0;
//		progi.style.left=(e.clientX-ta)/progiff.offsetWidth*progiff.offsetWidth-50+"px";
//		ta=0;
//	}
	
	//播放器
}]);

//mv播放
myApp.controller("mvplayController",["$scope","jsonpService","$http","$interval","$routeParams",function($scope,jsonpService,$http,$interval,$routeParams){
	console.log($routeParams.mvplay)
	$scope.playmv="http://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?autoplay=1&vid="+$routeParams.mvplay;
	var embedmv=document.getElementById("embedmv");
	embedmv.src=$scope.playmv;
	console.log($scope.playmv)
}]);
