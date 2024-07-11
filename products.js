$(document).ready(function() {
    // Function to generate product cards
    function generateProducts() {
        var products = '';
        var productCount = 32; // Number of products to generate
        var productsPerRow = 3; // Products per row

        for (var i = 1; i <= productCount; i++) {
            products += '<div class="col-md-4 mb-4">';
            products += '<div class="card product-card position-relative">';
            products += '<img src="https://via.placeholder.com/300" class="card-img-top" alt="Makeup Product ' + i + '">';

            // Heart icon for favorites
            products += '<button class="btn btn-outline-danger btn-favorite position-absolute top-0 end-0"><i class="far fa-heart"></i></button>';

            // View details button centered over image, hidden by default
            products += '<a href="#" class="btn btn-primary btn-view-details position-absolute top-50 start-50 translate-middle d-none">View Details</a>';

            products += '<div class="card-body">';
            products += '<h5 class="card-title">Makeup Product ' + i + '</h5>';
            products += '<p class="card-text">$' + (Math.floor(Math.random() * 100) + 10) + '</p>'; // Random price

            // Add to cart button centered
            products += '<div class="text-center">';
            products += '<a href="#" class="btn btn-primary btn-add-to-cart">Add to Cart</a>';
            products += '</div>';

            products += '</div>'; // Close card-body
            products += '</div>'; // Close card
            products += '</div>'; // Close col

            // Insert products every productsPerRow items
            if (i % productsPerRow === 0 || i === productCount) {
                $('#makeupCarousel .carousel-item.active .row').append(products);
                products = ''; // Reset products for next row
            }
        }
    }

    generateProducts(); // Call the function to generate products

    // Show view details button on hover
    $(document).on('mouseenter', '.product-card', function() {
        $(this).find('.btn-view-details').removeClass('d-none');
    }).on('mouseleave', '.product-card', function() {
        $(this).find('.btn-view-details').addClass('d-none');
    });

    // Handle add to favorites button click
    $(document).on('click', '.btn-favorite', function(e) {
        e.preventDefault();
        // Add your favorite handling logic here
        console.log('Added to favorites');
    });

    // Handle add to cart button click
    $(document).on('click', '.btn-add-to-cart', function(e) {
        e.preventDefault();
        // Add your add to cart handling logic here
        console.log('Added to cart');
    });
});
