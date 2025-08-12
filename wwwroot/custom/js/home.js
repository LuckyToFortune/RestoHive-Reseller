/**
 * Home page customer management functionality with pagination
 */

'use strict';

// Pagination configuration
const paginationConfig = {
  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 1,
  totalItems: 0,
  maxVisiblePages: 5
};

// Generate mock customer data
function generateMockCustomers(count = 50) {
  const statuses = ['active', 'inactive', 'pending'];
  const billingTypes = ['Auto Debit', 'Manual', 'Credit Card', 'Bank Transfer'];
  const mockCustomers = [];
  
  for (let i = 1; i <= count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const billingType = billingTypes[Math.floor(Math.random() * billingTypes.length)];
    const discount = (Math.floor(Math.random() * 20) + 5) + '%';
    
    mockCustomers.push({
      id: i,
      name: `Customer ${i}`,
      email: `customer${i}@example.com`,
      renewalDate: new Date(Date.now() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      payment: `$${(Math.random() * 1000).toFixed(2)}`,
      billing: billingType,
      status: status,
      fullName: `Customer ${i} Name`,
      editEmail: `customer${i}@example.com`,
      address: `${i} Main St, City ${i}, Country`,
      discountAmount: discount,
      avatar: (i % 10) + 1 // Use avatar1.png to avatar10.png
    });
  }
  
  return mockCustomers;
}

// Initialize customers array with mock data
let customers = [];

// Function to initialize customers with mock data
function initializeCustomers() {
  // Original customer data
  const originalCustomers = [
    {
      id: 1,
      name: 'ZsaZsa McCleverty',
      email: 'zmcclevertye@soundcloud.com',
      renewalDate: '11/06/2025',
      payment: '$250.00',
      billing: 'Au',
      status: 'active',
      fullName: 'Jake Addison',
      editEmail: 'jake@gmail.com',
      address: '195 rue due crossaint, saint-laurnet, h411e2, Qc',
      discountAmount: '18.00',
      avatar: 1
    },
    {
      id: 2,
      name: 'Yoko Pottie',
      email: 'ypottiec@privacy.gov.au',
      renewalDate: '11/06/2025',
      payment: 'Mar 31, 4:33 PM',
      billing: 'Au',
      status: 'active',
      fullName: 'Yoko Pottie',
      editEmail: 'ypottiec@privacy.gov.au',
      address: '123 Main Street, City, State 12345',
      discountAmount: '15.00',
      avatar: 2
    },
    {
      id: 3,
      name: 'Wesley Burland',
      email: 'wborlandj@rutcc.edu',
      renewalDate: '11/06/2025',
      payment: 'Mar 31, 4:33 PM',
      billing: 'Au',
      status: 'inactive',
      fullName: 'Wesley Burland',
      editEmail: 'wborlandj@rutcc.edu',
      address: '456 Oak Avenue, Town, Province 67890',
      discountAmount: '20.00',
      avatar: 3
    }
  ];
  
  // Clear existing customers and add original customers
  customers = [...originalCustomers];
  
  // Add mock customers (ensuring unique IDs)
  const mockCustomers = generateMockCustomers(50);
  mockCustomers.forEach((customer, index) => {
    customer.id = originalCustomers.length + index + 1; // Ensure unique IDs
    customers.push(customer);
  });
  
  return customers;
}

let currentCustomerId = null;

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize customers data
  initializeCustomers();
  
  // Initialize UI components
  initializeCustomerTable();
  initializeSearch();
  initializeSelectAll();
  
  // Render the table with pagination
  renderTable();
  renderPagination();
  
  // Add event delegation for checkboxes
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('customer-checkbox')) {
      updateDeleteButtonState();
    }
  });
  
  // Initialize delete selected button
  const deleteSelectedBtn = document.getElementById('deleteSelected');
  if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener('click', handleDeleteSelected);
  }
});

// Initialize customer table
function initializeCustomerTable() {
  // Add event listeners for dropdown actions
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });
}

// Initialize search functionality
function initializeSearch() {
  const searchInput = document.getElementById('searchCustomer');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      filterCustomers(searchTerm);
    });
  }
}

// Initialize select all functionality
function initializeSelectAll() {
  const selectAllCheckbox = document.getElementById('selectAllCustomers');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.datatables-customers tbody .form-check-input');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }
}

// Render customer table with pagination
function renderTable() {
  const tableBody = document.getElementById('customerTableBody');
  if (!tableBody) return;
  
  // Clear existing rows
  tableBody.innerHTML = '';
  
  // Calculate pagination
  const startIndex = (paginationConfig.currentPage - 1) * paginationConfig.itemsPerPage;
  const endIndex = startIndex + paginationConfig.itemsPerPage;
  const paginatedCustomers = customers.slice(startIndex, endIndex);
  
  // Add rows for current page only
  paginatedCustomers.forEach(customer => {
    const row = document.createElement('tr');
    row.className = 'clickable-row';
    row.setAttribute('onclick', `editCustomer(${customer.id})`);
    
    row.innerHTML = `
      <td style="text-align: center;">
        <div class="form-check d-inline-flex">
          <input class="form-check-input customer-checkbox" type="checkbox" data-customer-id="${customer.id}">
        </div>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <img src="/img/avatars/${customer.avatar || '1'}.png" alt="Avatar" class="rounded-circle">
          </div>
          <div>
            <h6 class="mb-0">${customer.name}</h6>
            <small class="text-muted">${customer.email}</small>
          </div>
        </div>
      </td>
      <td>${customer.renewalDate}</td>
      <td>${customer.payment}</td>
      <td>${customer.billing}</td>
      <td>${customer.discountAmount}</td>
      <td><span class="badge bg-label-${customer.status === 'active' ? 'success' : customer.status === 'inactive' ? 'danger' : 'warning'}">${customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</span></td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Update pagination info
  paginationConfig.totalItems = customers.length;
  paginationConfig.totalPages = Math.ceil(customers.length / paginationConfig.itemsPerPage);
  
  // Hide pagination if no items
  const paginationContainer = document.getElementById('pagination');
  if (paginationContainer) {
    if (customers.length <= paginationConfig.itemsPerPage) {
      paginationContainer.style.display = 'none';
    } else {
      paginationContainer.style.display = 'flex';
    }
  }
}

// Render pagination controls
function renderPagination() {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;
  
  const totalPages = paginationConfig.totalPages;
  const currentPage = paginationConfig.currentPage;
  const maxVisiblePages = paginationConfig.maxVisiblePages;
  
  let paginationHTML = '';
  
  // Previous button
  paginationHTML += `
    <li class="page-item prev ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="javascript:void(0);" ${currentPage === 1 ? 'tabindex="-1"' : ''}>
        <i class="tf-icon bx bx-chevron-left"></i>
      </a>
    </li>`;
  
  // Page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  if (startPage > 1) {
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="javascript:void(0);" data-page="1">1</a>
      </li>`;
    if (startPage > 2) {
      paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="javascript:void(0);" data-page="${i}">${i}</a>
      </li>`;
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="javascript:void(0);" data-page="${totalPages}">${totalPages}</a>
      </li>`;
  }
  
  // Next button
  paginationHTML += `
    <li class="page-item next ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="javascript:void(0);" ${currentPage === totalPages ? 'tabindex="-1"' : ''}>
        <i class="tf-icon bx bx-chevron-right"></i>
      </a>
    </li>`;
  
  paginationContainer.innerHTML = paginationHTML;
  
  // Add event listeners
  document.querySelectorAll('.page-link[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = parseInt(this.getAttribute('data-page'));
      if (page !== paginationConfig.currentPage) {
        paginationConfig.currentPage = page;
        renderTable();
        renderPagination();
      }
    });
  });
  
  // Previous/Next buttons
  const prevBtn = document.querySelector('.page-item.prev .page-link');
  const nextBtn = document.querySelector('.page-item.next .page-link');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (paginationConfig.currentPage > 1) {
        paginationConfig.currentPage--;
        renderTable();
        renderPagination();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (paginationConfig.currentPage < paginationConfig.totalPages) {
        paginationConfig.currentPage++;
        renderTable();
        renderPagination();
      }
    });
  }
}

// Filter customers based on search term
function filterCustomers(searchTerm) {
  const rows = document.querySelectorAll('.datatables-customers tbody tr');

  rows.forEach(row => {
    const customerName = row.querySelector('h6').textContent.toLowerCase();
    const customerEmail = row.querySelector('small').textContent.toLowerCase();

    if (customerName.includes(searchTerm) || customerEmail.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// View customer details
function viewCustomer(customerId) {
  const customer = customers.find(c => c.id === customerId);
  if (customer) {
    // You can implement a view modal or redirect to a details page
    alert(`Viewing customer: ${customer.name}`);
  }
}

// Edit customer - opens the modal
function editCustomer(customerId) {
  currentCustomerId = customerId;
  const customer = customers.find(c => c.id === customerId);

  if (customer) {
    // Populate the modal with customer data
    document.getElementById('editFullName').value = customer.fullName;
    document.getElementById('editEmail').value = customer.editEmail;
    document.getElementById('editAddress').value = customer.address;
    document.getElementById('editDiscountAmount').value = customer.discountAmount;
    document.getElementById('editStatus').value = customer.status;

    // Show the offcanvas
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('editCustomerModal'));
    offcanvas.show();
  }
}

// Suspend customer
function suspendCustomer(customerId) {
  const customer = customers.find(c => c.id === customerId);
  if (customer) {
    if (confirm(`Are you sure you want to suspend ${customer.name}?`)) {
      // Update customer status
      customer.status = 'suspended';

      // Update the UI
      updateCustomerStatus(customerId, 'suspended');

      // Show success message
      showNotification('Customer suspended successfully', 'success');
    }
  }
}

// Delete customer
function deleteCustomer(customerId) {
  if (confirm('Are you sure you want to remove this customer?')) {
    // In a real app, you would make an API call to delete the customer
    const customerIndex = customers.findIndex(c => c.id === customerId);
    if (customerIndex > -1) {
      customers.splice(customerIndex, 1);
      
      // Remove from UI
      const row = document.querySelector(`tr[data-customer-id="${customerId}"]`);
      if (row) {
        row.remove();
      }
      
      // Show success message
      showNotification('Customer removed successfully', 'success');
    }
  }
}

// Update customer status in UI
function updateCustomerStatus(customerId, status) {
  const row = document.querySelector(`tr[data-customer-id="${customerId}"]`);
  if (row) {
    const statusBadge = row.querySelector('.badge');
    if (statusBadge) {
      statusBadge.className = `badge bg-label-${status === 'active' ? 'success' : status === 'inactive' ? 'secondary' : 'warning'}`;
      statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    }
  }
}

// Submit edit customer form
function submitEditCustomer() {
  if (!currentCustomerId) return;

  const customer = customers.find(c => c.id === currentCustomerId);
  if (customer) {
    // Get form values
    const formData = new FormData(document.getElementById('editCustomerForm'));

    // Update customer data
    customer.fullName = formData.get('fullName');
    customer.editEmail = formData.get('email');
    customer.address = formData.get('address');
    customer.discountAmount = formData.get('discountAmount');
    customer.status = formData.get('status');

    // Update UI
    updateCustomerInTable(customer);

    // Close offcanvas
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('editCustomerModal'));
    offcanvas.hide();

    // Show success message
    showNotification('Customer updated successfully', 'success');
  }
}

// Update customer in table
function updateCustomerInTable(customer) {
  // Find the row with the customer ID and update it
  const row = document.querySelector(`tr[data-customer-id="${customer.id}"]`);
  if (row) {
    // Update the row with new customer data
    row.innerHTML = `
      <td style="text-align: center;">
        <div class="form-check d-inline-flex">
          <input class="form-check-input customer-checkbox" type="checkbox" data-customer-id="${customer.id}">
        </div>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <img src="/img/avatars/${customer.avatar || '1'}.png" alt="Avatar" class="rounded-circle">
          </div>
          <div>
            <h6 class="mb-0">${customer.name}</h6>
            <small class="text-muted">${customer.email}</small>
          </div>
        </div>
      </td>
      <td>${customer.renewalDate}</td>
      <td>${customer.payment}</td>
      <td>${customer.billing}</td>
      <td>${customer.discountAmount}</td>
      <td><span class="badge bg-label-${customer.status === 'active' ? 'success' : customer.status === 'inactive' ? 'danger' : 'warning'}">${customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</span></td>
    `;
    
    // Reattach click handler
    row.setAttribute('onclick', `editCustomer(${customer.id})`);
  }
}

// Open files (navigate to Files page)
function openFiles() {
  // Navigate to the Files page
  window.location.href = '/Files';
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
  notification.style.zIndex = '1060';
  notification.role = 'alert';
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto dismiss after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Update delete button state based on checkboxes
function updateDeleteButtonState() {
  const deleteButton = document.getElementById('deleteSelected');
  if (!deleteButton) return;
  
  const checkedBoxes = document.querySelectorAll('.customer-checkbox:checked');
  deleteButton.disabled = checkedBoxes.length === 0;
}

// Handle delete selected customers
function handleDeleteSelected(e) {
  const checkedBoxes = document.querySelectorAll('.customer-checkbox:checked');
  if (checkedBoxes.length === 0) return;
  
  if (confirm(`Are you sure you want to delete ${checkedBoxes.length} selected customer(s)?`)) {
    // Get customer IDs to delete
    const customerIds = Array.from(checkedBoxes).map(checkbox => 
      parseInt(checkbox.getAttribute('data-customer-id'))
    );
    
    // In a real app, you would make an API call here to delete the customers
    console.log('Deleting customers:', customerIds);
    
    // Remove from UI
    customerIds.forEach(id => {
      const customerIndex = customers.findIndex(c => c.id === id);
      if (customerIndex > -1) {
        customers.splice(customerIndex, 1);
      }
    });
    
    // Reset to first page if needed
    if (paginationConfig.currentPage > 1 && 
        customers.length <= (paginationConfig.currentPage - 1) * paginationConfig.itemsPerPage) {
      paginationConfig.currentPage = 1;
    }
    
    // Re-render table and pagination
    renderTable();
    renderPagination();
    
    showNotification(`${customerIds.length} customer(s) deleted successfully`, 'success');
  }
}

// Export functions to global scope
window.viewCustomer = viewCustomer;
window.editCustomer = editCustomer;
window.suspendCustomer = suspendCustomer;
window.deleteCustomer = deleteCustomer;
window.submitEditCustomer = submitEditCustomer;
window.openFiles = openFiles;
