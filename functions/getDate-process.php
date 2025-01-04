<?php

require_once("../config/app.php");

if (
    isset($_SESSION['user_id'])
) {
 
    $user_id = $_SESSION['user_id'];
    $date_ids = [];

    $sql = "SELECT * FROM tasks WHERE user_id = '$user_id'";
    $result = @mysqli_query($conn, $sql);
    $getDateIDs = @mysqli_fetch_all($result, MYSQLI_ASSOC);

    if(count($getDateIDs) > 0) {
        foreach ($getDateIDs as $dateID) {
            $date_id = $dateID['date_id'];
            $sql = "SELECT * FROM dates WHERE date_id = $date_id";
            $result = @mysqli_query($conn, $sql);
            $getID = @mysqli_fetch_assoc($result);
            $date_ids[] = $getID;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($date_ids);

}