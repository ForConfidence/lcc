<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>department</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="<%=basePath %>js/edo/res/css/edo-all.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
		var basePath='<%=basePath%>';
	</script>
  </head>
  
  <body>
    
  </body>
  <script src="<%=basePath %>js/edo/edo.js" type="text/javascript"></script>
  <script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
  <script src="<%=basePath %>js/lcalccutils.js" type="text/javascript"></script>
  <script src="<%=basePath %>js/lcc//department.js" type="text/javascript"></script>
</html>
