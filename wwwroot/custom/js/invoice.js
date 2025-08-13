/**
 * Invoice List with Pagination
 */

'use strict';

// Generate mock invoice data
function generateMockInvoices(count = 50) {
  const statuses = [
    { class: 'badge-paid', text: 'Paid' },
    { class: 'badge-canceled', text: 'Canceled' },
    { class: 'badge-refunded', text: 'Refunded' },
    { class: 'badge-pending', text: 'Pending' },
    { class: 'badge-unpaid', text: 'Unpaid' },
    { class: 'badge-partial', text: 'Partially Refund' }
  ];

  const invoices = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const invoiceDate = new Date();
    const dueDate = new Date();
    invoiceDate.setDate(now.getDate() - Math.floor(Math.random() * 30));
    dueDate.setDate(invoiceDate.getDate() + Math.floor(Math.random() * 15) + 5);

    const status = statuses[Math.floor(Math.random() * statuses.length)];

    invoices.push({
      id: 6000 + i,
      orderNumber: Math.floor(10000000 + Math.random() * 90000000).toString(),
      transactionNumber: Math.floor(10000000000000 + Math.random() * 90000000000000).toString(),
      status: status,
      createdDate: invoiceDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dueDate: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  }

  return invoices;
}

// Pagination state
let currentPage = 1;
const itemsPerPage = 5;
let invoices = [];

// Initialize the invoice table
function initInvoiceTable() {
  // Generate mock data
  invoices = generateMockInvoices(50);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  // Render initial table
  renderTable();
  renderPagination(totalPages);

  // Handle pagination clicks
  document.addEventListener('click', function(e) {
    if (e.target.closest('.page-link')) {
      e.preventDefault();
      const target = e.target.closest('.page-link');
      const action = target.getAttribute('data-page');

      if (action === 'prev' && currentPage > 1) {
        currentPage--;
      } else if (action === 'next' && currentPage < totalPages) {
        currentPage++;
      } else if (action === 'first') {
        currentPage = 1;
      } else if (action === 'last') {
        currentPage = totalPages;
      } else if (action === 'page') {
        currentPage = parseInt(target.textContent);
      }

      renderTable();
      renderPagination(totalPages);

      // Scroll to top of table
      document.querySelector('.card-datatable').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Handle date filter
  const dateFilterBtn = document.querySelector('.date-filter-btn');
  if (dateFilterBtn) {
    dateFilterBtn.addEventListener('click', function() {
      // Reset to first page when filtering
      currentPage = 1;
      renderTable();
      renderPagination(totalPages);
    });
  }
}

// Render table with current page data
function renderTable() {
  const tbody = document.querySelector('#invoicesTable tbody');
  if (!tbody) return;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = invoices.slice(startIdx, endIdx);

  tbody.innerHTML = currentItems.map(invoice => `
    <tr>
      <td><input type="checkbox" class="form-check-input"></td>
      <td><a href="#">#${invoice.id}</a></td>
      <td>${invoice.orderNumber}</td>
      <td>${invoice.transactionNumber}</td>
      <td>${invoice.dueDate}</td>
      <td>${invoice.createdDate}</td>
      <td><button class="btn btn-download">Download</button></td>
      <td><span class="badge-status ${invoice.status.class}">${invoice.status.text}</span></td>
    </tr>
  `).join('');
}

// Render pagination controls
function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  if (!pagination) return;

  let paginationHTML = '';
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
  paginationHTML += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="prev" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>`;

  // First page
  if (startPage > 1) {
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" data-page="1">1</a>
      </li>`;
    if (startPage > 2) {
      paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="page">${i}</a>
      </li>`;
  }

  // Last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
      </li>`;
  }

  // Next button
  paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="next" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>`;

  pagination.innerHTML = paginationHTML;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initInvoiceTable();

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      boundary: document.body
    });
  });

  // Handle delete record
  document.addEventListener('click', function(e) {
    if (e.target.closest('.delete-record')) {
      e.preventDefault();
      const row = e.target.closest('tr');
      if (row) {
        row.remove();
      }
    }
  });
});
