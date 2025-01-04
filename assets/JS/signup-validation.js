$(document).ready(function () {

    function checkEmailExist(email, password) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: 'functions/signup-process.php',
                data: { email: email, action: 'checkEmail' },
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        resolve(false); // email is not taken
                    } else {
                        resolve(true); // email already exists
                    }
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    // First step sign up
    $('#signup-form').on('submit', async (e) => {
        e.preventDefault();

        const inputs = {
            email: $('#email').val().trim(),
            password: $('#pw').val().trim(),
            cpassword: $('#cpw').val().trim()
        }

        const patterns = {
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            password: /^.{8,}$/
        }

        const errors = {
            emailMissing: $('#email-empty'),
            passwordMissing: $('#pw-empty'),
            confirmPasswordMissing: $('#cpw-empty'),
            emailWrong: $('#email-wrong'),
            emailExisted: $('#email-exist'),
            passwordWrong: $('#pw-wrong'),
            confirmPasswordWrong: $('#cpw-wrong')
        }

        let isValid = true;

        Object.values(errors).forEach(error => error.hide());

        // Check email empty and wrong format
        if (inputs.email == '') {
            errors.emailMissing.css('display', 'inline-block');
            isValid = false;
        } else if (!patterns.email.test(inputs.email)) {
            errors.emailWrong.css('display', 'inline-block');
            isValid = false;
        }

        // Check email exist
        if (isValid) {
            try {
                const emailExist = await checkEmailExist(inputs.email, inputs.password);
                if (emailExist) {
                    errors.emailExisted.css('display', 'inline-block');
                    isValid = false;
                }
            } catch (error) {
                console.log('Error checking email:', error);
                alert('Error connecting to the server. Please try again later.');
                isValid = false;
            }
        }


        // Check password and cpassword
        if (inputs.password == '') {
            errors.passwordMissing.css('display', 'inline-block');
            isValid = false;
        } else if (!patterns.password.test(inputs.password)) {
            errors.passwordWrong.css('display', 'inline-block');
            isValid = false;
        } else if (inputs.password !== inputs.cpassword) {
            errors.confirmPasswordWrong.css('display', 'inline-block');
            isValid = false;
        }

        // Check cpassword empty
        if (inputs.cpassword == '') {
            errors.confirmPasswordMissing.css('display', 'inline-block');
            isValid = false;
        }

        if (!isValid) {
            $('#pw').val('');
            $('#cpw').val('');
            return false;
        } else {
            $.ajax({
                type: 'POST',
                url: 'functions/signup-process.php',
                data: {email: inputs.email, password: inputs.password, action: "firstStep"},
                dataType: 'json',
                success: function(response) {
                    if(response.success) {
                        // first step complete
                        window.location.href = 'info.php';
                    } else {
                        alert("Something Wrong");
                    }
                },
                error: function (xhr, status, error) {
                    console.log("Error Status: " + status);  // Logs the status of the request (e.g., timeout, error)
                    console.log("Error Message: " + error);  // Logs the error message
                    console.log("Response: " + xhr.responseText);  // Logs the response from the server
                    alert('Error connecting to the server. Please try again later.');
                }
                
            }); 
            window.location.href = 'info.php';
        }
    });
});