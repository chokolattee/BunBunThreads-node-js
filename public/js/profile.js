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

$('#deactivateBtn').on('click', function() {
    Swal.fire({
        title: 'Deactivate Account',
        text: 'Are you sure you want to deactivate your account? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, continue',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Prompt for password
            Swal.fire({
                title: 'Enter Your Password',
                text: 'Please enter your password to confirm account deactivation',
                input: 'password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Deactivate Account',
                confirmButtonColor: '#d33',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Password is required!'
                    }
                    if (value.length < 1) {
                        return 'Please enter your password!'
                    }
                }
            }).then((passwordResult) => {
                if (passwordResult.isConfirmed) {
                    // Call the deactivation function with the entered password
                    deactivateAccount(passwordResult.value);
                }
            });
        }
    });
});


    initHeader();
    fetchProfileData();
});