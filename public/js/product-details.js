$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const apiUrl = `http://localhost:3000/api/item/${productId}`;
    const imageBaseUrl = 'http://localhost:3000/images/';

    if (!productId) {
        $('#product-details').html(`<p>Product not found.</p>`);
        return;
    }

    $.ajax({
        method: 'GET',
        url: apiUrl,
        dataType: 'json',
        success: function (data) {
            const item = data.rows[0];

            const productHtml = `
                <div class="product-details-container">
                    <div class="product-images">
                        <div class="slider">
                            <img src="${imageBaseUrl}${item.image}" alt="Main image">
                            <img src="${imageBaseUrl}${item.image2 ?? 'placeholder.jpg'}" alt="Image 2">
                            <img src="${imageBaseUrl}${item.image3 ?? 'placeholder.jpg'}" alt="Image 3">
                        </div>
                    </div>
                    <div class="product-info">
                        <h2>${item.item_name}</h2>
                        <p><strong>Price:</strong> ₱${item.sell_price}</p>
                        <p><strong>Description:</strong> ${item.description}</p>
                        <p><strong>Stock:</strong> ${item.quantity}</p>
                    </div>
                </div>
            `;

            $('#product-details').html(productHtml);
        },
        error: function (err) {
            $('#product-details').html(`<p>Error loading product details.</p>`);
            console.log(err);
        }
    });
});
