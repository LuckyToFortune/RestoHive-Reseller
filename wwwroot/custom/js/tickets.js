/**
 * RestoHive Tickets JavaScript
 */

'use strict';

// DOM elements
const ticketsTable = document.querySelector('.table');
const searchInput = document.querySelector('input[placeholder="Search tickets"]');
const newTicketBtn = document.querySelector('.btn-primary');
const closeBtn = document.querySelector('.btn-outline-secondary');
const checkboxes = document.querySelectorAll('.form-check-input');

/**
 * Initialize tickets page
 */
const initTickets = function() {
  // Initialize search functionality
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      filterTickets(searchTerm);
    });
  }

  // Initialize new ticket button
  if (newTicketBtn) {
    newTicketBtn.addEventListener('click', function() {
      showNewTicketModal();
    });
  }

  // Initialize close button
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      showCloseConfirmation();
    });
  }

  // Initialize checkboxes
  if (checkboxes.length > 0) {
    const headerCheckbox = checkboxes[0];
    headerCheckbox.addEventListener('change', function() {
      const isChecked = headerCheckbox.checked;
      checkboxes.forEach((checkbox, index) => {
        if (index > 0) { // Skip the header checkbox
          checkbox.checked = isChecked;
        }
      });
    });
  }

  // Initialize row click events
  if (ticketsTable) {
    const rows = ticketsTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
      row.addEventListener('click', function(e) {
        // Don't trigger if clicking on checkbox
        if (e.target.type !== 'checkbox') {
          const ticketId = this.querySelector('td:nth-child(2)').textContent;
          const subject = this.querySelector('td:nth-child(5)').textContent;
          viewTicket(ticketId, subject);
        }
      });
    });
  }
};

/**
 * Filter tickets based on search term
 * @param {string} searchTerm - The search term to filter by
 */
const filterTickets = function(searchTerm) {
  const rows = ticketsTable.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
};

/**
 * Show new ticket modal
 */
const showNewTicketModal = function() {
  console.log('Showing new ticket modal');
  // Show the modal using Bootstrap's modal API
  const newTicketModal = new bootstrap.Modal(document.getElementById('newTicketModal'));
  newTicketModal.show();
};

/**
 * Show close confirmation dialog
 */
const showCloseConfirmation = function() {
  console.log('Showing close confirmation');
  // This would typically show a confirmation dialog before closing selected tickets
  const selectedCount = Array.from(checkboxes).filter(cb => cb.checked && cb !== checkboxes[0]).length;
  
  if (selectedCount === 0) {
    alert('Please select at least one ticket to close');
  } else {
    const confirmed = confirm(`Are you sure you want to close ${selectedCount} ticket(s)?`);
    if (confirmed) {
      closeSelectedTickets();
    }
  }
};

/**
 * Close selected tickets
 */
const closeSelectedTickets = function() {
  console.log('Closing selected tickets');
  // This would typically send a request to the server to close the selected tickets
  alert('Selected tickets have been closed');
  
  // Update UI to show tickets as closed
  const rows = ticketsTable.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const checkbox = row.querySelector('.form-check-input');
    if (checkbox && checkbox.checked) {
      const statusCell = row.querySelector('td:last-child');
      statusCell.innerHTML = '<span class="badge bg-label-info">Closed</span>';
      checkbox.checked = false;
    }
  });
  
  // Uncheck header checkbox
  if (checkboxes.length > 0) {
    checkboxes[0].checked = false;
  }
};

/**
 * View ticket details
 * @param {string} ticketId - The ID of the ticket to view
 * @param {string} subject - The subject of the ticket
 */
const viewTicket = function(ticketId, subject) {
  console.log(`Viewing ticket #${ticketId}: ${subject}`);
  // This would typically show a modal with the ticket details
  alert(`Viewing ticket #${ticketId}: ${subject}\n\nTicket details will be displayed here.`);
};

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initTickets();
});

// Export functions for global access
window.ticketsApp = {
  initTickets,
  filterTickets,
  showNewTicketModal,
  showCloseConfirmation,
  closeSelectedTickets,
  viewTicket
};