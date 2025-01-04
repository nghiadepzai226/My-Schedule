<?php
session_start();
if (!isset($_SESSION['mainPage']) && !isset($_SESSION['user'])) {
    header('location: index.php');
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Doan Trung Nghia">
    <title>My Schedule</title>

    <!-- Font link -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <!-- CSS -->
    <link rel="stylesheet" href="assets/CSS/style.css">
    <link rel="stylesheet" href="assets/Css/schedule.css">

    <!-- JS -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js" defer></script>
    <script src="assets/JS/schedule.js" defer></script>
</head>

<body>
    <div class="user">
        <img src="assets/images/user.jpg" alt="User">
        <div class="user-name">
            <h3><?php echo $_SESSION['user']?></h3>
            <a class="logout" href="index.php">Log Out</a>
        </div>
    </div>
    <div class="main-content">
        <div class="calendar">
            <div class="header">
                <button id="prev">&#8249;</button>
                <h3></h3>
                <button id="next">&#8250;</button>
            </div>

            <div class="main-calendar">
                <ul class="weekdays">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>

                <ul class="dates"></ul>
            </div>
        </div>
        <div class="tasks">
            <h1 id="task-wday"></h1>
            <p id="task-date"></p>

            <div class="to-do-list"></div>

            <div class="no-event">
                <h1>No Events</h1>
            </div>

            <div class="add-task-button">
                <i class="bi bi-plus-circle"></i>
            </div>
        </div>
    </div>

    <div class="add-event">
        <div class="event-header">
            <h3>Add Event</h3>
            <i class="fa fa-close close-event-form"></i>
        </div>
        <div class="event-main">
            <form id="add-event-form">
                <input type="text" id="task-name" name="task-name" placeholder="Event name">
                <div class="time">
                    <div class="time-option">
                        <div class="select">
                            <span>Select method</span>
                            <i class="fa fa-angle-down"></i>
                        </div>
                        <div class="options-list">
                            <div class="option start-end">Start-end</div>
                            <div class="option deadline">Deadline</div>
                        </div>
                    </div>

                    <div class="startAndEnd">
                        <div class="start">
                            <label for="time-start" id="label-start">Time-start</label>
                            <input type="time" id="time-start" name="time-start">
                        </div>
                        <div class="end">
                            <label for="time-end" id="label-end">Time-end</label>
                            <input type="time" id="time-end" name="time-end">
                        </div>
                    </div>

                    <div class="deadline-container">
                        <div class="deadline-time">
                            <label for="deadlineSubmit" id="label-deadline">Deadline</label>
                            <input type="time" id="deadlineSubmit" name="deadlineSubmit">
                        </div>
                    </div>
                </div>
                <button type="submit">Add Event</button>
            </form>
        </div>
    </div>
</body>

</html>