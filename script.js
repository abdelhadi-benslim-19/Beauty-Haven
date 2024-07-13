// Load the navbar
fetch('navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar-container').innerHTML = data;
});

// Load the footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    });



// Function to display favorite products in the modal
function displayFavoriteProductsModal() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteModalBody = document.getElementById('favoriteModalBody');
    favoriteModalBody.innerHTML = ''; // Clear previous content
    // Example: Display favorite product cards in the modal
    favorites.forEach(productId => {
        const productCard = document.createElement('div');
        productCard.classList.add('card', 'mb-3');
        productCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Product ${productId}</h5>
                <p class="card-text">Product description goes here.</p>
                <button class="btn btn-danger btn-remove-favorite-modal" data-product-id="${productId}">Remove from Favorites</button>
            </div>
        `;
        favoriteModalBody.appendChild(productCard);
    });

    // Event listener to remove product from favorites within the modal
    favoriteModalBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-remove-favorite-modal')) {
            const productId = event.target.getAttribute('data-product-id');
            toggleFavorite(productId);
            // Refresh the modal content after removal
            displayFavoriteProductsModal();
        }
    });
}

// Event listener when the modal is shown
document.getElementById('favoriteModal').addEventListener('shown.bs.modal', function () {
    displayFavoriteProductsModal();
});


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

