<?php

require_once("../config/app.php");


if (
    isset($_SESSION['user_id']) &&
    isset($_POST['task_id']) &&
    isset($_POST['date']) &&
    isset($_POST['month']) &&
    isset($_POST['year'])
) {
    $user_id = $_SESSION['user_id'];
    $task_id = $_POST['task_id'];
    $date = $_POST['date'];
    $month = $_POST['month'];
    $year = $_POST['year'];
    $response = ['success' => false];

    $sql = "DELETE FROM tasks WHERE user_id = $user_id AND task_id = $task_id";
    $result = @mysqli_query($conn, $sql);

    if ($result) {
        $response = ['success' => true];
    }

    // delete date if no event
    $sql = "SELECT * FROM dates WHERE `date` = $date AND `month` = $month AND `year` = $year";
    $result = @mysqli_query($conn, $sql);
    $getDateId = @mysqli_fetch_assoc($result);
    $date_id = (int) $getDateId['date_id'];


    $sql = "SELECT * FROM tasks WHERE `date_id` = $date_id";
    $result = @mysqli_query($conn, $sql);
    $getTasks = @mysqli_fetch_assoc($result);

    if(!isset($getTasks)) {
        $sql = "DELETE FROM dates WHERE `date_id` = $date_id";
        $result = @mysqli_query($conn, $sql);
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}