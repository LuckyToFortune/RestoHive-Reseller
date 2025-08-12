console.log('pagination.js loaded successfully');

// Mock data for pagination - matches RestoHive Tickets data
const mockTickets = [
    // Original 15 tickets
    {
        id: 501,
        date: '15 Jan 2025',
        updatedDate: '15 Jan 2025',
        subject: 'Promoting video',
        department: 'Sales',
        requestor: 'Annette',
        status: 'Pending'
    },
    {
        id: 502,
        date: '14 Jan 2025',
        updatedDate: '14 Jan 2025',
        subject: 'Promoting photo',
        department: 'Sales',
        requestor: 'John',
        status: 'Pending'
    },
    {
        id: 503,
        date: '13 Jan 2025',
        updatedDate: '13 Jan 2025',
        subject: 'New food on plate',
        department: 'Kitchen',
        requestor: 'Sarah',
        status: 'Replied'
    },
    {
        id: 504,
        date: '12 Jan 2025',
        updatedDate: '12 Jan 2025',
        subject: 'Second item free',
        department: 'Marketing',
        requestor: 'Mike',
        status: 'Closed'
    },
    {
        id: 505,
        date: '11 Jan 2025',
        updatedDate: '11 Jan 2025',
        subject: 'Black friday',
        department: 'Sales',
        requestor: 'Emma',
        status: 'Waiting Reply'
    },
    {
        id: 506,
        date: '10 Jan 2025',
        updatedDate: '10 Jan 2025',
        subject: 'Today holiday',
        department: 'HR',
        requestor: 'David',
        status: 'Closed'
    },
    {
        id: 507,
        date: '09 Jan 2025',
        updatedDate: '09 Jan 2025',
        subject: 'Winner of the day',
        department: 'Sales',
        requestor: 'Annette',
        status: 'Closed'
    },
    {
        id: 508,
        date: '08 Jan 2025',
        updatedDate: '08 Jan 2025',
        subject: 'Special offer',
        department: 'Marketing',
        requestor: 'John',
        status: 'Pending'
    },
    {
        id: 509,
        date: '07 Jan 2025',
        updatedDate: '07 Jan 2025',
        subject: 'Menu update',
        department: 'Kitchen',
        requestor: 'Sarah',
        status: 'Replied'
    },
    {
        id: 510,
        date: '06 Jan 2025',
        updatedDate: '06 Jan 2025',
        subject: 'Promotion request',
        department: 'Sales',
        requestor: 'Mike',
        status: 'Pending'
    },
    {
        id: 511,
        date: '05 Jan 2025',
        updatedDate: '05 Jan 2025',
        subject: 'Price inquiry',
        department: 'Sales',
        requestor: 'Emma',
        status: 'Replied'
    },
    {
        id: 512,
        date: '04 Jan 2025',
        updatedDate: '04 Jan 2025',
        subject: 'Product availability',
        department: 'Inventory',
        requestor: 'David',
        status: 'Closed'
    },
    {
        id: 513,
        date: '03 Jan 2025',
        updatedDate: '03 Jan 2025',
        subject: 'Order status',
        department: 'Support',
        requestor: 'Annette',
        status: 'Waiting Reply'
    },
    {
        id: 514,
        date: '02 Jan 2025',
        updatedDate: '02 Jan 2025',
        subject: 'Delivery issue',
        department: 'Logistics',
        requestor: 'John',
        status: 'Closed'
    },
    {
        id: 515,
        date: '01 Jan 2025',
        updatedDate: '01 Jan 2025',
        subject: 'New year special',
        department: 'Marketing',
        requestor: 'Sarah',
        status: 'Pending'
    },
    // Additional tickets to ensure pagination shows 5 pages
    {
        id: 516,
        date: '31 Dec 2024',
        updatedDate: '31 Dec 2024',
        subject: 'Year end sale',
        department: 'Sales',
        requestor: 'Mike',
        status: 'Pending'
    },
    {
        id: 517,
        date: '30 Dec 2024',
        updatedDate: '30 Dec 2024',
        subject: 'Menu feedback',
        department: 'Kitchen',
        requestor: 'Emma',
        status: 'Replied'
    },
    {
        id: 518,
        date: '29 Dec 2024',
        updatedDate: '29 Dec 2024',
        subject: 'Holiday hours',
        department: 'HR',
        requestor: 'David',
        status: 'Closed'
    },
    {
        id: 519,
        date: '28 Dec 2024',
        updatedDate: '28 Dec 2024',
        subject: 'New supplier',
        department: 'Procurement',
        requestor: 'Annette',
        status: 'Pending'
    },
    {
        id: 520,
        date: '27 Dec 2024',
        updatedDate: '27 Dec 2024',
        subject: 'Website update',
        department: 'IT',
        requestor: 'John',
        status: 'Replied'
    },
    {
        id: 521,
        date: '26 Dec 2024',
        updatedDate: '26 Dec 2024',
        subject: 'Staff training',
        department: 'HR',
        requestor: 'Sarah',
        status: 'Waiting Reply'
    },
    {
        id: 522,
        date: '25 Dec 2024',
        updatedDate: '25 Dec 2024',
        subject: 'Holiday special',
        department: 'Marketing',
        requestor: 'Mike',
        status: 'Closed'
    },
    {
        id: 523,
        date: '24 Dec 2024',
        updatedDate: '24 Dec 2024',
        subject: 'Customer feedback',
        department: 'Customer Service',
        requestor: 'Emma',
        status: 'Pending'
    },
    {
        id: 524,
        date: '23 Dec 2024',
        updatedDate: '23 Dec 2024',
        subject: 'Inventory check',
        department: 'Inventory',
        requestor: 'David',
        status: 'Replied'
    },
    {
        id: 525,
        date: '22 Dec 2024',
        updatedDate: '22 Dec 2024',
        subject: 'New menu items',
        department: 'Kitchen',
        requestor: 'Annette',
        status: 'Closed'
    },
    {
        id: 526,
        date: '21 Dec 2024',
        updatedDate: '21 Dec 2024',
        subject: 'Marketing campaign',
        department: 'Marketing',
        requestor: 'John',
        status: 'Pending'
    },
    {
        id: 527,
        date: '20 Dec 2024',
        updatedDate: '20 Dec 2024',
        subject: 'Staff schedule',
        department: 'HR',
        requestor: 'Sarah',
        status: 'Replied'
    },
    {
        id: 528,
        date: '19 Dec 2024',
        updatedDate: '19 Dec 2024',
        subject: 'Supplier meeting',
        department: 'Procurement',
        requestor: 'Mike',
        status: 'Waiting Reply'
    },
    {
        id: 529,
        date: '18 Dec 2024',
        updatedDate: '18 Dec 2024',
        subject: 'System update',
        department: 'IT',
        requestor: 'Emma',
        status: 'Closed'
    },
    {
        id: 530,
        date: '17 Dec 2024',
        updatedDate: '17 Dec 2024',
        subject: 'Customer complaint',
        department: 'Customer Service',
        requestor: 'David',
        status: 'Pending'
    },
    {
        id: 531,
        date: '16 Dec 2024',
        updatedDate: '16 Dec 2024',
        subject: 'New recipe trial',
        department: 'Kitchen',
        requestor: 'Annette',
        status: 'Replied'
    },
    {
        id: 532,
        date: '15 Dec 2024',
        updatedDate: '15 Dec 2024',
        subject: 'Social media post',
        department: 'Marketing',
        requestor: 'John',
        status: 'Pending'
    },
    {
        id: 533,
        date: '14 Dec 2024',
        updatedDate: '14 Dec 2024',
        subject: 'Staff evaluation',
        department: 'HR',
        requestor: 'Sarah',
        status: 'Closed'
    },
    {
        id: 534,
        date: '13 Dec 2024',
        updatedDate: '13 Dec 2024',
        subject: 'Vendor payment',
        department: 'Finance',
        requestor: 'Mike',
        status: 'Pending'
    },
    {
        id: 535,
        date: '12 Dec 2024',
        updatedDate: '12 Dec 2024',
        subject: 'Software license',
        department: 'IT',
        requestor: 'Emma',
        status: 'Replied'
    }
];

const itemsPerPage = 8;

// Generate mock data - kept for backward compatibility
function generateMockData() {
    // Data is now hardcoded above
    return mockTickets;
}

// Get paginated data
function getPaginatedData(page, searchTerm = '') {
    let filtered = [...mockTickets];

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(ticket =>
            ticket.subject.toLowerCase().includes(term) ||
            ticket.department.toLowerCase().includes(term) ||
            ticket.requestor.toLowerCase().includes(term) ||
            ticket.status.toLowerCase().includes(term)
        );
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const items = filtered.slice(startIndex, endIndex);

    return {
        items,
        totalItems,
        totalPages,
        currentPage: page,
        hasNextPage: endIndex < totalItems,
        hasPreviousPage: page > 1
    };
}

// Add CSS for date-clickable class if not already added
if (!document.getElementById('date-clickable-style')) {
    const style = document.createElement('style');
    style.id = 'date-clickable-style';
    style.textContent = `
        .date-clickable {
            cursor: pointer;
            color: #696cff;
            text-decoration: none;
        }
        .date-clickable:hover {
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);
}

// Render table rows
function renderTableRows(items, isRestoHive = false) {
    let html = '';

    items.forEach(item => {
        const statusClass = getStatusClass(item.status);
        const deptInitial = item.department ? item.department.charAt(0) : 'S';
        const requestorInitial = item.requestor ? item.requestor.charAt(0) : 'A';
        const ticketId = item.id || '515';
        const baseUrl = isRestoHive ? '/RestoHiveTickets/Details' : '/CustomersTickets/Details';

        html += `
            <tr>
                <td><input type="checkbox" class="form-check-input"></td>
                <td>${ticketId}</td>
                <td class="date-clickable"
                    onclick="window.location.href='${baseUrl}/${ticketId}'"
                    style="cursor: pointer; color: #696cff; text-decoration: none;"
                    onmouseover="this.style.textDecoration='underline'"
                    onmouseout="this.style.textDecoration='none'">
                    ${item.date}
                </td>
                <td>${item.updatedDate || item.date}</td>
                <td>${item.subject}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar avatar-sm ${getDepartmentClass(item.department)} me-2">
                            <span class="avatar-initial rounded-circle">${deptInitial}</span>
                        </div>
                        <span>${item.department || 'Sales'}</span>
                    </div>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar avatar-sm bg-label-secondary me-2">
                            <span class="avatar-initial rounded-circle">${requestorInitial}</span>
                        </div>
                        <span>${item.requestor || 'Annette'}</span>
                    </div>
                </td>
                <td><span class="badge ${statusClass}">${item.status}</span></td>
            </tr>
        `;
    });

    return html;
}

// Get status class for badge
function getStatusClass(status) {
    switch(status) {
        case 'Replied': return 'bg-label-success';
        case 'Pending': return 'bg-label-warning';
        case 'Closed': return 'bg-label-info';
        case 'Waiting Reply': return 'bg-label-danger';
        default: return 'bg-label-secondary';
    }
}

// Get department class for avatar
function getDepartmentClass(department) {
    const classes = ['bg-label-primary', 'bg-label-info', 'bg-label-warning', 'bg-label-success'];
    const index = department.length % classes.length;
    return classes[index];
}

// Render pagination
function renderPagination(totalPages, currentPage, containerId) {
    let html = '<ul class="pagination">';
    // Always show 5 page numbers if possible
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
        const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

        if (currentPage <= maxPagesBeforeCurrent) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrent;
            endPage = currentPage + maxPagesAfterCurrent;
        }
    }

    // Previous button
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
                <i class="bx bx-chevron-left"></i>
            </a>
        </li>
    `;

    // First page
    if (startPage > 1) {
        html += `
            <li class="page-item">
                <a class="page-link" href="#" data-page="1">1</a>
            </li>
        `;
        if (startPage > 2) {
            html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        html += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
        html += `
            <li class="page-item">
                <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
            </li>
        `;
    }

    // Next button
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
                <i class="bx bx-chevron-right"></i>
            </a>
        </li>
    `;

    html += '</ul>';

    document.getElementById(containerId).innerHTML = html;

    // Add event listeners to pagination links
    document.querySelectorAll(`#${containerId} .page-link`).forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.getAttribute('data-page'));
            if (!isNaN(page)) {
                updateTable(page);
                // Store scroll position
                const scrollPosition = window.scrollY;
                // Update URL without page reload
                const url = new URL(window.location.href);
                url.searchParams.set('page', page);
                window.history.pushState({}, '', url);
                // Restore scroll position after a short delay
                setTimeout(() => {
                    window.scrollTo(0, scrollPosition);
                }, 10);
            }
        });
    });
}

// Update table with paginated data
function updateTable(page = 1, searchTerm = '') {
    const data = getPaginatedData(page, searchTerm);
    const tableBody = document.querySelector('table tbody');
    const isRestoHive = window.location.pathname.includes('RestoHiveTickets');

    if (tableBody) {
        tableBody.innerHTML = renderTableRows(data.items, isRestoHive);

        // Update pagination
        const paginationContainer = document.querySelector('.pagination-container');
        if (paginationContainer) {
            renderPagination(data.totalPages, page, 'pagination-container');
        }
    }
}

// Initialize pagination
function initPagination() {
    // Generate mock data if not already generated
    if (mockTickets.length === 0) {
        generateMockData(100); // Generate 100 mock tickets
    }

    // Get current page from URL or default to 1
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;

    // Initial table render
    updateTable(currentPage);

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            updateTable(1, this.value);
        });
    }
}

// Export functions for use in other files
window.pagination = {
    init: initPagination,
    updateTable: updateTable
};
