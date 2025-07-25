$(document).ready(function () {
    // Check if user is authorized to access this page
    function checkAdminAccess() {
        const userRole = localStorage.getItem('userRole');
        const token = localStorage.getItem('token');

        // If no token, redirect to login
        if (!token) {
            bootbox.alert({
                message: "Please log in to access this page.",
                callback: function () {
                    window.location.href = 'login.html';
                }
            });
            return false;
        }

        // If user is not Admin, show error and redirect
        if (userRole !== 'Admin') {
            bootbox.alert({
                message: "Access Denied: You do not have permission to access this page. Only administrators can manage users.",
                callback: function () {
                    window.location.href = 'home.html';
                }
            });
            return false;
        }

        return true;
    }

    // Check access before initializing the page
    if (!checkAdminAccess()) {
        return;
    }

    const url = 'http://localhost:3000/';
    let currentViewMode = 'pagination';
    let currentPage = 1;
    let itemsPerPage = 15;
    let allUsers = [];
    let filteredUsers = [];
    let isLoading = false;
    let hasMoreData = true;

    // Add authorization header to all AJAX requests
    $.ajaxSetup({
        beforeSend: function (xhr) {
            const token = localStorage.getItem('token');
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }
        },
        error: function (xhr, status, error) {
            // Handle unauthorized access
            if (xhr.status === 401) {
                bootbox.alert({
                    message: "Your session has expired. Please log in again.",
                    callback: function () {
                        localStorage.clear();
                        window.location.href = 'login.html';
                    }
                });
            } else if (xhr.status === 403) {
                bootbox.alert({
                    message: "Access Denied: You do not have permission to perform this action.",
                    callback: function () {
                        window.location.href = 'home.html';
                    }
                });
            }
        }
    });

    // Load all users
    function loadUsers() {
        isLoading = true;
        $('#loading-spinner').show();

        $.ajax({
            url: `${url}api/users/users`,
            method: 'GET',
            data: {
                page: 1,
                limit: 1000, // Load all users for client-side filtering
                search: ''
            },
            dataType: 'json',
            success: function (response) {
                if (response.rows) {
                    allUsers = response.rows;
                    filteredUsers = [...allUsers];
                    renderUsers();
                    if (currentViewMode === 'pagination') {
                        setupPagination();
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error('Error loading users:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to load user data.',
                });
            },
            complete: function () {
                isLoading = false;
                $('#loading-spinner').hide();
            }
        });
    }

    // Render users based on current view mode
    function renderUsers() {
        const tbody = $('#ubody');
        tbody.empty();

        let usersToRender = [];
        if (currentViewMode === 'pagination') {
            const startIndex = (currentPage - 1) * itemsPerPage;
            usersToRender = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
        } else {
            // For infinite scroll, show all loaded users
            usersToRender = filteredUsers;
        }

        if (usersToRender.length === 0) {
            tbody.append('<tr><td colspan="9" class="text-center">No users found</td></tr>');
            return;
        }

        usersToRender.forEach(user => {
            const roleClass = `role-${user.role.toLowerCase()}`;
            const statusClass = `status-${user.status.toLowerCase()}`;

            tbody.append(`
                <tr data-id="${user.id}">
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.addressline || ''}</td>
                    <td>${user.town || ''}</td>
                    <td>${user.phone || ''}</td>
                    <td><span class="role-badge ${roleClass}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
                    <td><span class="status-badge ${statusClass}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-warning roleBtn" data-id="${user.id}" title="Change Role">
                                <i class="fas fa-user-tag"></i>
                            </button>
                            <button class="btn btn-sm btn-secondary statusBtn" data-id="${user.id}" title="Change Status">
                                <i class="fas fa-toggle-on"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    // Setup pagination
    function setupPagination() {
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        const pagination = $('#pagination');
        pagination.empty();

        if (totalPages <= 1) return;

        // Previous button
        pagination.append(`
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
            </li>
        `);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            pagination.append(`
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
        }

        // Next button
        pagination.append(`
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
            </li>
        `);
    }

    // Handle pagination clicks
    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const page = parseInt($(this).data('page'));
        if (!isNaN(page) && page !== currentPage) {
            currentPage = page;
            renderUsers();
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    });

    // View mode toggle handler
    $('.view-option').click(function () {
        const viewMode = $(this).data('view');
        if (viewMode !== currentViewMode) {
            currentViewMode = viewMode;
            $('.view-option').removeClass('active');
            $(this).addClass('active');

            // Toggle UI elements
            if (viewMode === 'infinite') {
                $('#pagination-container').hide();
                $('#scroll-info').show();
            } else {
                $('#pagination-container').show();
                $('#scroll-info').hide();
                currentPage = 1;
            }

            renderUsers();
            if (viewMode === 'pagination') {
                setupPagination();
            }
        }
    });

    // Search functionality
    $('#searchButton').click(function () {
        performSearch();
    });

    $('#userSearch').keypress(function (e) {
        if (e.which === 13) {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = $('#userSearch').val().toLowerCase();
        if (searchTerm) {
            filteredUsers = allUsers.filter(user =>
                (user.name && user.name.toLowerCase().includes(searchTerm)) ||
                (user.email && user.email.toLowerCase().includes(searchTerm)) ||
                (user.addressline && user.addressline.toLowerCase().includes(searchTerm)) ||
                (user.town && user.town.toLowerCase().includes(searchTerm)) ||
                (user.phone && user.phone.toLowerCase().includes(searchTerm)) ||
                (user.role && user.role.toLowerCase().includes(searchTerm)) ||
                (user.status && user.status.toLowerCase().includes(searchTerm)) ||
                (user.id && user.id.toString().includes(searchTerm))
            );
        } else {
            filteredUsers = [...allUsers];
        }

        currentPage = 1;
        renderUsers();
        if (currentViewMode === 'pagination') {
            setupPagination();
        }
    }

    // Infinite scroll handler
    $(window).scroll(function () {
        if (currentViewMode !== 'infinite' || isLoading || !hasMoreData) return;

        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('#loading-spinner').show();
            setTimeout(() => {
                $('#loading-spinner').hide();
            }, 500);
        }
    });

    // Add new admin form submission
    $('#addUserForm').submit(function (e) {
        e.preventDefault();

        // Validate form
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }

        // Validate password length
        const password = $('#add_password').val();
        if (password.length < 8) {
            $('#add_password').addClass('is-invalid');
            $('#add_password').next('.invalid-feedback').remove();
            $('#add_password').after(`<div class="invalid-feedback">Password must be at least 8 characters long</div>`);
            return;
        }

        const adminData = {
            name: $('#add_name').val(),
            email: $('#add_email').val(),
            password: password,
            role: 'Admin'
        };

        Swal.fire({
            title: 'Creating Admin...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        $.ajax({
            method: "POST",
            url: `${url}api/users/create-admin`,
            data: JSON.stringify(adminData),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                $("#userModal").modal("hide");
                $('#addUserForm')[0].reset();
                $('#addUserForm').removeClass('was-validated');
                loadUsers();

                Swal.fire({
                    icon: 'success',
                    title: 'Admin Added!',
                    text: 'New admin has been added successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: function (xhr) {
                let errorMsg = 'Failed to add admin. Please try again.';
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errorMsg = xhr.responseJSON.error;
                    // Special handling for duplicate email
                    if (xhr.responseJSON.error.includes('email')) {
                        $('#add_email').addClass('is-invalid');
                        $('#add_email').next('.invalid-feedback').remove();
                        $('#add_email').after(`<div class="invalid-feedback">${errorMsg}</div>`);
                    }
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: errorMsg,
                });
            }
        });
    });

    // Clear validation errors when modal is hidden
    $('#userModal').on('hidden.bs.modal', function () {
        $('#addUserForm')[0].reset();
        $('#addUserForm').removeClass('was-validated');
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
    });

    // Change role button click handler
    $('#ubody').on('click', '.roleBtn', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        $('#role_user_id').val(id);
        $('#roleModal').modal('show');
    });

    // Submit role change
    $("#roleSubmit").on('click', function (e) {
        e.preventDefault();

        const userId = $('#role_user_id').val();
        const newRole = $('#new_role').val();

        if (!newRole) {
            $('#roleForm')[0].reportValidity();
            return;
        }

        Swal.fire({
            title: 'Updating Role...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        $.ajax({
            method: "PUT",
            url: `${url}api/users/users/${userId}/role`,
            data: JSON.stringify({ role: newRole }),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                $('#roleModal').modal("hide");
                loadUsers();

                Swal.fire({
                    icon: 'success',
                    title: 'Role Updated!',
                    text: 'User role has been updated successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: xhr.responseJSON?.error || 'Failed to update role. Please try again.',
                });
            }
        });
    });

    // Change status button click handler
    $('#ubody').on('click', '.statusBtn', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        $('#status_user_id').val(id);
        $('#statusModal').modal('show');
    });

    // Submit status change
    $("#statusSubmit").on('click', function (e) {
        e.preventDefault();

        const userId = $('#status_user_id').val();
        const newStatus = $('#new_status').val();

        if (!newStatus) {
            $('#statusForm')[0].reportValidity();
            return;
        }

        Swal.fire({
            title: 'Updating Status...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        $.ajax({
            method: "PUT",
            url: `${url}api/users/users/${userId}/status`,
            data: JSON.stringify({ status: newStatus }),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                $('#statusModal').modal("hide");
                loadUsers();

                Swal.fire({
                    icon: 'success',
                    title: 'Status Updated!',
                    text: 'User status has been updated successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: xhr.responseJSON?.error || 'Failed to update status. Please try again.',
                });
            }
        });
    });

    // Reset forms when modals are hidden
    $('#userModal').on('hidden.bs.modal', function () {
        $('#addUserForm')[0].reset();
    });

    $('#roleModal').on('hidden.bs.modal', function () {
        $('#roleForm')[0].reset();
    });

    $('#statusModal').on('hidden.bs.modal', function () {
        $('#statusForm')[0].reset();
    });

    // Initialize
    loadUsers();
});