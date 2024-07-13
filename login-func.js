$(document).ready(function() {
    // Handle login form submission
    $('#login-form form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve input values
        var email = $('#loginEmail').val().trim();
        var password = $('#loginPassword').val().trim();

        // Demo login credentials
        var sellerEmail = "seller@example.com";
        var sellerPassword = "seller123";
        var consumerEmail = "consumer@example.com";
        var consumerPassword = "consumer123";

        // Check against demo credentials
        if ((email === sellerEmail && password === sellerPassword) || (email === consumerEmail && password === consumerPassword)) {
            // Redirect based on role
            if (email === sellerEmail) {
                window.location.href = '/seller-dashboard.html'; // Redirect to seller dashboard
            } else if (email === consumerEmail) {
                window.location.href = '/user-dashboard.html'; // Redirect to user dashboard
            }
        } else {
            // Replace with your error handling (e.g., display error message)
            console.log("Invalid credentials");
        }
    });

    // Show register form when "Register here" link is clicked
    $('#show-register').click(function(event) {
        event.preventDefault();
        $('#login-form').addClass('d-none');
        $('#register-form').removeClass('d-none');
    });

    // Show login form when "Login here" link is clicked
    $('#show-login').click(function(event) {
        event.preventDefault();
        $('#register-form').addClass('d-none');
        $('#login-form').removeClass('d-none');
    });

    // Reset password form submission (for demo, just log email)
    $('#resetPasswordModal form').submit(function(event) {
        event.preventDefault();
        var resetEmail = $('#resetEmail').val().trim();
        console.log("Reset password requested for: " + resetEmail);
        // Close modal (for demo purposes)
        $('#resetPasswordModal').modal('hide');
    });
});
