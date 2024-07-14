$(document).ready(function() {
    var productsData = []; // Replace with your actual product data array

    // Function to generate product cards
    function generateProducts(products) {
        var productsHtml = '';
        var productsPerRow = 3; // Products per row

        // Load favorites from local storage
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        // Load cart items from local storage
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            var isFavorite = favorites.includes(product.name); // Check if the product is in favorites
            var cartItem = cart.find(function(item) {
                return item.name === product.name;
            });
            var quantityInCart = cartItem ? cartItem.quantity : 0;

            productsHtml += '<div class="col-md-4 mb-4">';
            productsHtml += '<div class="card product-card position-relative">';
            productsHtml += '<img src="' + product.image + '" class="card-img-top" alt="' + product.name + '">';

            // Heart icon for favorites
            productsHtml += '<button class="btn btn-outline-danger btn-favorite position-absolute top-0 end-0">';
            productsHtml += '<i class="' + (isFavorite ? 'fas fa-heart' : 'far fa-heart') + '"></i></button>';

            // View details button centered over image, hidden by default
            productsHtml += '<a href="#" class="btn btn-primary btn-view-details position-absolute top-50 start-50 translate-middle d-none">View Details</a>';

            productsHtml += '<div class="card-body">';
            productsHtml += '<h5 class="card-title">' + product.name + '</h5>';
            productsHtml += '<p class="card-text">$' + product.price.toFixed(2) + '</p>'; // Display price with 2 decimals

            // Add to cart button centered
            if (quantityInCart > 0) {
                productsHtml += '<div class="text-center">';
                productsHtml += '<button class="btn btn-success btn-add-to-cart" data-product-name="' + product.name + '">Add to Cart (' + quantityInCart + ')</button>';
                productsHtml += '</div>';
            } else {
                productsHtml += '<div class="text-center">';
                productsHtml += '<a href="#" class="btn btn-primary btn-add-to-cart" data-product-name="' + product.name + '">Add to Cart</a>';
                productsHtml += '</div>';
            }

            productsHtml += '</div>'; // Close card-body
            productsHtml += '</div>'; // Close card
            productsHtml += '</div>'; // Close col

            // Insert products every productsPerRow items
            if ((i + 1) % productsPerRow === 0 || (i + 1) === products.length) {
                $('#productsCarousel .carousel-item.active .row').append(productsHtml);
                productsHtml = ''; // Reset productsHtml for next row
            }
        }
    }

    // Function to generate favorite products
    function generateFavoriteProducts() {
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        var favoriteProducts = productsData.filter(function(product) {
            return favorites.includes(product.name);
        });

        var favoriteHtml = '<div class="row">';
        favoriteProducts.forEach(function(product) {
            favoriteHtml += '<div class="col-4 mb-2">'; // Use col-4 for 3 products per row, adjust as needed
            favoriteHtml += '<div class="card favorite-product">';
            favoriteHtml += '<img src="' + product.image + '" class="card-img-top" alt="' + product.name + '">';
            favoriteHtml += '<div class="card-body">';
            favoriteHtml += '<h5 class="card-title">' + product.name + '</h5>';
            favoriteHtml += '<p class="card-text">$' + product.price.toFixed(2) + '</p>';
            favoriteHtml += '<button class="btn btn-danger btn-remove-from-favorites" data-product-name="' + product.name + '">Remove</button>'; // Add remove button
            favoriteHtml += '</div>';
            favoriteHtml += '</div>';
            favoriteHtml += '</div>';
        });
        favoriteHtml += '</div>';

        $('#favoriteModalBody').html(favoriteHtml);
    }

    // Function to update cart items display
    function updateCartDisplay() {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var cartHtml = '';

        if (cart.length === 0) {
            cartHtml = '<p>Your cart is currently empty.</p>';
        } else {
            cartHtml = '<div class="list-group">';
            cart.forEach(function(item, index) {
                cartHtml += '<div class="list-group-item">';
                cartHtml += '<div class="row align-items-center">';
                cartHtml += '<div class="col-2">';
                cartHtml += '<img src="' + item.image + '" alt="' + item.name + '" class="img-fluid">';
                cartHtml += '</div>';
                cartHtml += '<div class="col-5">';
                cartHtml += '<h6 class="mb-0">' + item.name + '</h6>';
                cartHtml += '<p class="mb-0">$' + item.price.toFixed(2) + '</p>';
                cartHtml += '</div>';
                cartHtml += '<div class="col-3 text-end">';
                cartHtml += '<button class="btn btn-sm btn-danger btn-remove-from-cart" data-cart-index="' + index + '">&times;</button>';
                cartHtml += '</div>';
                cartHtml += '<div class="col-2">';
                cartHtml += '<span class="badge bg-primary">' + item.quantity + '</span>';
                cartHtml += '</div>';
                cartHtml += '</div>';
                cartHtml += '</div>';
            });
            cartHtml += '</div>';
        }

        $('#offcanvasCart .offcanvas-body').html(cartHtml);
    }

    // Initial product data (generating 32 products with random values)
    for (var i = 1; i <= 32; i++) {
        productsData.push({
            name: 'Product ' + i,
            price: (Math.floor(Math.random() * 100) + 10),
            brand: 'Brand ' + (Math.floor(Math.random() * 3) + 1), // Random brand from 1 to 3
            type: 'Type ' + (Math.floor(Math.random() * 3) + 1), // Random type from 1 to 3
            image: 'https://via.placeholder.com/300'
        });
    }

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
        var button = $(this);
        var productElement = button.closest('.product-card');
        var productName = productElement.find('.card-title').text();

        // Load favorites from local storage
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.includes(productName)) {
            // Remove from favorites
            var index = favorites.indexOf(productName);
            if (index > -1) {
                favorites.splice(index, 1);
            }
            button.find('i').removeClass('fas fa-heart').addClass('far fa-heart');
        } else {
            // Add to favorites
            favorites.push(productName);
            button.find('i').removeClass('far fa-heart').addClass('fas fa-heart');
        }

        // Update local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites updated:', favorites);

        // Update favorite modal
        generateFavoriteProducts();
    });

    // Handle remove from favorites button click
    $(document).on('click', '.btn-remove-from-favorites', function(e) {
        e.preventDefault();
        var productName = $(this).data('product-name');
        var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Remove from favorites
        var index = favorites.indexOf(productName);
        if (index > -1) {
            favorites.splice(index, 1);
        }

        // Update local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites updated:', favorites);

        // Update favorite modal
        generateFavoriteProducts();
    });

    // Handle add to cart button click
    $(document).on('click', '.btn-add-to-cart', function(e) {
        e.preventDefault();
        var productElement = $(this).closest('.product-card');
        var productName = productElement.find('.card-title').text();
        var product = productsData.find(function(item) {
            return item.name === productName;
        });

        // Load cart items from local storage
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var cartItem = cart.find(function(item) {
            return item.name === productName;
        });

        if (cartItem) {
            // Increment quantity if product is already in the cart
            cartItem.quantity++;
        } else {
            // Add new item to cart
            cart.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart updated:', cart);

        // Update add to cart button with quantity
        var quantityInCart = cartItem ? cartItem.quantity : 1;
        $(this).text('Add to Cart (' + quantityInCart + ')').removeClass('btn-primary').addClass('btn-success');

        // Update cart display
        updateCartDisplay();
    });

    // Handle remove from cart button click
    $(document).on('click', '.btn-remove-from-cart', function() {
        var index = $(this).data('cart-index');
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (index > -1) {
            cart.splice(index, 1);
        }

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart updated:', cart);

        // Update cart display
        updateCartDisplay();
    });

    // Generate favorite products on page load
    generateFavoriteProducts();

    // Update cart display on page load
    updateCartDisplay();
});
