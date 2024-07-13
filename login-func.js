$(document).ready(function() {
    $("#login-form form").submit(function(e) {
        e.preventDefault();
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();

        // Check the login credentials
        if (email === "seller@example.com" && password === "seller123") {
            window.location.href = "seller-dashboard.html";
        } else if (email === "consumer@example.com" && password === "consumer123") {
            window.location.href = "user-dashboard.html";
        } else {
            alert("Invalid email or password.");
        }
    });
});
