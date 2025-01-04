<?php

session_start();

// database configuration
$host = "localhost";
$dbuser = "root";
$dbpassword = "";
$dbname = "schedule";

$conn = @mysqli_connect($host, $dbuser, $dbpassword, $dbname);
if (!$conn) {
    $_SESSION['error_mysql'] = true;
    header("location: error/error.php");
    exit;
} 

$_SESSION['error_mysql'] = false;