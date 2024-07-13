$(document).ready(function() {
    $("#login-form form").submit(function(e) {
        e.preventDefault();
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();

        // Check the login credentials
        if (email === "danielpark@example.com" && password === "danielpark123") {
            window.location.href = "seller-dashboard.html";
        } else if (email === "jameslee@example.com" && password === "jameslee123") {
            window.location.href = "user-dashboard.html";
        } else {
            alert("Invalid email or password.");
        }
    });
});
