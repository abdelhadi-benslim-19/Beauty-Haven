$(document).ready(function() {
    var productsData = []; // Replace with your product data array

    // Function to generate product cards
    function generateProducts(products) {
        var productsHtml = '';
        var productsPerRow = 3; // Products per row

        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            productsHtml += '<div class="col-md-4 mb-4">';
            productsHtml += '<div class="card product-card position-relative">';
            productsHtml += '<img src="' + product.image + '" class="card-img-top" alt="' + product.name + '">';

            // Heart icon for favorites
            productsHtml += '<button class="btn btn-outline-danger btn-favorite position-absolute top-0 end-0"><i class="far fa-heart"></i></button>';

            // View details button centered over image, hidden by default
            productsHtml += '<a href="#" class="btn btn-primary btn-view-details position-absolute top-50 start-50 translate-middle d-none">View Details</a>';

            productsHtml += '<div class="card-body">';
            productsHtml += '<h5 class="card-title">' + product.name + '</h5>';
            productsHtml += '<p class="card-text">$' + product.price.toFixed(2) + '</p>'; // Display price with 2 decimals

            // Add to cart button centered
            productsHtml += '<div class="text-center">';
            productsHtml += '<a href="#" class="btn btn-primary btn-add-to-cart">Add to Cart</a>';
            productsHtml += '</div>';

            productsHtml += '</div>'; // Close card-body
            productsHtml += '</div>'; // Close card
            productsHtml += '</div>'; // Close col

            // Insert products every productsPerRow items
            if ((i + 1) % productsPerRow === 0 || (i + 1) === products.length) {
                $('#makeupCarousel .carousel-item.active .row').append(productsHtml);
                productsHtml = ''; // Reset productsHtml for next row
            }
        }
    }

    // Initial product data (replace with your actual product data)
    productsData = [
        { name: 'Product 1', price: 19.99, brand: 'Brand 1', type: 'Type 1', image: 'https://via.placeholder.com/300' },
        { name: 'Product 2', price: 24.99, brand: 'Brand 2', type: 'Type 2', image: 'https://via.placeholder.com/300' },
        // Add more products as needed
    ];

    // Generate initial product cards
    generateProducts(productsData);

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

    // Filter by Price Range
    $('#priceRange').on('input', function() {
        var priceRangeValue = $(this).val();
        $('#priceValue').text('$0 - $' + priceRangeValue);
        filterProducts();
    });

    // Filter by Brand
    $('#brandFilter').change(function() {
        filterProducts();
    });

    // Filter by Type
    $('.type-filter').change(function() {
        filterProducts();
    });

    // Apply Filters Button Click
    $('#applyFilterBtn').click(function() {
        filterProducts();
    });

    // Function to filter products based on selected filters
    function filterProducts() {
        var filteredProducts = productsData.filter(function(product) {
            var priceRangeValue = parseInt($('#priceRange').val());
            var price = product.price;
            var brandFilter = $('#brandFilter').val();
            var typeFilters = $('.type-filter:checked').map(function() {
                return $(this).val();
            }).get();

            // Apply filters
            var priceCondition = price <= priceRangeValue;
            var brandCondition = (brandFilter === 'all' || product.brand === brandFilter);
            var typeCondition = (typeFilters.length === 0 || typeFilters.includes(product.type));

            return priceCondition && brandCondition && typeCondition;
        });

        // Clear current products
        $('#makeupCarousel .carousel-item.active .row').empty();

        // Generate filtered products
        generateProducts(filteredProducts);
    }
});
