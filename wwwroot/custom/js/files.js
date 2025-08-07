/**
 * Files page functionality
 */

'use strict';

// Document data (in a real app, this would come from the server)
const documents = [
  {
    id: 1,
    date: '01 Jan 2025',
    title: 'Contract employment',
    owner: 'Annette',
    fileUrl: '/documents/contract-1.pdf'
  },
  {
    id: 2,
    date: '01 Jan 2025',
    title: 'Contract employment',
    owner: 'Annette',
    fileUrl: '/documents/contract-2.pdf'
  },
  {
    id: 3,
    date: '01 Jan 2025',
    title: 'Contract employment',
    owner: 'Annette',
    fileUrl: '/documents/contract-3.pdf'
  },
  {
    id: 4,
    date: '01 Jan 2025',
    title: 'Contract employment',
    owner: 'Annette',
    fileUrl: '/documents/contract-4.pdf'
  },
  {
    id: 5,
    date: '01 Jan 2025',
    title: 'Contract employment',
    owner: 'Annette',
    fileUrl: '/documents/contract-5.pdf'
  }
];

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function () {
  initializeFilesPage();
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
            <button type="button" class="btn btn-warning" onclick="downloadDocument(${document.id})">
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

// Add document to table
function addDocumentToTable(document) {
  const tbody = document.querySelector('.datatables-documents tbody');
  if (tbody) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${document.date}</td>
      <td>${document.title}</td>
      <td>
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-2">
            <span class="avatar-initial rounded-circle bg-primary">
              <i class="bx bx-user text-white"></i>
            </span>
          </div>
          <span>${document.owner}</span>
        </div>
      </td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-warning" onclick="downloadDocument(${document.id})">
            <i class="bx bx-download"></i>
            Download
          </button>
          <button class="btn btn-sm btn-outline-warning" onclick="viewDocument(${document.id})">
            <i class="bx bx-show"></i>
            View
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(newRow);
  }
}

// Download all documents
function downloadAllDocuments() {
  showNotification('Preparing all documents for download...', 'info');

  setTimeout(() => {
    showNotification('All documents downloaded successfully!', 'success');
  }, 3000);
}

// Filter documents based on search term
function filterDocuments(searchTerm) {
  const rows = document.querySelectorAll('.datatables-documents tbody tr');

  rows.forEach(row => {
    const documentTitle = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const documentOwner = row.querySelector('td:nth-child(3) span').textContent.toLowerCase();

    if (documentTitle.includes(searchTerm.toLowerCase()) || documentOwner.includes(searchTerm.toLowerCase())) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
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
  document.querySelector('button[onclick="switchToMyFiles()"]').classList.add('btn-warning', 'active');
  document.querySelector('button[onclick="switchToCustomers()"]').classList.remove('btn-warning', 'active');
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
  document.querySelector('button[onclick="switchToCustomers()"]').classList.add('btn-warning', 'active');
  document.querySelector('button[onclick="switchToMyFiles()"]').classList.remove('btn-warning', 'active');
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
