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
