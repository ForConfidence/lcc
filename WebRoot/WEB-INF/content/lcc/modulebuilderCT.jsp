<%@ page contentType="text/html;charset=UTF-8"%>
<%
String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
	<head>
		<title>环境化设计知识服务平台</title>
		<script type="text/javascript">
			var basePath='<%=basePath%>';
		</script>
	</head>
	<body onload="definemodule()" style="margin: 0px;  width: 100%; overflow:hidden;" scroll="no">
	<div id="moduledefineContainer"
		style="position:absolute;overflow:hidden;top:50px;width:0px;right:0px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="stagebutton"
		style="position:absolute;overflow:hidden;left:0px;top:200px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="modulebutton"
		style="position:absolute;overflow:hidden;right:0px;top:200px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="builder"
		style="position:absolute;overflow:hidden;top:0px;left:0px;right:0px;bottom:0px;cursor:default;padding-top:0px;">
		<%-- <iframe id="aa" height= 100%  width=100%  src="<%=basePath%>js/lcc//modulebuilder.jsp"></iframe> --%>
		<iframe id="aa" height= 100%  width=100%  src="<%=basePath%>lcc/indexpage!modulebuilder.action"></iframe>
	</div>
	<div id="productContainer"
		style="position:absolute;overflow:hidden;top:20px;left:0px;width:0px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="stageContainer"
		style="position:absolute;overflow:hidden;top:50px;left:0px;width:0px;width:0px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="detaildiv"
		style="position:absolute;overflow:hidden;top:0px;bottom:0px;right:0px;width:0px;cursor:default;padding-top:0px;z-index:1;background:F3F6FB;">
	</div>
	</body>
</html>
  	
  	<script type="text/javascript">
  		//整个应用的全局变量
  		//系统用户
  		cims201User = null;
  		
  	</script>
     	<link rel="stylesheet" type="text/css"
			href="<%=basePath%>css/welcome.css">
		<link href="<%=basePath%>js/edo/res/css/edo-all.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=basePath%>css/icon.css" rel="stylesheet"
			type="text/css" />

		<script src="<%=basePath%>js/edo/edo.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcalccutils.js" type="text/javascript"></script>	
		<script src="<%=basePath%>js/lcc/lca_modulebuilder_CT.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/lcc/task/stepone.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/steptwo.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepthree.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/modulebuildcommit.js" type="text/javascript"></script>
    	<%-- <script src="<%=basePath %>js/lcc/task/stepone.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/steptwo.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepthree.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/lcasimplemodulecommit.js" type="text/javascript"></script> --%>
	
	<!-- 统计分析 -->
	
	<!-- 系统管理 -->
		<!-- 本体编辑管理 -->
	<!--标准集成  -->
	
	<script type="text/javascript">

  /*   var c=document.getElementById('moduledefineContainer');
    var t;
    var m=0;
    //展开模型信息panel
    function move(){ 
		     if(m<200){
		         m=m+10;
    			 c.style.width=m;
    			 t=setTimeout('move()',10);
		     }
	     	
    }
    //重置宽度计数m
    function resetm(){
    	m=0;
    } */
   
    //a.addEventListener('mouseover', movep, false);
   
 

 	//构建模型信息
/*  	function modulepaneldefine(){
	    Edo.create(
		    {
	        id:'mdct',
	        type: 'panel',
	       	title: '模型信息',
	        width: 200,
	        height: 500,
	        verticalGap:'0',
	        horizontalGap:'0',
	  		padding:[0,0,0,0],
	    	render: document.getElementById('moduledefineContainer'),
	        collapseProperty: 'width',
	        enableCollapse: true,
	        layout:'vertical',
	        titlebar:[
	           {
	            cls:'e-titlebar-toggle-east',
	            icon: 'button',
	            align:'left',
	            onclick: function(e){
	            var b=document.getElementById('moduledefineContainer');
	            if(b.style.width="200px"){
	            b.style.width="0px";
	            resetm();
	            createmb();
	            }
	            }
	            }
	        ]});
             
	     var modulecontent = Edo.create(
	   	    {type: 'box',width: '100%',id:'modulecontent',height:'100%',border: [1,1,1,1],padding: [0,0,0,0],layout: 'vertical',
	      	    children: [
	      	    //				           
	      	    {	type : 'formitem',label : '模板名称:',labelWidth : 80,labelAlign : 'left',
	      	    children : [{type : 'text',width : 80,id : 'modulename'}]
	      	    },
	      	    {	type : 'formitem',label : '模板备注:',labelWidth : 80,labelAlign : 'left',
	      	    children : [{type : 'text',width : 80,id : 'modulenote'}]
	      	    }
	      	   
	      	    ]
	      	});
       Edo.get('mdct').addChild(modulecontent);
       }  */
       
       //创建查看模型信息按钮
    /* unction createmb(){
	    var mb=document.getElementById('modulebutton');
		 mb.style.width='20px';
		 mb.style.height='100px';
		 var e1 = document.createElement("input");  
	     e1.type = "button";
	     //e.style.top='200px';
	     e1.style.width='20px';
	     e1.style.height='100px';
	     e1.style.right='0px';
	     e1.style.position='absolute';
	     e1.value = '查\n看\n模\n型\n';  
	     e1.onclick=function(){
	    	 mb.removeChild(e1);
	    	 move();
	     }
	     mb.appendChild(e1);	
    } */
 </script>
