<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>LCA--环境影响评价</title>
    
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
  <script src="<%=basePath %>js/edo/edo.js" type="text/javascript"></script>
   <script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
   <script src="<%=basePath %>js/utils.js" type="text/javascript"></script>
  <script src="<%=basePath %>js/lcc/lciaCalculate.js" type="text/javascript"></script>
</html>
