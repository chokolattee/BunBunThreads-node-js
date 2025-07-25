$(document).ready(function () {
    const API_BASE_URL = 'http://localhost:3000';
    let shippingRates = [];
    let checkoutCart = [];
    let itemsTotal = 0;

    function checkAuth() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (!token || !userId) {
            alert('⛔ Please log in first.');
            window.location.href = '/login.html';
            return false;
        }
        return true;
    }

    // Only proceed if authenticated
    if (!checkAuth()) {
        return;
    }
    
    // Initialize checkout
    function initializeCheckout() {
        checkoutCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];

        if (checkoutCart.length === 0) {
            $('#cartSummary').html('<p class="text-muted">No items in checkout.</p>');
            $('#checkoutForm button').prop('disabled', true);
            return false;
        }

        renderCartItems();
        loadShippingRegions();
        return true;
    }

    // Render cart items
    function renderCartItems() {
        itemsTotal = checkoutCart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        $('#itemsTotal').text(itemsTotal.toFixed(2));
        $('#grandTotal').text(itemsTotal.toFixed(2));

        let cartHtml = '';
        checkoutCart.forEach(item => {
            const subtotal = item.price * item.quantity;
            const imagePath = item.image_path ?
                (item.image_path.startsWith('/images/') ? item.image_path : `/images/${item.image_path}`) :
                '/images/bunbun.png';

            cartHtml += `
                <div class="checkout-card">
                    <img src="${imagePath}" alt="${item.item_name}" onerror="this.src='/images/bunbun.png'">
                    <div class="checkout-details">
                        <h6>${item.item_name}</h6>
                        <small>Price: ₱${parseFloat(item.price).toFixed(2)}</small><br>
                        <small>Quantity: ${item.quantity}</small><br>
                        <strong>Subtotal: ₱${subtotal.toFixed(2)}</strong>
                    </div>
                </div>`;
        });
        $('#cartSummary').html(cartHtml);
    }

    // Load shipping regions
    function loadShippingRegions() {
        return $.ajax({
            url: `${API_BASE_URL}/api/orders/shipping`,
            method: 'GET',
            timeout: 5000
        }).then(function (res) {
            if (!res.success || !Array.isArray(res.data)) {
                throw new Error('Invalid shipping data received');
            }

            shippingRates = res.data;
            $('#shippingRegion').empty().append('<option value="">Select shipping region</option>');

            res.data.forEach(region => {
                $('#shippingRegion').append(`
                    <option value="${region.shipping_id}" data-rate="${region.rate}">
                        ${region.region} (₱${parseFloat(region.rate).toFixed(2)})
                    </option>
                `);
            });
        }).fail(function (xhr, status, error) {
            console.error('Failed to load shipping regions:', error);
            $('#shippingRegion').html('<option value="">Error loading shipping options</option>');
            throw new Error('Failed to load shipping options. Please try again later.');
        });
    }

    // Verify customer
    function verifyCustomer() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            return Promise.reject(new Error('Please log in to place an order'));
        }

        return $.ajax({
            url: `${API_BASE_URL}/api/users/customers/${userId}`,
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (!res.success || !res.data || !res.data.customer_id) {
                throw new Error('Please complete your profile first');
            }
            return res.data.customer_id;
        });
    }

    // Place order
    function placeOrder(customerId) {
        const shipping_id = $('#shippingRegion').val();
        if (!shipping_id) {
            throw new Error('Please select a shipping region');
        }

        const datePlaced = new Date().toISOString().split('T')[0];
        const shippingRate = parseFloat($('#shippingRegion').find(':selected').data('rate')) || 0;
        const grandTotal = itemsTotal + shippingRate;

        // Prepare items in API-expected format
        const orderItems = checkoutCart.map(item => ({
            item_id: item.item_id || item.id, // Use whichever field your API expects
            quantity: Number(item.quantity),
            price: Number(item.price)
        }));

        const orderPayload = {
            customer_id: customerId,
            date_placed: datePlaced,
            shipping_id: shipping_id,
            shipping_fee: shippingRate,
            total_amount: grandTotal,
            status: 'Pending',
            items: orderItems
        };

        console.log("Order Payload:", JSON.stringify(orderPayload, null, 2));

        return $.ajax({
            url: `${API_BASE_URL}/api/orders`,
            method: 'POST',
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(orderPayload)
        });
    }

    // Event handlers
    $('#shippingRegion').on('change', function () {
        const selectedRate = parseFloat($(this).find(':selected').data('rate')) || 0;
        $('#shippingRate').text(selectedRate.toFixed(2));
        $('#grandTotal').text((itemsTotal + selectedRate).toFixed(2));
    });

    $('#checkoutForm').on('submit', function (e) {
        e.preventDefault();
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();

        submitBtn.prop('disabled', true).text('Processing...');

        verifyCustomer()
            .then(customerId => placeOrder(customerId))
            .then(response => {
                if (!response.success) {
                    throw new Error(response.message || 'Order failed');
                }

                // Clear carts
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const updatedCart = cart.filter(cartItem =>
                    !checkoutCart.some(checkedOut => checkedOut.id === cartItem.id)
                );

                localStorage.setItem('cart', JSON.stringify(updatedCart));
                localStorage.removeItem('checkoutCart');

                alert('✅ Order placed successfully!');
                window.location.href = '/myorders.html';
            })
            .catch(error => {
                console.error('Checkout error:', error);
                alert(`❌ ${error.message}`);
                submitBtn.prop('disabled', false).text(originalText);
            });
    });

    // Initialize
    initializeCheckout();
});