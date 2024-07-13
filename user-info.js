document.addEventListener("DOMContentLoaded", function () {
    // Simulate fetching user information from localStorage or an API
    const user = {
        name: "James Lee",
        email: "jameslee@example.com",
        phone: "+1234567890"
        // Add more fields as necessary
    };

    // Populate the user information on the dashboard
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-fullname").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-phone").textContent = user.phone;
});
