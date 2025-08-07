/**
 * Settings page functionality
 */

'use strict';

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function () {
  initializeSettings();
});

// Initialize settings page
function initializeSettings() {
  // Add any initialization code here
  console.log('Settings page initialized');
}

// Add new card function
function addNewCard() {
  // Open the offcanvas
  const offcanvas = new bootstrap.Offcanvas(document.getElementById('newCardModal'));
  offcanvas.show();
}

// Submit new card function
function submitNewCard() {
  // Get form data
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const expirationDate = document.getElementById('expirationDate').value;
  const cvv = document.getElementById('cvv').value;
  const status = document.getElementById('status').value;

  if (!fullName || !email || !address || !cardNumber || !expirationDate || !cvv) {
    alert('Please fill in all required fields');
    return;
  }

  // Here you would typically send the data to your server
  // For now, we'll just show a success message
  alert('Card added successfully!');

  // Close the offcanvas
  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('newCardModal'));
  offcanvas.hide();

  // Reset the form
  document.getElementById('newCardForm').reset();
}

// Export functions to global scope
window.addNewCard = addNewCard;
window.submitNewCard = submitNewCard;
