<?php

require_once("../config/app.php");

$email = $_POST['email'];
$password = $_POST['password'];

$response = ["success" => false];

$sql = "SELECT * FROM `users` WHERE `user_email` = '$email'";
$result = @mysqli_query($conn, $sql);
$account = @mysqli_fetch_assoc($result);

if(isset($account) && $account['user_password'] == $password) {
    // successfully log in
    $response = ["success" => true];
    $_SESSION['mainPage'] = true;
    $_SESSION['user'] = "{$account['first_name']} {$account['last_name']}";
    $_SESSION['user_id'] = $account['user_id'];
}

header('Content-Type: application/json');
echo json_encode($response);

