$(document).ready(function () {
    const API_BASE_URL = 'http://localhost:3000/';
    const $userDropdown = $('#user-dropdown');
    const $loginLink = $('#login-link');
    const $registerLink = $('#register-link');
    const $username = $('#username');
    const $profileImg = $('.profile-img');
    const $cartCount = $('#cart-count');

    // Initialize cart count
    updateCartCount();

    // Check authentication status and update UI
    checkAuthStatus();

    function updateCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            $cartCount.text(totalItems).toggle(totalItems > 0);
        } catch (error) {
            console.error('Error updating cart count:', error);
            $cartCount.text('0').hide();
        }
    }

    function checkAuthStatus() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            // User is logged in
            $loginLink.add($registerLink).addClass('d-none');
            $userDropdown.removeClass('d-none');
            fetchUserProfile(userId);
        } else {
            // User is not logged in
            $loginLink.add($registerLink).removeClass('d-none');
            $userDropdown.addClass('d-none');
        }
    }

    function fetchUserProfile(userId) {
        $.ajax({
            url: `${API_BASE_URL}api/users/customers/${userId}`,
            method: 'GET',
            success: function(res) {
                if (res.success && res.data) {
                    updateProfileUI(res.data);
                } else {
                    handleProfileError();
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching user profile:', error);
                handleProfileError();
            }
        });
    }

    function updateProfileUI(userData) {
        const fullName = `${userData.fname || ''} ${userData.lname || ''}`.trim();
        $username.text(fullName || 'USER');
        
        if (userData.image_path) {
            // Add timestamp to prevent caching issues
            const timestamp = new Date().getTime();
            $profileImg.attr('src', `/${userData.image_path}?${timestamp}`)
                .on('error', function() {
                    $(this).attr('src', '/uploads/default.jpg');
                });
        }
    }

    function handleProfileError() {
        $username.text('USER');
        $profileImg.attr('src', '/uploads/default.jpg');
    }

    window.logoutUser = function() {
        // Clear all user-related data
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('cart');
        
        // Redirect to login page
        window.location.href = '/login.html';
    };

    // Update cart count when cart changes (for other pages)
    $(window).on('storage', function(e) {
        if (e.originalEvent.key === 'cart') {
            updateCartCount();
        }
    });
});