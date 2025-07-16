$(document).ready(function () {
    const url = 'http://localhost:3000/';
  $('#utable').DataTable({
        ajax: {
            url: `${url}api/users/users`,
            dataSrc: "rows",
            error: function (xhr, error, thrown) {
                console.error('DataTable loading error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to load user data.',
                });
            }
        },
        dom: 'Bfrtip',
        buttons: [
            'pdf',
            'excel',
            {
                text: 'Add User',
                className: 'btn btn-primary',
                action: function (e, dt, node, config) {
                    $("#uform").trigger("reset");
                    $('#userModal').modal('show');
                    $('#userUpdate').hide();
                    $('#userSubmit').show();
                    $('#userId').remove();
                    $('#role-description').text('');
                    $('#userModalLabel').text('Add New User');
                }
            }
        ],
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'email' },
            { data: 'addressline' },
            { data: 'town' },
            { data: 'phone' },
            {
                data: 'role',
                render: function (data, type, row) {
                    const roleClass = `role-${data.toLowerCase()}`;
                    return `<span class="role-badge ${roleClass}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                }
            },
            {
                data: 'status',
                render: function (data, type, row) {
                    const statusClass = `status-${data.toLowerCase()}`;
                    return `<span class="status-badge ${statusClass}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-warning roleBtn" data-id="${data.id}" title="Change Role">
                                <i class="fas fa-user-tag"></i>
                            </button>
                            <button class="btn btn-sm btn-secondary statusBtn" data-id="${data.id}" title="Change Status">
                                <i class="fas fa-toggle-on"></i>
                            </button>
                         
                        </div>
                    `;
                }
                //    <button class="btn btn-sm btn-danger deleteBtn" data-id="${data.id}" title="Delete User">
                //                 <i class="fas fa-trash"></i>
                //             </button>
            }
        ],
        responsive: true,
        processing: true,
        language: {
            processing: "Loading users..."
        }
    });

    // Show role description when role is selected
    $('#user_role').on('change', function () {
        const selectedOption = $(this).find('option:selected');
        const description = selectedOption.data('description');

        if (description) {
            $('#role-description').text(`Role: ${description}`);
        } else {
            $('#role-description').text('');
        }
    });

    // Submit new user
    $("#userSubmit").on('click', function (e) {
        e.preventDefault();

        if (!$('#uform')[0].checkValidity()) {
            $('#uform')[0].reportValidity();
            return;
        }

        var data = $('#uform')[0];
        let formData = new FormData(data);

        // Convert FormData to regular object for JSON
        let userData = {};
        for (var pair of formData.entries()) {
            userData[pair[0]] = pair[1];
        }

        // Show loading
        Swal.fire({
            title: 'Creating User...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        $.ajax({
            method: "POST",
            url: `${url}api/users/users`,
            data: JSON.stringify(userData),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#userModal").modal("hide");
                var $utable = $('#utable').DataTable();
                $utable.ajax.reload();

                Swal.fire({
                    icon: 'success',
                    title: 'User Added!',
                    text: 'New user has been added successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseJSON);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: xhr.responseJSON?.error || 'Failed to add user. Please try again.',
                });
            }
        });
    });

    // Edit user button click handler
    $('#utable tbody').on('click', 'button.editBtn', function (e) {
        e.preventDefault();
        $('#userId').remove();
        $("#uform").trigger("reset");

        var id = $(this).data('id');
        console.log(id);
        $('#userModal').modal('show');
        $('<input>').attr({ type: 'hidden', id: 'userId', name: 'user_id', value: id }).appendTo('#uform');

        $('#userSubmit').hide();
        $('#userUpdate').show();
        $('#userModalLabel').text('Edit User');

        // Show loading
        Swal.fire({
            title: 'Loading User Data...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        $.ajax({
            method: "GET",
            url: `${url}api/users/users/${id}`,
            dataType: "json",
            success: function (data) {
                const { result } = data;
                console.log(result);

                Swal.close();


                const user = result[0] || result;
                $('#user_name').val(user.name);
                $('#user_email').val(user.email);
                $('#user_phone').val(user.phone);
                $('#user_town').val(user.town);
                $('#user_address').val(user.addressline);
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseJSON);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: xhr.responseJSON?.error || 'Failed to load user data.',
                });
            }
        });
    });

    // Update user
    $("#userUpdate").on('click', function (e) {
        e.preventDefault();

        if (!$('#uform')[0].checkValidity()) {
            $('#uform')[0].reportValidity();
            return;
        }

        var id = $('#userId').val();
        console.log(id);
        var table = $('#utable').DataTable();

        var data = $('#uform')[0];
        let formData = new FormData(data);

        // Convert FormData to regular object for JSON
        let userData = {};
        for (var pair of formData.entries()) {
            userData[pair[0]] = pair[1];
        }

        // Show loading
        Swal.fire({
            title: 'Updating User...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        $.ajax({
            method: "PUT",
            url: `${url}api/users/users/${id}`,
            data: JSON.stringify(userData),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#userModal').modal("hide");
                table.ajax.reload();

                Swal.fire({
                    icon: 'success',
                    title: 'User Updated!',
                    text: 'User information has been updated successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseJSON);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: xhr.responseJSON?.error || 'Failed to update user. Please try again.',
                });
            }
        });
    });

    // Change role button click handler
    $('#utable tbody').on('click', 'button.roleBtn', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $('#role_user_id').val(id);
        $('#roleModal').modal('show');
    });

    // Submit role change
    $("#roleSubmit").on('click', function (e) {
        e.preventDefault();

        if (!$('#roleForm')[0].checkValidity()) {
            $('#roleForm')[0].reportValidity();
            return;
        }

        var userId = $('#role_user_id').val();
        var newRole = $('#new_role').val();
        var table = $('#utable').DataTable();

        // Show loading
        Swal.fire({
            title: 'Updating Role...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        $.ajax({
            method: "PUT",
            url: `${url}api/users/users/${userId}/role`,
            data: JSON.stringify({ role: newRole }),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#roleModal').modal("hide");
                table.ajax.reload();

                Swal.fire({
                    icon: 'success',
                    title: 'Role Updated!',
                    text: 'User role has been updated successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseJSON);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: xhr.responseJSON?.error || 'Failed to update role. Please try again.',
                });
            }
        });
    });

    // Change status button click handler
    $('#utable tbody').on('click', 'button.statusBtn', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $('#status_user_id').val(id);
        $('#statusModal').modal('show');
    });

    // Submit status change
    $("#statusSubmit").on('click', function (e) {
        e.preventDefault();

        if (!$('#statusForm')[0].checkValidity()) {
            $('#statusForm')[0].reportValidity();
            return;
        }

        var userId = $('#status_user_id').val();
        var newStatus = $('#new_status').val();
        var table = $('#utable').DataTable();

        // Show loading
        Swal.fire({
            title: 'Updating Status...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        $.ajax({
            method: "PUT",
            url: `${url}api/users/users/${userId}/status`,
            data: JSON.stringify({ status: newStatus }),
            contentType: 'application/json',
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#statusModal').modal("hide");
                table.ajax.reload();

                Swal.fire({
                    icon: 'success',
                    title: 'Status Updated!',
                    text: 'User status has been updated successfully.',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseJSON);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: xhr.responseJSON?.error || 'Failed to update status. Please try again.',
                });
            }
        });
    });

    // // Delete user button click handler
    // $('#utable tbody').on('click', 'button.deleteBtn', function (e) {
    //     e.preventDefault();
    //     var table = $('#utable').DataTable();
    //     var id = $(this).data('id');
    //     var $row = $(this).closest('tr');
    //     console.log(id);

    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'You won\'t be able to revert this!',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         cancelButtonColor: '#3085d6',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             // Show loading
    //             Swal.fire({
    //                 title: 'Deleting User...',
    //                 allowOutsideClick: false,
    //                 didOpen: () => {
    //                     Swal.showLoading();
    //                 }
    //             });

    //             $.ajax({
    //                 method: "DELETE",
    //                 : `${url}api/users/users/${id}`,
    //                 dataType: "json",
    //                 success: function (data) {
    //                     console.log(data);
    //                     table.ajax.reload();

    //                     Swal.fire({
    //                         icon: 'success',
    //                         title: 'Deleted!',
    //                         text: 'User has been deleted successfully.',
    //                         timer: 2000,
    //                         showConfirmButton: false
    //                     });
    //                 },
    //                 error: function (xhr, status, error) {
    //                     console.log(xhr.responseJSON);
    //                     Swal.fire({
    //                         icon: 'error',
    //                         title: 'Error!',
    //                         text: xhr.responseJSON?.error || 'Failed to delete user. Please try again.',
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // });

    // Search functionality
    $('#userSearch').on('keyup', function () {
        var table = $('#utable').DataTable();
        table.search(this.value).draw();
    });

    // Reset forms when modals are hidden
    $('#userModal').on('hidden.bs.modal', function () {
        $('#uform')[0].reset();
        $('#userSubmit').show();
        $('#userUpdate').hide();
        $('#userModalLabel').text('User Management');
        $('#userId').remove();
        $('#role-description').text('');
    });

    $('#roleModal').on('hidden.bs.modal', function () {
        $('#roleForm')[0].reset();
    });

    $('#statusModal').on('hidden.bs.modal', function () {
        $('#statusForm')[0].reset();
    });
});