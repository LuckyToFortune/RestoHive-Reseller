/**
 * Sub-Resellers Management
 * Implements CRUD operations for sub-resellers with similar functionality to home.js
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

// Sub-resellers data array
let subResellers = [];
let currentSubResellerId = null;

// Generate mock sub-reseller data
function generateMockSubResellers(count = 50) {
  const statuses = ['active', 'pending', 'deactivated'];
  const mockSubResellers = [];
  
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'William', 'Jessica'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];
  
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const totalCustomers = Math.floor(Math.random() * 100) + 1;
    const earning = (Math.random() * 50000).toFixed(2);
    const rate = (Math.random() * 30).toFixed(2);
    
    mockSubResellers.push({
      id: i,
      firstName: firstName,
      lastName: lastName,
      email: email,
      lastCustomer: getRandomDate(new Date(2023, 0, 1), new Date()),
      totalCustomers: totalCustomers,
      earning: parseFloat(earning),
      rate: parseFloat(rate),
      status: status,
      phone: `+1 (${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      joinDate: getRandomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)),
      address: `${Math.floor(100 + Math.random() * 900)} ${['Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Birch', 'Spruce', 'Willow', 'Ash'][Math.floor(Math.random() * 10)]} St, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'][Math.floor(Math.random() * 10)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'WA', 'GA', 'MI'][Math.floor(Math.random() * 10)]} ${Math.floor(10000 + Math.random() * 90000)}`,
      avatar: (i % 10) + 1
    });
  }
  
  return mockSubResellers;
}

// Helper function to get random date between dates
function getRandomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
}


function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}


function initializeSubResellers() {

  const savedSubResellers = localStorage.getItem('subResellers');
  
  if (savedSubResellers) {
    subResellers = JSON.parse(savedSubResellers);
  } else {
  
    subResellers = generateMockSubResellers(50);
    saveSubResellers();
  }
  
 
  renderTable();
  
 
  initializeEventListeners();
}


function saveSubResellers() {
  localStorage.setItem('subResellers', JSON.stringify(subResellers));
}


function renderTable() {
  const tableBody = document.getElementById('subResellersTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';
  
  
  document.querySelectorAll('#subResellersTable tbody tr').forEach(row => {
    row.classList.add('clickable-row');
  });
  
  // Calculate pagination
  const startIndex = (paginationConfig.currentPage - 1) * paginationConfig.itemsPerPage;
  const endIndex = Math.min(startIndex + paginationConfig.itemsPerPage, subResellers.length);
  const paginatedData = subResellers.slice(startIndex, endIndex);
  
  
  paginationConfig.totalItems = subResellers.length;
  paginationConfig.totalPages = Math.ceil(subResellers.length / paginationConfig.itemsPerPage);
  
  // Render table rows
  paginatedData.forEach((subReseller, index) => {
    const row = document.createElement('tr');
    row.className = 'clickable-row';
    row.setAttribute('data-id', subReseller.id);
    row.onclick = () => openEditModal(subReseller.id);
    
    row.innerHTML = `
      <td style="text-align: center;" onclick="event.stopPropagation()">
        <div class="form-check d-inline-flex">
          <input class="form-check-input" type="checkbox" data-id="${subReseller.id}">
        </div>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <div class="avatar avatar-sm me-3">
            <img src="/img/avatars/${subReseller.avatar}.png" alt="Avatar" class="rounded-circle" style="width: 40px; height: 40px;">
          </div>
          <div>
            <div class="fw-semibold">${subReseller.firstName} ${subReseller.lastName}</div>
            <small class="text-muted">${subReseller.email}</small>
          </div>
        </div>
      </td>
      <td>${subReseller.lastCustomer}</td>
      <td>${subReseller.totalCustomers}</td>
      <td style="color: blue; font-weight: 600;">${formatCurrency(subReseller.earning)}</td>
      <td>${subReseller.rate.toFixed(2)} %</td>
      <td>
        <span class="status-badge status-${subReseller.status}">
          <i class="bx ${getStatusIcon(subReseller.status)}"></i>${getStatusText(subReseller.status)}
        </span>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Update pagination controls
  renderPagination();
  
  // Update delete button state
  updateDeleteButtonState();
}

// Get status icon based on status
function getStatusIcon(status) {
  switch (status) {
    case 'active':
      return 'bx-check';
    case 'pending':
      return 'bx-time';
    case 'deactivated':
      return 'bx-x';
    default:
      return 'bx-question-mark';
  }
}

// Get status text with proper capitalization
function getStatusText(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

// Render pagination controls
function renderPagination() {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;
  
  pagination.innerHTML = '';
  
  // Previous button
  const prevLi = document.createElement('li');
  prevLi.className = `page-item prev ${paginationConfig.currentPage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `
    <a class="page-link" href="javascript:void(0);" ${paginationConfig.currentPage === 1 ? 'tabindex="-1"' : ''}>
      <i class="tf-icon bx bx-chevrons-left"></i>
    </a>
  `;
  prevLi.addEventListener('click', () => {
    if (paginationConfig.currentPage > 1) {
      paginationConfig.currentPage--;
      renderTable();
    }
  });
  pagination.appendChild(prevLi);
  
  // Page numbers
  const startPage = Math.max(1, paginationConfig.currentPage - Math.floor(paginationConfig.maxVisiblePages / 2));
  const endPage = Math.min(paginationConfig.totalPages, startPage + paginationConfig.maxVisiblePages - 1);
  
  for (let i = startPage; i <= endPage; i++) {
    const pageLi = document.createElement('li');
    pageLi.className = `page-item ${i === paginationConfig.currentPage ? 'active' : ''}`;
    pageLi.innerHTML = `<a class="page-link" href="javascript:void(0);">${i}</a>`;
    
    if (i !== paginationConfig.currentPage) {
      pageLi.addEventListener('click', () => {
        paginationConfig.currentPage = i;
        renderTable();
      });
    }
    
    pagination.appendChild(pageLi);
  }
  
  // Next button
  const nextLi = document.createElement('li');
  nextLi.className = `page-item next ${paginationConfig.currentPage === paginationConfig.totalPages ? 'disabled' : ''}`;
  nextLi.innerHTML = `
    <a class="page-link" href="javascript:void(0);" ${paginationConfig.currentPage === paginationConfig.totalPages ? 'tabindex="-1"' : ''}>
      <i class="tf-icon bx bx-chevrons-right"></i>
    </a>
  `;
  nextLi.addEventListener('click', () => {
    if (paginationConfig.currentPage < paginationConfig.totalPages) {
      paginationConfig.currentPage++;
      renderTable();
    }
  });
  
  pagination.appendChild(nextLi);
}

// Initialize event listeners
function initializeEventListeners() {
  // Add Sub-Reseller button
  const addSubResellerBtn = document.getElementById('addSubResellerBtn');
  if (addSubResellerBtn) {
    addSubResellerBtn.addEventListener('click', () => {
      try {
        const form = document.getElementById('addSubResellerForm');
        if (form) form.reset();
        
        // Use the global offcanvas instance
        if (addSubResellerOffcanvas) {
          addSubResellerOffcanvas.show();
        } else {
          console.error('Add sub-reseller offcanvas instance not found');
        }
      } catch (error) {
        console.error('Error showing add sub-reseller offcanvas:', error);
      }
    });
  }

  // Add Sub-Reseller form submission
  const addSubResellerForm = document.getElementById('addSubResellerForm');
  if (addSubResellerForm) {
    addSubResellerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      try {
        handleAddSubReseller(e);
        // Close the offcanvas after successful submission
        const offcanvasEl = document.getElementById('addSubResellerModal');
        if (offcanvasEl) {
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (offcanvas) offcanvas.hide();
        }
      } catch (error) {
        console.error('Error adding sub-reseller:', error);
        showToast('Error', 'Failed to add sub-reseller', 'error');
      }
    });
  }

  // Edit Sub-Reseller form submission
  const editSubResellerForm = document.getElementById('editSubResellerForm');
  if (editSubResellerForm) {
    editSubResellerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      try {
        handleUpdateSubReseller(e);
        // Close the offcanvas after successful update
        const offcanvasEl = document.getElementById('editSubResellerModal');
        if (offcanvasEl) {
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (offcanvas) offcanvas.hide();
        }
      } catch (error) {
        console.error('Error updating sub-reseller:', error);
        showToast('Error', 'Failed to update sub-reseller', 'error');
      }
    });
  }

  // Search input
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterSubResellers(searchTerm);
    });
  }

  // Pagination event delegation
  document.querySelector('.pagination')?.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (e.target.closest('.page-link')) {
      const page = parseInt(e.target.closest('.page-link').dataset.page);
      if (page && !isNaN(page)) {
        paginationConfig.currentPage = page;
        renderTable();
      }
    }
  });

  // Handle row clicks for editing (matching home.js approach)
  const table = document.getElementById('subResellersTable');
  if (table) {
    table.addEventListener('click', (e) => {
    
      const row = e.target.closest('tr');
      
      if (row && !e.target.closest('button') && !e.target.closest('a') && !e.target.closest('.form-check')) {
       
        const id = row.getAttribute('data-id');
        if (id) {
          openEditModal(parseInt(id));
        }
      }
    });
  }
}

// Generate a unique ID for new sub-resellers
function generateId() {
  return subResellers.length > 0 ? Math.max(...subResellers.map(sr => sr.id)) + 1 : 1;
}

function handleAddSubReseller(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const newSubReseller = {
    id: generateId(),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    language: formData.get('language') || 'en',
    rate: parseFloat(formData.get('rate')) || 0,
    status: formData.get('status') || 'active',
    address: formData.get('address') || '',
    joinDate: formData.get('joinDate') || new Date().toISOString().split('T')[0],
    totalCustomers: 0,
    earning: 0,
    lastCustomer: null,
    avatar: Math.floor(Math.random() * 10) + 1 
  };
  

  subResellers.unshift(newSubReseller);
  
  // Save to localStorage
  saveSubResellers();
  
  try {
    
    if (addSubResellerOffcanvas) {
      addSubResellerOffcanvas.hide();
    } else {
      
      const offcanvasEl = document.getElementById('addSubResellerModal');
      if (offcanvasEl) {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) offcanvas.hide();
      }
    }
    
    
    const form = document.getElementById('addSubResellerForm');
    if (form) form.reset();
    
    
    showToast('Success', 'Sub-reseller added successfully', 'success');
    
    
    renderTable();
    
  } catch (error) {
    console.error('Error in add sub-reseller completion:', error);
    showToast('Error', 'Failed to complete add sub-reseller operation', 'error');
  }
}


function openEditModal(idOrSubReseller) {
  try {
   
    let subReseller;
    if (typeof idOrSubReseller === 'string' || typeof idOrSubReseller === 'number') {
   
      currentSubResellerId = idOrSubReseller;
      subReseller = subResellers.find(sr => sr.id == idOrSubReseller);
    } else if (typeof idOrSubReseller === 'object' && idOrSubReseller !== null) {
    
      subReseller = idOrSubReseller;
      currentSubResellerId = subReseller.id;
    }

    if (!subReseller) {
      console.error('Sub-reseller not found:', idOrSubReseller);
      return;
    }

    // Populate the form fields
    setValueIfExists('editFirstName', subReseller.firstName || '');
    setValueIfExists('editLastName', subReseller.lastName || '');
    setValueIfExists('editEmail', subReseller.email || '');
    setValueIfExists('editLanguage', subReseller.language || 'en');
    setValueIfExists('editRate', subReseller.rate ? subReseller.rate.toFixed(2) : '0.00');
    setValueIfExists('editStatus', subReseller.status || 'active');
    setValueIfExists('editAddress', subReseller.address || '');
    
    // Helper function to safely set values
    function setValueIfExists(elementId, value) {
      const element = document.getElementById(elementId);
      if (element) {
        element.value = value;
      } else {
        console.warn(`Element with ID '${elementId}' not found`);
      }
    }
    
    // Set photo preview if exists
    const photoPreview = document.getElementById('editPhotoPreview');
    if (photoPreview) {
      photoPreview.src = subReseller.photoUrl || 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(subReseller.firstName + ' ' + subReseller.lastName)}&background=random`;
    }

    
    if (editSubResellerOffcanvas) {
      editSubResellerOffcanvas.show();
    } else {
      console.error('Edit sub-reseller offcanvas instance not found');
    }
  } catch (error) {
    console.error('Error opening edit sub-reseller offcanvas:', error);
  }
}


function handleUpdateSubReseller(e) {
  e.preventDefault();
  
  if (!currentSubResellerId) return;
  
 
  const subResellerIndex = subResellers.findIndex(sr => sr.id === currentSubResellerId);
  if (subResellerIndex === -1) return;
  
 
  const formData = new FormData(e.target);
  
  // Update sub-reseller data
  subResellers[subResellerIndex] = {
    ...subResellers[subResellerIndex],
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    language: formData.get('language') || 'en',
    rate: parseFloat(formData.get('rate')) || 0,
    status: formData.get('status') || 'active',
    address: formData.get('address') || '',
    joinDate: formData.get('joinDate') || new Date().toISOString().split('T')[0]
  };
  
  saveSubResellers();
  
 
  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('editSubResellerModal'));
  if (offcanvas) offcanvas.hide();
  
  
  showToast('Success', 'Sub-reseller updated successfully', 'success');
  
  
  renderTable();
}

// Global variables to store offcanvas instances
let addSubResellerOffcanvas = null;
let editSubResellerOffcanvas = null;

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded, initializing sub-resellers...');
  console.log('Bootstrap available:', typeof bootstrap !== 'undefined');
  console.log('Offcanvas available:', typeof bootstrap.Offcanvas !== 'undefined');
  
  try {
    // Initialize offcanvas instances once
    const addEl = document.getElementById('addSubResellerModal');
    const editEl = document.getElementById('editSubResellerModal');
    
    if (addEl && typeof bootstrap !== 'undefined') {
      try {
       
        const existingModal = bootstrap.Modal.getInstance(addEl);
        const existingOffcanvas = bootstrap.Offcanvas.getInstance(addEl);
        
      
        if (existingModal) existingModal.dispose();
        if (existingOffcanvas) existingOffcanvas.dispose();
        
     
        addSubResellerOffcanvas = new bootstrap.Offcanvas(addEl);
      } catch (error) {
        console.error('Error initializing add sub-reseller offcanvas:', error);
      }
    }
    
    if (editEl && typeof bootstrap !== 'undefined') {
      try {
       
        const existingModal = bootstrap.Modal.getInstance(editEl);
        const existingOffcanvas = bootstrap.Offcanvas.getInstance(editEl);
        
      
        if (existingModal) existingModal.dispose();
        if (existingOffcanvas) existingOffcanvas.dispose();
        
       
        editSubResellerOffcanvas = new bootstrap.Offcanvas(editEl);
      } catch (error) {
        console.error('Error initializing edit sub-reseller offcanvas:', error);
      }
    }
    
    
    initializeSubResellers();
    
    initializeEventListeners();
    
    // Add event listeners for photo upload previews
    document.getElementById('addPhoto')?.addEventListener('change', function() {
      handleImagePreview(this, 'addPhotoPreview');
    });

    document.getElementById('editPhoto')?.addEventListener('change', function() {
      handleImagePreview(this, 'editPhotoPreview');
    });
  } catch (error) {
    console.error('Error initializing sub-resellers:', error);
  }
});


window.openEditModal = openEditModal;
