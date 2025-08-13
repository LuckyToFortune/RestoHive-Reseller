/**
 * Files page functionality with pagination
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

// Generate mock documents
function generateMockDocuments(count = 50) {
  const documentTypes = ['Contract', 'Invoice', 'Report', 'Proposal', 'Agreement', 'Receipt'];
  const owners = ['Annette', 'John', 'Sarah', 'Michael', 'Emily', 'David'];
  const mockDocuments = [];
  
  for (let i = 1; i <= count; i++) {
    const docType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
    const owner = owners[Math.floor(Math.random() * owners.length)];
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    const year = 2025;
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    
    mockDocuments.push({
      id: i,
      date: formattedDate,
      title: `${docType} ${i}`,
      owner: owner,
      fileUrl: `/documents/${docType.toLowerCase()}-${i}.pdf`
    });
  }
  
  return mockDocuments;
}

// Document data (in a real app, this would come from the server)
let documents = [];

// Initialize documents with mock data
function initializeDocuments() {
  // Original documents
  const originalDocuments = [
    {
      id: 1,
      date: '01 Jan 2025',
      title: 'Contract employment',
      owner: 'Annette',
      fileUrl: '/documents/contract-1.pdf'
    },
    {
      id: 2,
      date: '05 Jan 2025',
      title: 'Invoice #1001',
      owner: 'John',
      fileUrl: '/documents/invoice-1001.pdf'
    },
    {
      id: 3,
      date: '10 Jan 2025',
      title: 'Monthly report',
      owner: 'Sarah',
      fileUrl: '/documents/report-jan.pdf'
    },
    {
      id: 4,
      date: '15 Jan 2025',
      title: 'Project proposal',
      owner: 'Michael',
      fileUrl: '/documents/proposal-q1.pdf'
    },
    {
      id: 5,
      date: '20 Jan 2025',
      title: 'Service agreement',
      owner: 'Emily',
      fileUrl: '/documents/agreement-2025.pdf'
    }
  ];
  
  // Clear existing documents and add original documents
  documents = [...originalDocuments];
  
  // Add mock documents (ensuring unique IDs)
  const mockDocs = generateMockDocuments(45); // 45 + 5 originals = 50 total
  mockDocs.forEach((doc, index) => {
    doc.id = originalDocuments.length + index + 1;
    documents.push(doc);
  });
  
  return documents;
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function () {
  // Initialize documents data
  initializeDocuments();
  
  // Initialize UI components
  initializeFilesPage();
  
  // Render table with pagination
  renderDocumentsTable();
  renderPagination();
});

// Initialize files page
function initializeFilesPage() {
  // Set current date in the date picker
  const dateInput = document.querySelector('input[value="June 29, 2025"]');
  if (dateInput) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    dateInput.value = formattedDate;
  }

  // Initialize add document form
  const addDocumentForm = document.getElementById('addDocumentForm');
  if (addDocumentForm) {
    addDocumentForm.addEventListener('submit', handleAddDocument);
  }

  // Handle file input change
  const documentFile = document.getElementById('documentFile');
  if (documentFile) {
    documentFile.addEventListener('change', function() {
      const fileName = this.files[0]?.name || 'No file selected';
      const uploadBtn = document.querySelector('button[onclick="document.getElementById(\'documentFile\').click()"]');
      if (uploadBtn) {
        uploadBtn.innerHTML = `<i class="bx bx-folder-plus me-2"></i>${fileName}`;
      }
    });
  }

  // Set current date in add document form
  const documentDateInput = document.getElementById('documentDate');
  if (documentDateInput) {
    const today = new Date().toISOString().split('T')[0];
    documentDateInput.value = today;
  }

  // Initialize search functionality
  const searchInput = document.getElementById('searchDocuments');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterDocuments(this.value);
    });
  }
  
  // Initialize pagination event listeners
  document.addEventListener('click', function(e) {
    if (e.target && e.target.closest('.page-link')) {
      e.preventDefault();
      const pageLink = e.target.closest('.page-link');
      if (pageLink.dataset.page) {
        const page = parseInt(pageLink.dataset.page);
        if (page !== paginationConfig.currentPage) {
          paginationConfig.currentPage = page;
          renderDocumentsTable();
          renderPagination();
        }
      } else if (pageLink.closest('.page-item.prev')) {
        if (paginationConfig.currentPage > 1) {
          paginationConfig.currentPage--;
          renderDocumentsTable();
          renderPagination();
        }
      } else if (pageLink.closest('.page-item.next')) {
        if (paginationConfig.currentPage < paginationConfig.totalPages) {
          paginationConfig.currentPage++;
          renderDocumentsTable();
          renderPagination();
        }
      }
    }
  });
}

// Download document
function downloadDocument(documentId) {
  const document = documents.find(d => d.id === documentId);
  if (document) {
    // In a real app, this would trigger a file download
    // For demo purposes, we'll show a notification
    showNotification(`Downloading ${document.title}...`, 'info');

    // Simulate download delay
    setTimeout(() => {
      showNotification(`${document.title} downloaded successfully!`, 'success');
    }, 2000);
  }
}

// View document
function viewDocument(documentId) {
  const document = documents.find(d => d.id === documentId);
  if (document) {
    // In a real app, this would open the document in a viewer
    // For demo purposes, we'll show a modal with document info
    showDocumentViewer(document);
  }
}

// Show document viewer modal
function showDocumentViewer(document) {
  // Create modal HTML
  const modalHTML = `
    <div class="modal fade" id="documentViewerModal" tabindex="-1" aria-labelledby="documentViewerModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="documentViewerModalLabel">${document.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <p><strong>Document Title:</strong> ${document.title}</p>
                <p><strong>Date:</strong> ${document.date}</p>
                <p><strong>Owner:</strong> ${document.owner}</p>
                <p><strong>File:</strong> ${document.fileUrl}</p>
              </div>
              <div class="col-md-6">
                <div class="document-preview bg-light p-4 text-center">
                  <i class="bx bx-file-pdf bx-lg text-danger"></i>
                  <p class="mt-2">Document Preview</p>
                  <small class="text-muted">PDF document would be displayed here</small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" style="background-color: #ec7905; color: white;" onclick="downloadDocument(${document.id})">
              <i class="bx bx-download me-1"></i>Download
            </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const existingModal = document.getElementById('documentViewerModal');
  if (existingModal) {
    existingModal.remove();
  }

  // Add modal to page
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('documentViewerModal'));
  modal.show();

  // Remove modal from DOM when hidden
  document.getElementById('documentViewerModal').addEventListener('hidden.bs.modal', function () {
    this.remove();
  });
}

// Handle add document form submission
function handleAddDocument(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const documentTitle = formData.get('documentTitle') || document.getElementById('documentTitle').value;
  const documentFile = document.getElementById('documentFile').files[0];
  const documentDate = formData.get('documentDate') || document.getElementById('documentDate').value;
  const documentOwner = formData.get('documentOwner') || document.getElementById('documentOwner').value;

  if (!documentTitle || !documentFile || !documentDate || !documentOwner) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  // In a real app, this would upload the file to the server
  // For demo purposes, we'll simulate the upload
  showNotification('Uploading document...', 'info');

  setTimeout(() => {
    // Add new document to the table
    addDocumentToTable({
      id: documents.length + 1,
      date: new Date(documentDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      title: documentTitle,
      owner: documentOwner,
      fileUrl: URL.createObjectURL(documentFile)
    });

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addDocumentModal'));
    modal.hide();

    // Reset form
    event.target.reset();
    document.getElementById('documentDate').value = new Date().toISOString().split('T')[0];

    showNotification('Document uploaded successfully!', 'success');
  }, 2000);
}

// Add document to table and documents array
function addDocumentToTable(document) {
  // Add to the beginning of the documents array
  documents.unshift(document);
  
  // Reset to first page and re-render
  paginationConfig.currentPage = 1;
  renderDocumentsTable();
  renderPagination();
  
  // Show success message
  showNotification('Document added successfully!', 'success');
}

// Download all documents
function downloadAllDocuments() {
  showNotification('Preparing all documents for download...', 'info');

  setTimeout(() => {
    showNotification('All documents downloaded successfully!', 'success');
  }, 3000);
}

// Render documents table with pagination
function renderDocumentsTable() {
  const tableBody = document.querySelector('.datatables-documents tbody');
  if (!tableBody) return;
  
  // Clear existing rows
  tableBody.innerHTML = '';
  
  // Calculate pagination
  const startIndex = (paginationConfig.currentPage - 1) * paginationConfig.itemsPerPage;
  const endIndex = startIndex + paginationConfig.itemsPerPage;
  const paginatedDocuments = documents.slice(startIndex, endIndex);
  
  // Add rows for current page
  paginatedDocuments.forEach(doc => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${doc.date}</td>
      <td>${doc.title}</td>
      <td>
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-2">
            <span class="avatar-initial rounded-circle bg-primary">
              <i class="bx bx-user text-white"></i>
            </span>
          </div>
          <span>${doc.owner}</span>
        </div>
      </td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-warning" onclick="downloadDocument(${doc.id})">
            <i class="bx bx-download"></i> Download
          </button>
          <button class="btn btn-sm btn-outline-warning" onclick="viewDocument(${doc.id})">
            <i class="bx bx-show"></i> View
          </button>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Update pagination info
  paginationConfig.totalItems = documents.length;
  paginationConfig.totalPages = Math.ceil(documents.length / paginationConfig.itemsPerPage);
  
  // Hide pagination if no items or only one page
  const paginationContainer = document.querySelector('.pagination');
  if (paginationContainer) {
    if (documents.length <= paginationConfig.itemsPerPage) {
      paginationContainer.closest('nav').style.display = 'none';
    } else {
      paginationContainer.closest('nav').style.display = 'block';
    }
  }
}

// Render pagination controls
function renderPagination() {
  const paginationContainer = document.querySelector('.pagination');
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
}

// Filter documents based on search term
function filterDocuments(searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') {
    // If search is empty, reset to first page and show all
    paginationConfig.currentPage = 1;
    renderDocumentsTable();
    renderPagination();
    return;
  }
  
  const searchTermLower = searchTerm.toLowerCase();
  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTermLower) || 
    doc.owner.toLowerCase().includes(searchTermLower) ||
    doc.date.toLowerCase().includes(searchTermLower)
  );
  
  // Store filtered documents temporarily
  const originalDocs = [...documents];
  documents = filteredDocs;
  
  // Reset to first page and render
  paginationConfig.currentPage = 1;
  renderDocumentsTable();
  renderPagination();
  
  // Restore original documents
  documents = originalDocs;
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
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

// Switch to My Files tab
function switchToMyFiles() {
  // Update tab buttons
  document.querySelector('button[onclick="switchToMyFiles()"]').classList.remove('btn-outline-secondary');
  document.querySelector('button[onclick="switchToMyFiles()"]').classList.add('active');
  document.querySelector('button[onclick="switchToMyFiles()"]').style.backgroundColor = '#ec7905';
  document.querySelector('button[onclick="switchToMyFiles()"]').style.color = 'white';
  document.querySelector('button[onclick="switchToCustomers()"]').classList.remove('active');
  document.querySelector('button[onclick="switchToCustomers()"]').style.backgroundColor = '';
  document.querySelector('button[onclick="switchToCustomers()"]').style.color = '';
  document.querySelector('button[onclick="switchToCustomers()"]').classList.add('btn-outline-secondary');

  // Update content for My Files
  document.querySelector('h3.fw-bold').textContent = 'My Files';

  // Show notification
  showNotification('Switched to My Files', 'info');
}

// Switch to Customers tab
function switchToCustomers() {
  // Update tab buttons
  document.querySelector('button[onclick="switchToCustomers()"]').classList.remove('btn-outline-secondary');
  document.querySelector('button[onclick="switchToCustomers()"]').classList.add('active');
  document.querySelector('button[onclick="switchToCustomers()"]').style.backgroundColor = '#ec7905';
  document.querySelector('button[onclick="switchToCustomers()"]').style.color = 'white';
  document.querySelector('button[onclick="switchToMyFiles()"]').classList.remove('active');
  document.querySelector('button[onclick="switchToMyFiles()"]').style.backgroundColor = '';
  document.querySelector('button[onclick="switchToMyFiles()"]').style.color = '';
  document.querySelector('button[onclick="switchToMyFiles()"]').classList.add('btn-outline-secondary');

  // Update content for Customers
  document.querySelector('h3.fw-bold').textContent = 'Customer ID: 5151';

  // Show notification
  showNotification('Switched to Customers', 'info');
}

// Export functions to global scope
window.downloadDocument = downloadDocument;
window.viewDocument = viewDocument;
window.downloadAllDocuments = downloadAllDocuments;
window.switchToMyFiles = switchToMyFiles;
window.switchToCustomers = switchToCustomers;
