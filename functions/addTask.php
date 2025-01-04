<?php

require_once('../config/app.php');
if (
    isset($_SESSION['user_id']) &&
    isset($_POST['date']) &&
    isset($_POST['month']) &&
    isset($_POST['year']) &&
    isset($_POST['taskName']) &&
    isset($_POST['startTime']) &&
    isset($_POST['endTime'])
) {
    $date = (int) $_POST['date'];
    $month = (int) $_POST['month'];
    $year = (int) $_POST['year'];
    $taskName = $_POST['taskName'];
    $startTime = $_POST['startTime'];
    $endTime = $_POST['endTime'];
    $user_id = (int) $_SESSION['user_id'];
    $response = ['success' => false];
    $date_id;

    // check if date exist
    $sql = "SELECT * FROM dates WHERE `date` = $date AND `month` = $month AND `year` = $year";
    $result = @mysqli_query($conn, $sql);
    $getDateId = @mysqli_fetch_assoc($result);

    // add to date if not exist
    if (!isset($getDateId)) {
        $sql = "INSERT INTO dates (`date`, `month`, `year`)
                VALUES ($date, $month, $year)";
        $result = @mysqli_query($conn, $sql);
        if ($result) {
            $sql = "SELECT * FROM dates WHERE `date` = $date AND `month` = $month AND `year` = $year";
            $result = @mysqli_query($conn, $sql);
            $getDateId = @mysqli_fetch_assoc($result);
            $date_id = (int) $getDateId['date_id'];
        }
    } else {
        $date_id = (int) $getDateId['date_id'];
    }

    // add task
    $sql = "INSERT INTO tasks (user_id, date_id, task_name, start_time, end_time) VALUES ($user_id, $date_id, '$taskName', '$startTime', '$endTime')";
    $result = @mysqli_query($conn, $sql);
    if($result) {
        $response = ['success' => true];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

