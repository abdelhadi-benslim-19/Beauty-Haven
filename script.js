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

