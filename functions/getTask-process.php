<?php

require_once("../config/app.php");

$date_id = null;
$tasks = [];

if (isset($_POST['year']) && isset($_POST['month']) && isset($_POST['date']) && isset($_SESSION['user_id'])) {
    $year = $_POST['year'];
    $month = $_POST['month'];
    $date = $_POST['date'];
    $user_id = $_SESSION['user_id'];

    $sql = "SELECT * FROM dates WHERE `date` = $date AND `month` = $month AND `year` = $year ";
    $result = @mysqli_query($conn, $sql);
    $getDateID = @mysqli_fetch_assoc($result);

    if (isset($getDateID)) {
        $date_id = $getDateID['date_id'];
    }

    if (isset($date_id)) {
        $sql = "SELECT * FROM tasks WHERE `date_id` = $date_id AND `user_id` = '$user_id'";
        $result = @mysqli_query($conn, $sql);
        $getTasks = @mysqli_fetch_all($result, MYSQLI_ASSOC);

        if (isset($getTasks)) {
            $tasks = $getTasks;
        }

    }

    header('Content-Type: application/json');
    echo json_encode($tasks);

}