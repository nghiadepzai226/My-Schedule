$(document).ready(function() {
    $('#login-form').on('submit', function(e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const password = $('#pw').val().trim();
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        let isValid = true;

        if(email === '') {
            $('#email-empty').css('display', 'inline-block');
            $('#email-wrong').hide();
            isValid = false;
        } else {
            $('#email-empty').hide()

            if(emailPattern.test(email)) {
                $('#email-wrong').hide();
            } else {
                $('#email-wrong').css('display', 'inline-block');
                isValid = false;
            }
        }


        if (password === '') {
            $('#pw-empty').css('display', 'inline-block');
            isValid = false;
        } else {
            $('#pw-empty').hide()
        }

        // return if front-end validation is invalid
        if(!isValid) {
            $('#pw').val('');
            return false;
        }

        // ajax technique for back-end validation
        $.ajax({
            type: 'POST',
            url: 'functions/login-process.php',
            data: {email: email, password: password},
            dataType: 'json',
            success: function(response) {
                if(response.success) {
                    // successfully login
                    $('#email-wrong').hide();
                    $('#pw-wrong').hide();
                    window.location.href = 'yourSchedule.php';
                } else {
                    $('#email-wrong').css('display', 'inline-block');
                    $('#pw-wrong').css('display', 'inline-block');
                    $('#pw').val('');
                }
            },
            error: function(xhr, status, error) {
                console.log("Error Status: " + status);  // Logs the status of the request (e.g., timeout, error)
                console.log("Error Message: " + error);  // Logs the error message
                console.log("Response: " + xhr.responseText);  // Logs the response from the server
                alert('Error connecting to the server. Please try again later.');
            }
        });
    }); 
});


