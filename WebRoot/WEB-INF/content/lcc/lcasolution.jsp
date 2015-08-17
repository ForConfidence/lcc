<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>main</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="<%=basePath %>js/edo/res/css/edo-all.css" rel="stylesheet" type="text/css" />
  </head>
  
  <body>

  </body>
<!--   bbl -->
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
	  <script src="<%=basePath %>js/edo/edo.js" type="text/javascript"></script>
	  <script src="<%=basePath %>js/lcc/solutionstep/stepone.js" type="text/javascript"></script>
      <script src="<%=basePath %>js/lcc/solutionstep/steptwo.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/solutionstep/stepthree.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/solutionstep/stepfour.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/solutionstep/stepfive.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/solutionstep/stepsix.js" type="text/javascript"></script>
    	<script src="<%=basePath %>js/lcc/solutionstep/stepseven.js" type="text/javascript"></script>
	  <script src="<%=basePath %>js/lcc/lcasolution.js" type="text/javascript"></script>
	  
 
</html>
