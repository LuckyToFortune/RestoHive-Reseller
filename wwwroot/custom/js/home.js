/**
 * Home page customer management functionality
 */

'use strict';

// Customer data (in a real app, this would come from the server)
const customers = [
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
    discountAmount: '18.00'
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
    discountAmount: '15.00'
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
    discountAmount: '20.00'
  }
];

let currentCustomerId = null;

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function () {
  initializeCustomerTable();
  initializeSearch();
  initializeSelectAll();
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
  const selectAllCheckbox = document.getElementById('selectAll');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.datatables-customers tbody .form-check-input');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
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
  const customer = customers.find(c => c.id === customerId);
  if (customer) {
    if (confirm(`Are you sure you want to delete ${customer.name}? This action cannot be undone.`)) {
      // Remove customer from array
      const index = customers.findIndex(c => c.id === customerId);
      if (index > -1) {
        customers.splice(index, 1);
      }

      // Remove from UI
      const row = document.querySelector(`tr[data-customer-id="${customerId}"]`);
      if (row) {
        row.remove();
      }

      // Show success message
      showNotification('Customer deleted successfully', 'success');
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
  const row = document.querySelector(`tr[data-customer-id="${customer.id}"]`);
  if (row) {
    // Update name and email
    const nameElement = row.querySelector('h6');
    const emailElement = row.querySelector('small');
    if (nameElement) nameElement.textContent = customer.fullName;
    if (emailElement) emailElement.textContent = customer.editEmail;

    // Update status
    updateCustomerStatus(customer.id, customer.status);
  }
}

// Open files (navigate to Files page)
function openFiles() {
  // Navigate to the Files page
  window.location.href = '/Files';
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Export functions to global scope
window.viewCustomer = viewCustomer;
window.editCustomer = editCustomer;
window.suspendCustomer = suspendCustomer;
window.deleteCustomer = deleteCustomer;
window.submitEditCustomer = submitEditCustomer;
window.openFiles = openFiles;
