<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'categoryTest.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    ok<br />
    <s:iterator value="categories">
    	<table border="1">
    		<tr><td>编号：</td><td><s:property value="id" /></td><td rowspan="3" ><a href="http://localhost:8080/Myproject20140827/categoryAction!delete.action?id=<s:property value="id" />">删除</a></td></tr>
    		<tr><td>名字：</td><td><s:property value="name" /></td></tr>
    		<tr><td>英文名：</td><td><s:property value="englishname" /></td></tr>
    		<tr><td>介绍：</td><td><s:property value="intro" /></td><td rowspan="2" ><a href="http://localhost:8080/Myproject20140827/js/lcc//categoryTest2.jsp">修改</a></td></tr>
    		<tr><td>父类号：</td><td><s:property value="parentid" /></td></tr>
    	</table>
    </s:iterator>
    ok<br />
    <s:property value="wjbasecategory.name"/>
  </body>
</html>
