<?php

require_once("../config/app.php");
function checkEmail($email, $conn)
{

    $response = ['success' => false];

    $sql = "SELECT `user_email` FROM `users` WHERE `user_email` = '$email'";
    $result = @mysqli_query($conn, $sql);
    $checkEmail = @mysqli_fetch_assoc($result);

    if (!isset($checkEmail)) {
        // Account not exist --> can create account
        $response = ['success' => true];
    }

    return $response;
}

function firstStep($email, $password)
{
    $response = ['success' => true];

    $_SESSION['email'] = $email;
    $_SESSION['password'] = $password;
    $_SESSION['secondStep'] = true;

    return $response;

}

function secondStep($fname, $lname, $conn)
{
    $response = ['success' => false];

    if ($_SESSION['secondStep']) {
        $email = $_SESSION['email'];
        $password = $_SESSION['password'];

        $sql = "INSERT INTO `users` (user_email, user_password, first_name, last_name) VALUES ('$email', '$password', '$fname', '$lname')";
        $result = @mysqli_query($conn, $sql);

        if ($result) {
            $response = ['success' => true];
            $_SESSION['mainPage'] = true;
            $_SESSION['user'] = "{$fname} {$lname}";

            // get new user id
            $sql = "SELECT * FROM `users` WHERE `user_email` = '$email'";
            $result = @mysqli_query($conn, $sql);
            $account = @mysqli_fetch_assoc($result);
            if(isset($account)) {
                $_SESSION['user_id'] = $account['user_id'];
            }
        }
    }

    return $response;
}


// Action
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'checkEmail') {
        $email = $_POST['email'];
        $response = checkEmail($email, $conn);
    } else if ($action == 'firstStep') {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $response = firstStep($email, $password);
    } else if ($action == 'secondStep') {
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $response = secondStep($fname, $lname, $conn);
    }
}


header('Content-Type: application/json');
echo json_encode($response);
