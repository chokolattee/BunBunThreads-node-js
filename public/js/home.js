$(document).ready(function () {
    $('#category-filter, #price-filter').on('change', function () {
    applyFilters();
});



function applyFilters() {
    const selectedCategory = $('#category-filter').val(); 
    const selectedPrice = $('#price-filter').val(); 

    $.ajax({
        method: "GET",
        url: `${url}api/item`,
        dataType: 'json',
        success: function (data) {
            $("#items").empty();
            const productsGrid = $('<div class="products-grid-container"></div>');
            $("#items").append(productsGrid);

            let filteredItems = data.rows;

            // Filter by Category
            if (selectedCategory !== 'all') {
                filteredItems = filteredItems.filter(item => item.category_id == selectedCategory);
            }

            // Filter by Price
            if (selectedPrice !== 'all') {
                filteredItems = filteredItems.filter(item => {
                    const price = parseFloat(item.sell_price);
                    if (selectedPrice === '1000+') return price > 1000;
                    const [min, max] = selectedPrice.split('-').map(Number);
                    return price >= min && price <= max;
                });
            }

            if (filteredItems.length === 0) {
                productsGrid.append('<div class="no-results">No products match your filter.</div>');
            } else {
                $.each(filteredItems, function (key, value) {
                    const itemCard = `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${imageBaseUrl}${value.image1}" alt="${value.description}" 
                                     onerror="this.src='${imageBaseUrl}placeholder.jpg'; this.onerror=null;">
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${value.item_name}</h3>
                                <div class="product-price">₱${value.sell_price}</div>
                                <div class="product-stock">Stock: ${value.quantity ?? 0}</div>
                                <div class="product-actions">
                                    <div class="quantity-selector">
                                        <input type="number" class="quantity-input" min="1" max="${value.quantity ?? 1}" value="1">
                                    </div>
                                    <div class="action-buttons">
                                        <a href="details.html?id=${value.item_id}" class="btn-view-details">
                                            <i class="fas fa-eye"></i>
                                        </a>
                                        <button class="btn-add-cart add-to-cart" 
                                            data-id="${value.item_id}"
                                            data-description="${value.description}"
                                            data-price="${value.sell_price}"
                                            data-image="${value.image1}"
                                            data-stock="${value.quantity ?? 0}">
                                            <i class="fas fa-shopping-cart"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    productsGrid.append(itemCard);
                });
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


    const url = 'http://localhost:3000/';
    const imageBaseUrl = 'http://localhost:3000/images/';
    var itemCount = 0;

    const getCart = () => {
        let cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const isUserLoggedIn = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        return token && userId;
    }
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

    $.ajax({
        method: "GET",
        url: `${url}api/item`,
        dataType: 'json',
        success: function (data) {
            $("#items").empty();
            const productsGrid = $('<div class="products-grid-container"></div>');
            $("#items").append(productsGrid);

            $.each(data.rows, function (key, value) {
                const itemCard = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${imageBaseUrl}${value.image}" alt="${value.description}" onerror="this.src='${imageBaseUrl}placeholder.jpg'; this.onerror=null;">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${value.item_name}</h3>
                        <div class="product-price">₱${value.sell_price}</div>
                        <div class="product-stock">Stock: ${value.quantity ?? 0}</div>
                        <div class="product-actions">
                            <div class="quantity-selector">
                                <input type="number" class="quantity-input" min="1" max="${value.quantity ?? 1}" value="1">
                            </div>
                            <div class="action-buttons">
                                <a href="details.html?id=${value.item_id}" class="btn-view-details">
                                    <i class="fas fa-eye"></i>
                                   
                                </a>
                                <button class="btn-add-cart add-to-cart" 
                                    data-id="${value.item_id}"
                                    data-description="${value.description}"
                                    data-price="${value.sell_price}"
                                    data-image="${value.image}"
                                    data-stock="${value.quantity ?? 0}">
                                    <i class="fas fa-shopping-cart"></i>
                                   
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
                productsGrid.append(itemCard);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });

    

    $(document).on('click', '.add-to-cart', function () {
        if (!isUserLoggedIn()) {
            alert('Please sign in to add items to your cart');
            window.location.href = 'login.html';
            return;
        }

        const $productCard = $(this).closest('.product-card');
        const qty = parseInt($productCard.find('.quantity-input').val());
        const id = $(this).data('id');
        const description = $(this).data('description');
        const price = parseFloat($(this).data('price'));
        const image = $(this).data('image');
        const stock = parseInt($(this).data('stock'));

        let cart = getCart();
        let existing = cart.find(item => item.item_id == id);

        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({
                item_id: id,
                item_name: $productCard.find('.product-name').text(),
                description: description,
                price: price,
                image_path: image, // Use raw name (e.g. "3.jpg"), not full URL
                stock: stock,
                quantity: qty
            });


        }

        saveCart(cart);
        itemCount++;
        $('#itemCount').text(itemCount).css('display', 'block');
        console.log(cart);

        window.location.href = 'cart.html';
    });

    $("#home").load("header.html", function () {
        const cart = getCart();
        $('#itemCount').text(cart.length).toggle(cart.length > 0);
    });


});