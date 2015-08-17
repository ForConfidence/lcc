<%@page import="flex.messaging.util.URLDecoder"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String modulename = (String)request.getParameter("modulename");
String lciamethod = (String)request.getParameter("lciamethod");
String impactcategory = (String)request.getParameter("impactcategory");
String newdatasetid = (String)request.getParameter("newdatasetid");
String moduleid = (String)request.getParameter("moduleid");

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'lcaReport.jsp' starting page</title>
    
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
  	<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="height:470px;width:860"></div>
  </body>
  <script>
  	var modulename=<%=modulename%>;
  	var lciamethod=<%=lciamethod%>;
  	var impactcategory=<%=impactcategory%>;
  	var newdatasetid=<%=newdatasetid%>;
  	var moduleid=<%=moduleid%>;
  </script>
	<script type="text/javascript" src="<%=basePath%>js/lcc/echarts.js"></script>
  	<script src="<%=basePath %>js/edo/edo.js" type="text/javascript"></script>
  	<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
  	<script src="<%=basePath %>js/utils.js" type="text/javascript"></script>
  	<script src="<%=basePath %>js/lcc/lcaReport.js" type="text/javascript"></script>
  	<script>
  		//alert('jsp');
  		addnewbar(data);
  		//alert(processnamelist);
  		//alert(nameList);
  		//alert(valueList);
  		//dataGetAndSet();
  	</script>
</html>
