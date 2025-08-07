/**
 * Discount page functionality
 */

'use strict';

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function () {
  initializeDiscountPage();
});

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

// Export functions to global scope
window.generateDiscount = generateDiscount;
window.copyCode = copyCode;
window.deleteDiscount = deleteDiscount;
window.viewDiscount = viewDiscount;
window.submitDiscount = submitDiscount;
window.downloadDiscount = downloadDiscount;
