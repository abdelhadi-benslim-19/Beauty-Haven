document.addEventListener("DOMContentLoaded", function () {
    // Simulate fetching seller information from localStorage or an API
    const seller = {
        name: "Daniel Park",
        email: "danielpark@example.com",
        phone: "+1234567890"
        // Add more fields as necessary
    };

    // Populate the seller information on the dashboard
    document.getElementById("seller-name").textContent = seller.name;
    document.getElementById("seller-fullname").textContent = seller.name;
    document.getElementById("seller-email").textContent = seller.email;
    document.getElementById("seller-phone").textContent = seller.phone;
});
