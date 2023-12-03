<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2023/12/1
  Time: 21:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>贴吧列表</title>
</head>
<body>
<h1>贴吧列表</h1>

    <%@ page import="java.util.List" %>
    <%@ page import="your.package.name.Tieba" %>
        <% List<Tieba> tiebaList = (List<Tieba>) request.getAttribute("tiebaList"); %>

        <% for (Tieba tieba : tiebaList) { %>
    <div>
        <img src="<%= tieba.getImageUrl() %>" alt="<%= tieba.getName() %>">
        <h2><%= tieba.getName() %></h2>
    </div>
        <% } %>
</body>
</html>