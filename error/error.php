<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php if(isset($_SESSION['error_mysql']) && $_SESSION['error_mysql']): ?>
        <h1>Sorry, we've some technical issues, please try again latter</h1>
    <?php endif; ?>
   
</body>

</html>