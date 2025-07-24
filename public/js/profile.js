$(document).ready(function () {
    const API_BASE_URL = 'http://localhost:3000/';
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        alert("You must be logged in first!");
        window.location.href = '/login.html';
        return;
    }

    $('#header').load('/header.html', function (response, status, xhr) {
        if (status == "error") {
            console.error("Failed to load header:", xhr.status, xhr.statusText);
        } else {
            document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function (el) {
                new bootstrap.Dropdown(el);
            });

            $('#login-link, #register-link').addClass('d-none');
            $('#user-dropdown').removeClass('d-none');

            $.get(`/api/users/customers/${userId}`, function (res) {
                if (res.success && res.data) {
                    const data = res.data;
                    const fullName = `${data.fname || ''} ${data.lname || ''}`.trim();
                    $('#username').text(fullName || 'USER');
                    if (data.image_path) {
                        $('.profile-img').attr('src', `/${data.image_path}`);
                    }
                }
            });
        }
    });

    $('#userId').val(userId);

    fetchProfileData(userId);

    function fetchProfileData(userId) {
        $.ajax({
            url: `/api/users/customers/${userId}`,
            method: 'GET',
            success: function (res) {
                if (res.success && res.data) {
                    const data = res.data;
                    $('#title').val(data.title || '');
                    $('#fname').val(data.fname || '');
                    $('#lname').val(data.lname || '');
                    $('#addressline').val(data.addressline || '');
                    $('#town').val(data.town || '');
                    $('#phone').val(data.phone || '');
                    if (data.image_path) {
                        $('#profileImagePreview').attr('src', `/${data.image_path}`);
                    }
                }
            },
            error: function () {
                console.warn('No profile found.');
            }
        });
    }

    $('#image').on('change', function () {
        const file = this.files[0];
        if (file) {
            $('#profileImagePreview').attr('src', URL.createObjectURL(file));
        }
    });

    $('#profileForm').on('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        formData.set('userId', userId);

        $.ajax({
            url: '/api/users/update-profile',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                $('#profileMsg').text(' Profile saved!').css('color', 'green');
                fetchProfileData(userId);
            },
            error: function (err) {
                $('#profileMsg').text(' Failed to save.').css('color', 'red');
                console.error(err);
            }
        });
    });

    function deactivateAccount(password) {
        Swal.fire({
            title: 'Processing...',
            html: 'Please wait while we deactivate your account',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();

                const userIdInt = parseInt(userId, 10);
                if (isNaN(userIdInt)) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Invalid user session. Please log in again.',
                        icon: 'error'
                    });
                    return;
                }

                $.ajax({
                    url: `${API_BASE_URL}api/users/deactivate`,
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        userId: userIdInt,  
                        password: password
                    }),
                    success: function (res) {
                        if (res.success) {
                            Swal.fire({
                                title: 'Account Deactivated',
                                text: 'Your account has been deactivated successfully',
                                icon: 'success'
                            }).then(() => {
                                // Clear local storage and redirect
                                localStorage.clear();
                                window.location.href = 'login.html';
                            });
                        } else {
                            Swal.fire({
                                title: 'Error',
                                text: res.message || res.error || 'Failed to deactivate account',
                                icon: 'error'
                            });
                        }
                    },
                    error: function (err) {
                        console.error('Deactivation error:', err);
                        const errorMsg = err.responseJSON?.message || err.responseJSON?.error || 'Server error during deactivation';
                        Swal.fire({
                            title: 'Error',
                            text: errorMsg,
                            icon: 'error'
                        });
                    }
                });
            }
        });
    }

    initHeader();
    fetchProfileData();
});