实现留言功能，你需要以下几个关键步骤：

1. **前端页面：HTML 表单**
2. **表单验证**
3. **后端处理：接收数据并写入 SQL 数据库**
4. **提示用户提交成功**
5. **清空表单**

我将逐步向你介绍如何实现这个功能，使用的技术栈为前端（HTML + Bootstrap 5 + JavaScript）和后端（PHP 或 Python，来处理数据并写入 SQL 数据库）。

### 1. 前端页面：HTML 表单

首先，我们创建一个简单的留言表单，包含名字、邮箱、留言内容输入框和提交按钮。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>留言功能</title>
</head>
<body>
    <div class="container mt-5">
        <h2>留言板</h2>
        <form id="commentForm">
            <div class="mb-3">
                <label for="name" class="form-label">名字</label>
                <input type="text" class="form-control" id="name" placeholder="请输入您的名字" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">邮箱地址</label>
                <input type="email" class="form-control" id="email" placeholder="请输入您的邮箱" required>
            </div>
            <div class="mb-3">
                <label for="message" class="form-label">留言内容</label>
                <textarea class="form-control" id="message" rows="3" placeholder="请输入您的留言" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">提交留言</button>
        </form>
        <div id="successMessage" class="alert alert-success mt-3" style="display:none;">提交成功！</div>
    </div>

    <script>
        document.getElementById('commentForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // 简单的 Ajax 请求，用于将表单数据发送给后台
            fetch('submit_comment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 显示成功提示
                    document.getElementById('successMessage').style.display = 'block';
                    
                    // 清空表单
                    document.getElementById('commentForm').reset();
                } else {
                    alert('提交失败，请重试。');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('提交失败，请重试。');
            });
        });
    </script>
</body>
</html>
```

### 2. 后端处理：提交数据到 SQL 数据库
你可以使用 PHP 或 Python Flask 来处理用户提交的数据，并将其写入 SQL 数据库。

#### 使用 PHP 示例：
在你的服务器上创建 `submit_comment.php` 文件，负责将数据写入数据库。

```php
<?php
// 数据库连接信息
$servername = "localhost";
$username = "root";  // 数据库用户名
$password = "";  // 数据库密码
$dbname = "comments_db";  // 数据库名

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取 POST 数据
$data = json_decode(file_get_contents("php://input"));

// 准备 SQL 语句，防止 SQL 注入
$stmt = $conn->prepare("INSERT INTO comments (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $data->name, $data->email, $data->message);

// 执行 SQL 语句
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

// 关闭连接
$stmt->close();
$conn->close();
?>
```

#### 数据库表结构
首先，在数据库中创建一个名为 `comments` 的表，用来存储留言信息：

```sql
CREATE TABLE comments (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 前端提示提交成功
在 JavaScript 部分，如果收到后端成功的响应，会显示提交成功的提示信息，并清空表单。

### 4. 完整功能的工作流程：
1. 用户填写表单并提交。
2. 前端通过 Ajax 向服务器发送请求。
3. 后端接收请求并将数据写入数据库。
4. 后端返回成功信息。
5. 前端根据成功信息显示提交成功提示并清空表单。

你可以根据需要调整数据的存储方式和界面的设计。如果有进一步的需求或需要帮助的地方，可以告诉我！


Gulnur
Mugi
Uranbileg
Vincent
