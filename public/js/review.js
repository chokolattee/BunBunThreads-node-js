$(document).ready(function() {
    // Initialize DataTable
    const reviewsTable = $('#reviewsTable').DataTable({
        dom: 'Bfrtip',
        buttons: ['pdf', 'excel'],
        responsive: true,
        columns: [
            { data: 'review_id' },
            { data: 'orderinfo_id' },
            { 
                data: null,
                render: function(data) {
                    return `${data.customer_first_name} ${data.customer_last_name}`;
                }
            },
            { data: 'item_name' },
            { 
                data: 'rating',
                render: function(rating) {
                    return generateStarRating(rating);
                }
            },
            { data: 'review_text' },
            { 
                data: 'created_at',
                render: function(date) {
                    return new Date(date).toLocaleDateString();
                }
            },
            { 
                data: 'deleted_at',
                render: function(deletedAt) {
                    return deletedAt ? '<span class="badge badge-danger">Deleted</span>' : '<span class="badge badge-success">Active</span>';
                }
            },
            { 
                data: null,
                render: function(data) {
                    return generateActionButtons(data);
                },
                orderable: false
            }
        ],
        columnDefs: [
            { responsivePriority: 1, targets: 0 }, // Review ID
            { responsivePriority: 2, targets: 4 }, // Rating
            { responsivePriority: 3, targets: 5 }, // Review
            { responsivePriority: 4, targets: -1 } // Actions
        ]
    });

    // Current filter state
    let currentFilter = 'all';

    // Function to fetch reviews based on filter
    function fetchReviews(filter = 'all') {
        let endpoint = '/api/reviews';
        
        if (filter === 'deleted') {
            endpoint = '/api/reviews/admin';
        } else if (filter === 'active') {
            endpoint = '/api/reviews';
        }

        $.ajax({
            url: endpoint,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                reviewsTable.clear().rows.add(response.rows).draw();
                // Add deleted-row class to deleted reviews
                $('tr').each(function() {
                    const rowData = reviewsTable.row(this).data();
                    if (rowData && rowData.deleted_at) {
                        $(this).addClass('deleted-row');
                    } else {
                        $(this).removeClass('deleted-row');
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching reviews:', error);
                Swal.fire('Error', 'Failed to fetch reviews', 'error');
            }
        });
    }

    // Function to generate star rating display
    function generateStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star text-warning"></i>';
            } else {
                stars += '<i class="far fa-star text-warning"></i>';
            }
        }
        return stars;
    }

    // Function to generate action buttons
    function generateActionButtons(review) {
        if (review.deleted_at) {
            return `
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-success restore-btn" data-id="${review.review_id}" title="Restore">
                        <i class="fas fa-undo"></i>
                    </button>
                </div>
            `;
        } else {
            return `
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${review.review_id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }
    }

    // Initial data load
    fetchReviews();

    // Filter button click handler
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        fetchReviews(currentFilter);
    });

    // Refresh button click handler
    $('#refreshBtn').click(function() {
        fetchReviews(currentFilter);
    });

    // Delete review
    $(document).on('click', '.delete-btn', function() {
        const reviewId = $(this).data('id');
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/api/reviews/delete/${reviewId}`,
                    method: 'PUT',
                    success: function() {
                        Swal.fire(
                            'Deleted!',
                            'The review has been deleted.',
                            'success'
                        );
                        fetchReviews(currentFilter);
                    },
                    error: function(xhr, status, error) {
                        console.error('Error deleting review:', error);
                        Swal.fire('Error', 'Failed to delete review', 'error');
                    }
                });
            }
        });
    });

    // Restore review
    $(document).on('click', '.restore-btn', function() {
        const reviewId = $(this).data('id');
        
        Swal.fire({
            title: 'Are you sure?',
            text: "This review will be restored.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/api/reviews/restore/${reviewId}`,
                    method: 'PATCH',
                    success: function() {
                        Swal.fire(
                            'Restored!',
                            'The review has been restored.',
                            'success'
                        );
                        fetchReviews(currentFilter);
                    },
                    error: function(xhr, status, error) {
                        console.error('Error restoring review:', error);
                        Swal.fire('Error', 'Failed to restore review', 'error');
                    }
                });
            }
        });
    });

    // Search functionality
    $('#searchBtn').click(function() {
        const searchTerm = $('#searchInput').val().toLowerCase();
        reviewsTable.search(searchTerm).draw();
    });

    // Allow pressing Enter to search
    $('#searchInput').keypress(function(e) {
        if (e.which === 13) {
            $('#searchBtn').click();
        }
    });
});