        // JavaScript to generate products
        $(document).ready(function() {
            // Function to generate product cards
            function generateProducts() {
                var products = '';
                var productCount = 32; // Number of products to generate
                var productsPerRow = 3; // Products per row

                for (var i = 1; i <= productCount; i++) {
                    products += '<div class="col-md-4 mb-4">';
                    products += '<div class="card product-card">';
                    products += '<img src="https://via.placeholder.com/300" class="card-img-top" alt="Makeup Product ' + i + '">';
                    products += '<div class="card-body">';
                    products += '<h5 class="card-title">Makeup Product ' + i + '</h5>';
                    products += '<p class="card-text">$' + (Math.floor(Math.random() * 100) + 10) + '</p>'; // Random price
                    products += '<a href="#" class="btn btn-primary">View Details</a>';
                    products += '</div>';
                    products += '</div>';
                    products += '</div>';

                    // Insert products every productsPerRow items
                    if (i % productsPerRow === 0 || i === productCount) {
                        $('#makeupCarousel .carousel-item.active .row').append(products);
                        products = ''; // Reset products for next row
                    }
                }
            }

            generateProducts(); // Call the function to generate products
        });