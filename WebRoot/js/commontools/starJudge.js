
//'<span onmouseover="alert(1);" class="little_start_full"></span><span class="little_start_half"></span><span class="little_start_null"></span><span class="big_start_half"></span><span class="big_start_null"></span><span class="big_start_full"></span>'
//创建大星星

function starJudge_big(mouseOverEvent,clickEvent,rate){
	var mi = Edo.create({
	   type: 'label',
	   score: 4,
	   startClick: function(index){
	   		
	   		clickEvent(index);
	   },
	   mouseOver: function(index){
	   		mouseOverEvent(index);
	   }
	});
	var miId = mi.id;
		
	var outStr = '';
	
	if(rate == null || rate == 0 || rate == ''){
		outStr += '<div id="'+miId+'_bigstar_1" onmouseover=onStarClick(1,"'+miId+'"); onclick=onStarChoose(1,"'+miId+'"); class="big_start_full"></div>';
		outStr += '<div id="'+miId+'_bigstar_2" onmouseover=onStarClick(2,"'+miId+'"); onclick=onStarChoose(2,"'+miId+'"); class="big_start_full"></div>';
		outStr += '<div id="'+miId+'_bigstar_3" onmouseover=onStarClick(3,"'+miId+'"); onclick=onStarChoose(3,"'+miId+'"); class="big_start_full"></div>';
		outStr += '<div id="'+miId+'_bigstar_4" onmouseover=onStarClick(4,"'+miId+'"); onclick=onStarChoose(4,"'+miId+'"); class="big_start_null"></div>';
		outStr += '<div id="'+miId+'_bigstar_5" onmouseover=onStarClick(5,"'+miId+'"); onclick=onStarChoose(5,"'+miId+'"); class="big_start_null"></div>';	
	}else{
		for(var ii = 1; ii <= (rate-rate%1); ii++){
			outStr += '<div id="'+miId+'_bigstar_'+ii+'" onmouseover=onStarClick('+ii+',"'+miId+'"); onclick=onStarChoose('+ii+',"'+miId+'"); class="big_start_full"></div>';
		}
		if(rate%1 < 0.5){
			for(jj=ii;jj<=5;jj++){
				outStr += '<div id="'+miId+'_bigstar_'+jj+'" onmouseover=onStarClick('+jj+',"'+miId+'"); onclick=onStarChoose('+jj+',"'+miId+'"); class="big_start_null"></div>';				
			}
		}else{
			outStr += '<div id="'+miId+'_bigstar_'+ii+'" onmouseover=onStarClick('+ii+',"'+miId+'"); onclick=onStarChoose('+ii+',"'+miId+'"); class="big_start_half"></div>';				
			ii++;
			for(jj=ii;jj<=5;jj++){
				outStr += '<div id="'+miId+'_bigstar_'+jj+'" onmouseover=onStarClick('+jj+',"'+miId+'"); onclick=onStarChoose('+jj+',"'+miId+'"); class="big_start_null"></div>';				
			}
		}
	}
	
	
	mi.set('text', outStr);
	
	this.getBigStar = function(){
		return mi;
	}		
}

function getresultstar(){
	var mi = Edo.create({
		   type: 'label',
		   score: 4,
		   startClick: function(index){
		   		
		   		clickEvent(index);
		   },
		   mouseOver: function(index){
		   		mouseOverEvent(index);
		   }
		});
	var miId = mi.id;
	var outStr = '';
	outStr += '<div id="'+miId+'_bigstar_1" class="big_start_full"></div>';
	outStr += '<div id="'+miId+'_bigstar_2" class="big_start_full"></div>';
	outStr += '<div id="'+miId+'_bigstar_3" class="big_start_full"></div>';
	outStr += '<div id="'+miId+'_bigstar_4" class="big_start_null"></div>';
	outStr += '<div id="'+miId+'_bigstar_5" class="big_start_null"></div>';	
	mi.set('text', outStr);
	return mi;
}
function setscore(e,mi){
	var miId = mi.id;
	var i=1;
	if(document.all){
		for(var i=1;i<=e;i++){
			document.getElementById(miId+'_bigstar_'+i).setAttribute("className","big_start_full");	
		}
		for(var j=e+1;j<=5;j++){
			document.getElementById(miId+'_bigstar_'+j).setAttribute("className","big_start_null");	
		}
	}
	else{
		  for(var i=1;i<=e;i++){
				document.getElementById(miId+'_bigstar_'+i).setAttribute("class","big_start_full");	
			}
			for(var i=e+1;i<=5;i++){
				document.getElementById(miId+'_bigstar_'+i).setAttribute("class","big_start_null");	
			}
		}
}
//控制star显示的方法
function onStarClick(e,id){
	if(document.all){
	   for(var i=1;i<=e;i++){
			document.getElementById(id+'_bigstar_'+i).setAttribute("className","big_start_full");	
		}
		for(var i=e+1;i<=5;i++){
			document.getElementById(id+'_bigstar_'+i).setAttribute("className","big_start_null");	
		}
	}
	else{
	  for(var i=1;i<=e;i++){
			document.getElementById(id+'_bigstar_'+i).setAttribute("class","big_start_full");	
		}
		for(var i=e+1;i<=5;i++){
			document.getElementById(id+'_bigstar_'+i).setAttribute("class","big_start_null");	
		}
	}	
	
	Edo.get(id).mouseOver(e);
}

//控制star点击
function onStarChoose(index,mId){
	Edo.get(mId).startClick(index);
}
