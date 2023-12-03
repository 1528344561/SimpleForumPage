<html>
<head>
    <link href="styles.css" type="text/css" rel="stylesheet"/>
    <title>注册</title>
    <style>
        /* CSS 样式可以根据需求进行自定义 */
        .container {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .form-group input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            margin-left: auto;
            margin-right: auto;
        }
        .form-group button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4caf50;
            color: white;
            border: none;
            cursor: pointer;
        }
    </style>
    <title>Title</title>
</head>
<body>
<%@include file="header.jsp"%>

<div class="container">
    <h3>注册 SimpleForum 以使用更多功能</h3>
    <form action="注册处理页面链接" method="post">
        <div class="form-group">
            <label for="username">用户名:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">密码:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div class="form-group">
            <label for="email">邮箱:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <button type="submit">注册</button>
        </div>
    </form>
</div>


<!--结尾-->
<%@include file="foot.jsp"%>
<!--结尾-->
</body>
</html>
