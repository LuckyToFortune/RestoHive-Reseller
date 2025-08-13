/**
 * Discount page functionality
 */

'use strict';

// Mock data for discounts (5 items per page, 3 pages total)
const mockDiscounts = [];
const itemsPerPage = 5;
let currentPage = 1;

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
  generateMockData();
  renderDiscounts();
  setupPagination();
});

generateMockData();

// Generate mock data for 15 discounts (3 pages)
function generateMockData() {
  const customers = ['Annette', 'John', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'Robert'];
  const statuses = ['Active', 'Expired', 'Used'];

  for (let i = 1; i <= 15; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const discount = (Math.random() * 30 + 5).toFixed(2);
    const code = generateRandomCode(8);

    mockDiscounts.push({
      id: i,
      date: generateRandomDate(new Date(2024, 0, 1), new Date()),
      expiryDate: generateRandomDate(new Date(), new Date(2025, 11, 31)),
      discount: discount,
      code: code,
      customer: customer,
      status: status
    });
  }
}

// Generate random discount code
function generateRandomCode(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate random date between two dates
function generateRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Format date to display
function formatDate(date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Initialize discount page
function initializeDiscountPage() {
  // Any initialization code if needed
}

// Initialize discount page
function initializeDiscountPage() {
  console.log('Discount page initialized');
}

// Generate new discount
function generateDiscount() {
  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById('generateDiscountModal'));
  modal.show();
}

// Copy discount code to clipboard
function copyCode(code) {
  navigator.clipboard.writeText(code).then(function() {
    alert('Discount code copied to clipboard!');
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
    alert('Failed to copy code');
  });
}

// Delete discount
function deleteDiscount(discountId) {
  if (confirm('Are you sure you want to delete this discount?')) {
    alert('Discount deleted successfully!');
  }
}

// View discount details
function viewDiscount(discountId) {
  // Show the view modal
  const modal = new bootstrap.Modal(document.getElementById('viewDiscountModal'));
  modal.show();
}

// Submit discount form
function submitDiscount() {
  const expirationDate = document.getElementById('expirationDate').value;
  const discountPercentage = document.getElementById('discountPercentage').value;

  // Here you would typically send the data to your backend
  console.log('Generating discount:', {
    expirationDate: expirationDate,
    discountPercentage: discountPercentage
  });

  // Show success message
  alert('Discount generated successfully!');

  // Close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('generateDiscountModal'));
  modal.hide();
}

// Download discount
function downloadDiscount() {
  // Here you would typically trigger a download
  console.log('Downloading discount...');

  // Show success message
  alert('Download started!');

  // Close the modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('viewDiscountModal'));
  modal.hide();
}

// Render discounts based on current page
function renderDiscounts() {
  const discountTableBody = document.querySelector('.datatables-discounts tbody');
  if (!discountTableBody) {
    console.error('Discount table body not found');
    return;
  }
  
  // Clear existing rows
  discountTableBody.innerHTML = '';
  
  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, mockDiscounts.length);
  
  // Add rows for current page
  for (let i = startIndex; i < endIndex; i++) {
    const discount = mockDiscounts[i];
    const row = document.createElement('tr');
    
    // Format expiration date
    const expDate = new Date(discount.expiryDate);
    const isExpired = expDate < new Date();
    const expDateFormatted = expDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    // Create row HTML
    row.innerHTML = `
      <td>${formatDate(new Date(discount.date))}</td>
      <td class="${isExpired ? 'text-danger' : ''}">${expDateFormatted}${isExpired ? ' (Expired)' : ''}</td>
      <td>${discount.discount}%</td>
      <td>
        <div class="d-flex align-items-center">
          <span class="fw-medium me-2">${discount.code}</span>
          <i class="bx bx-copy text-muted cursor-pointer" onclick="copyCode('${discount.code}')"></i>
        </div>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-2">
            <span class="avatar-initial rounded-circle bg-primary">
              <i class="bx bx-user text-white"></i>
            </span>
          </div>
          <span>${discount.customer}</span>
        </div>
      </td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-danger" onclick="deleteDiscount(${discount.id})">
          <i class="bx bx-trash"></i> Delete
        </button>
      </td>
      <td class="text-center">
        <button class="btn btn-sm btn-outline-warning" onclick="viewDiscount(${discount.id})">
          <i class="bx bx-show"></i> View
        </button>
      </td>
    `;
    
    discountTableBody.appendChild(row);
  }
  
  // Update pagination info
  updatePaginationInfo();
  
  // Re-attach event listeners after rendering
  setupPagination();
}

// Setup pagination event listeners
function setupPagination() {
  const totalPages = Math.ceil(mockDiscounts.length / itemsPerPage);
  
  // Remove any existing event listeners to prevent duplicates
  const oldFirstBtn = document.getElementById('firstPageBtn');
  const oldLastBtn = document.getElementById('lastPageBtn');
  const oldPageLinks = document.querySelectorAll('.page-link[data-page]');
  
  if (oldFirstBtn) {
    const newFirstBtn = oldFirstBtn.cloneNode(true);
    oldFirstBtn.parentNode.replaceChild(newFirstBtn, oldFirstBtn);
  }
  
  if (oldLastBtn) {
    const newLastBtn = oldLastBtn.cloneNode(true);
    oldLastBtn.parentNode.replaceChild(newLastBtn, oldLastBtn);
  }
  
  oldPageLinks.forEach(link => {
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
  });

  // First page button
  document.getElementById('firstPageBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage = 1;
      renderDiscounts();
    }
  });

  // Page number buttons
  document.querySelectorAll('.page-link[data-page]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const page = parseInt(e.target.getAttribute('data-page'));
      if (!isNaN(page) && page !== currentPage) {
        currentPage = page;
        renderDiscounts();
      }
    });
  });

  // Last page button
  document.getElementById('lastPageBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const totalPages = Math.ceil(mockDiscounts.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage = totalPages;
      renderDiscounts();
    }
  });
}

// Update pagination information
function updatePaginationInfo() {
  const totalPages = Math.ceil(mockDiscounts.length / itemsPerPage);
  const maxVisiblePages = 5;
  
  // Update pagination container
  const paginationContainer = document.querySelector('.pagination');
  if (!paginationContainer) {
    console.error('Pagination container not found');
    return;
  }
  
  let paginationHTML = '';
  
  // First page button
  paginationHTML += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" id="firstPageBtn">&laquo;</a>
    </li>`;
  
  // Page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  // Add page numbers
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>`;
  }
  
  // Last page button
  paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" id="lastPageBtn">&raquo;</a>
    </li>`;
  
  // Update the pagination HTML
  paginationContainer.innerHTML = paginationHTML;
  
  console.log('Pagination updated:', { currentPage, totalPages, startPage, endPage });
}

// Export functions to global scope
window.generateDiscount = generateDiscount;
window.copyCode = copyCode;
window.deleteDiscount = deleteDiscount;
window.viewDiscount = viewDiscount;
window.submitDiscount = submitDiscount;
window.downloadDiscount = downloadDiscount;
