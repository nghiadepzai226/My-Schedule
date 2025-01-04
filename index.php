<?php

session_start();
$_SESSION = array();
session_destroy();
require_once("config/app.php");

// Create database if dont exist
// Create table users
$sql = "SHOW TABLE LIKE `users`";
$result = @mysqli_query($conn, $sql);
if (!$result) {
    $sql = "CREATE TABLE `schedule`.`users` (
            `user_id` INT NOT NULL AUTO_INCREMENT , 
            `user_email` VARCHAR(256) NOT NULL , 
            `user_password` VARCHAR(256) NOT NULL , 
            `first_name` VARCHAR(256) NOT NULL , 
            `last_name` VARCHAR(256) NOT NULL , 
            PRIMARY KEY (`user_id`)
            ) ENGINE = InnoDB;";

    $result = @mysqli_query($conn, $sql);
}

// Create table date
$sql = "SHOW TABLE LIKE `dates`";
$result = @mysqli_query($conn, $sql);
if (!$result) {
    $sql = "CREATE TABLE `schedule`.`dates` (
            `date_id` INT NOT NULL AUTO_INCREMENT , 
            `date` INT NOT NULL , 
            `month` INT NOT NULL , 
            `year` INT NOT NULL , 
            PRIMARY KEY (`date_id`)
            ) ENGINE = InnoDB;";

    $result = @mysqli_query($conn, $sql);
}

// Create table tasks
$sql = "SHOW TABLE LIKE `tasks`";
$result = @mysqli_query($conn, $sql);
if (!$result) {
    $sql = "CREATE TABLE `schedule`.`tasks` (
            `task_id` INT NOT NULL AUTO_INCREMENT , 
            `user_id` INT NOT NULL , 
            `date_id` INT NOT NULL , 
            `task_name` VARCHAR(256) NOT NULL , 
            `start_time` VARCHAR(256) NOT NULL , 
            `end_time` VARCHAR(256) NOT NULL , 
            PRIMARY KEY (`task_id`),
            FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
            FOREIGN KEY (`date_id`) REFERENCES `dates`(`date_id`)
            ) ENGINE = InnoDB;";
    $result = @mysqli_query($conn, $sql);
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Doan Trung Nghia">
    <title>Log In</title>

    <!-- Font link -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="assets/CSS/style.css">
    <link rel="stylesheet" href="assets/Css/register.css">

    <!-- JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js" defer></script>
    <script src="assets/JS/login-validation.js" defer></script>
</head>

<body>
    <div class="main-register">

        <div class="brand">
            <h1>My Calendar</h1>
            <span><i>Keep track of your career!</i></span>
            <img src="assets/images/calendar.png" alt="Calendar Logo">
        </div>


        <div class="register-form">
            <h3>Log In</h3>
            <form id="login-form">
                <label for="email">Email <span class="form-error" id="email-empty">(email is required)</span><span class="form-error" id="email-wrong">(wrong email)</span></label>
                <input type="text" id="email" name="email">

                <label for="pw">Password <span class="form-error" id="pw-empty">(password is required)</span><span class="form-error" id="pw-wrong">(wrong password)</span></label>
                <input type="password" id="pw" name="pw">

                <a href="signup.php">Create new account</a>
                <button type="submit">Log in</button>
            </form>
        </div>

    </div>
</body>

</html>