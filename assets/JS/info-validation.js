$(document).ready(function () {

    $('#information-form').on('submit', (e) => {
        e.preventDefault();

        const fname = $('#fname').val().trim();
        const lname = $('#lname').val().trim();
        const pattern = /^[A-Za-z][A-Za-z\s\-']{0,49}$/;
        const errors = {
            fnameMissing: $('#fname-empty'),
            fnameWrong: $('#fname-wrong'),
            lnameWrong: $('#lname-wrong')
        }
        Object.values(errors).forEach(error => error.hide());
        let isValid = true;

        // check first name
        if (fname === '') {
            isValid = false;
            errors.fnameMissing.css('display', 'inline-block');
        } else if (!pattern.test(fname)) {
            isValid = false;
            errors.fnameWrong.css('display', 'inline-block');
        }

        // check last name (optional)
        if (lname !== '') {
            if (!pattern.test(lname)) {
                isValid = false;
                errors.lnameWrong.css('display', 'inline-block');
            }
        }

        if (!isValid) {
            return false;
        }

        $.ajax({
            type: 'POST',
            url: 'functions/signup-process.php',
            data: { fname: fname, lname: lname, action: 'secondStep' },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    // create account successfully
                    window.location.href = 'yourSchedule.php';
                } else {
                    console.log("fail to create account!")
                }
            },
            error: function (xhr, status, error) {
                console.log("Error Status: " + status);  // Logs the status of the request (e.g., timeout, error)
                console.log("Error Message: " + error);  // Logs the error message
                console.log("Response: " + xhr.responseText);  // Logs the response from the server
                alert('Error connecting to the server. Please try again later.');
            }
        });


    });

});