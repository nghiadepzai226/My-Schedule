<?php
session_start();
if(!isset($_SESSION['secondStep'])) {
    header('location: index.php');
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Doan Trung Nghia">
    <title>Sign Up</title>

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
    <script src="assets/JS/info-validation.js" defer></script>
</head>

<body>
    <div class="main-register">

        <div class="brand">
            <h1>My Calendar</h1>
            <span><i>Keep track of your career!</i></span>
            <img src="assets/images/calendar.png" alt="Calendar Logo">
        </div>

        <div class="register-form information-form">
            <h3>Your Information</h3>
            <form id="information-form">
                <label for="fname">First name <span class="form-error" id="fname-empty">(required)</span>
                    <span class="form-error" id="fname-wrong">(Invalid)</span>
                </label>
                <input type="text" id="fname" name="fname">

                <label for="lname">Last name (optional) <span class="form-error" id="lname-wrong">(Invalid)</span></label>
                <input type="text" id="lname" name="lname">

                <a href="index.php">Already have account ?</a>
                <button type="submit">Sign Up</button>
            </form>
        </div>

    </div>
</body>

</html>