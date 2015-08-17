<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page
	import="org.springside.modules.security.springsecurity.SpringSecurityUtils"%>
<%@ include file="/common/taglibs.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String taskid=request.getParameter("taskid");
%>

<html>
	<head>
		<title>环境化设计知识服务平台</title>
		<script type="text/javascript">
	var basePath='<%=basePath%>';
	var taskid=<%=taskid%>;
 	
</script>
		
	</head>
	<body style="margin: 0px;  width: 100%; overflow:hidden;" scroll="no">
	<div id="topbar"
		style="position:absolute;white-space:nowrap;overflow:hidden;top:0px;left:0px;right:0px;max-height:40px;height:40px;right:0px;padding:0px">
	</div>
	<div id="leftpanel"
		style="position:absolute;overflow:hidden;top:40px;width:260px;left:0px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="stagebutton"
		style="position:absolute;overflow:hidden;left:0px;top:200px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="builder"
		style="position:absolute;overflow:hidden;top:40px;left:260px;right:0px;bottom:0px;cursor:default;padding-top:0px;">
		<iframe id="aa" height= 100%  width=100%  src="<%=basePath%>lcc/indexpage!taskmodulebuilder.action"></iframe>
	</div>
	<div id="detaildiv"
		style="position:absolute;overflow:hidden;top:0px;bottom:0px;right:0px;width:0px;cursor:default;padding-top:0px;z-index:1;background:F3F6FB;">
	</div>
	</body>
</html>

		<link href="<%=basePath %>js/edo/res/css/edo-all.css" rel="stylesheet"type="text/css" />
		<link href="<%=basePath %>css/taskcommit.css" rel="stylesheet"
			type="text/css" />
    	<script src="<%=basePath %>js/edo/edo.js" type="text/javascript"></script>
  		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcalccutils.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/lcataskcommit_CT.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepone.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/steptwo.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepthree.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepfour.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepfive.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/task/stepsix.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/swfupload/swfupload.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/lcataskcommit.js" type="text/javascript"></script>
	<script type="text/javascript">
  		//整个应用的全局变量
  		//系统用户
  		cims201User = null;
  		//获取当前登录用户的姓名
  		//bbl修改
  		currentUser ='bbl';  		
  	</script>
	
