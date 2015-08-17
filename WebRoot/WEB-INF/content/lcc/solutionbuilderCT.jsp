<%@ page contentType="text/html;charset=UTF-8"%>
<%
String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
			String moduleid=request.getParameter("moduleid");
String componentid=request.getParameter("componentid");
String branchid=request.getParameter("branchid");
%>

<html>
	<head>
		<title>环境化设计知识服务平台</title>
		<script type="text/javascript">
			var basePath='<%=basePath%>';
		</script>
	</head>
	<body onload="" style="margin: 0px;  width: 100%; overflow:hidden;" scroll="no">
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
		<iframe id="aa" height= 100%  width=100%  src="<%=basePath%>lcc/indexpage!solutionbuilder.action"></iframe>
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
		<script type="text/javascript" src="<%=basePath%>js/lcc/echarts.js"></script>
		<script src="<%=basePath%>js/edo/edo.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lcalccutils.js" type="text/javascript"></script>	
		<script src="<%=basePath%>js/lcc/lca_solutionbuilder_CT.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/lcc/task/stepone.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/steptwo.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepthree.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/lcasimplemodulecommit.js" type="text/javascript"></script>
    	<%-- <script src="<%=basePath %>js/lcc/task/stepone.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/steptwo.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepthree.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/lcasimplemodulecommit.js" type="text/javascript"></script> --%>
	
	<!-- 统计分析 -->
	
	<!-- 系统管理 -->
		<!-- 本体编辑管理 -->
	<!--标准集成  -->
	
	<script type="text/javascript">

 		moduleobj.oldsupermoduleid=<%=moduleid%>;
		moduleobj.productid=<%=componentid%>;
		var branchid=<%=branchid%>;
		var data= cims201.utils.getData(basePath+'lcc/lccmodule!getbranchUUIDbybranchid.action',{branchid:branchid});
		moduleobj.oldbranchUUID=data.branchUUID;
        new getModuleTree();
 </script>
