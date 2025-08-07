/**
<<<<<<< HEAD
 * Page User List
=======
 * Files page functionality
>>>>>>> dev
 */

'use strict';

<<<<<<< HEAD
// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_user_table = $('.datatables-users'),
    select2 = $('.select2'),
    userView = '/Users/ViewAccount',
    statusObj = {
      1: { title: 'Pending', class: 'bg-label-warning' },
      2: { title: 'Active', class: 'bg-label-success' },
      3: { title: 'Inactive', class: 'bg-label-secondary' }
    };

  if (select2.length) {
    var $this = select2;
    $this.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select Country',
      dropdownParent: $this.parent()
    });
  }

  // Users datatable
  if (dt_user_table.length) {
    var dt_user = dt_user_table.DataTable({
      ajax: assetsPath + 'json/user-list.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'id' },
        { data: 'id' },
        { data: 'full_name' },
        { data: 'role' },
        { data: 'current_plan' },
        { data: 'billing' },
        { data: 'status' },
        { data: 'action' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          },
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
          },
          searchable: false
        },
        {
          // User full name and email
          targets: 2,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['full_name'],
              $email = full['email'],
              $image = full['avatar'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' + assetsPath + 'img/avatars/' + $image + '" alt="Avatar" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['full_name'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center user-name">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar avatar-sm me-4">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' +
              userView +
              '" class="text-heading text-truncate"><span class="fw-medium">' +
              $name +
              '</span></a>' +
              '<small>' +
              $email +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // User Role
          targets: 3,
          render: function (data, type, full, meta) {
            var $role = full['role'];
            var roleBadgeObj = {
              Subscriber: '<i class="bx bx-crown text-primary me-2"></i>',
              Author: '<i class="bx bx-edit text-warning me-2"></i>',
              Maintainer: '<i class="bx bx-user text-success me-2"></i>',
              Editor: '<i class="bx bx-pie-chart-alt text-info me-2"></i>',
              Admin: '<i class="bx bx-desktop text-danger me-2"></i>'
            };
            return (
              "<span class='text-truncate d-flex align-items-center text-heading'>" +
              roleBadgeObj[$role] +
              $role +
              '</span>'
            );
          }
        },
        {
          // Plans
          targets: 4,
          render: function (data, type, full, meta) {
            var $plan = full['current_plan'];

            return '<span class="text-heading">' + $plan + '</span>';
          }
        },
        {
          // User Status
          targets: 6,
          render: function (data, type, full, meta) {
            var $status = full['status'];

            return (
              '<span class="badge ' +
              statusObj[$status].class +
              '" text-capitalized>' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex align-items-center">' +
              '<a href="javascript:;" class="btn btn-icon delete-record"><i class="bx bx-trash bx-md"></i></a>' +
              '<a href="' +
              userView +
              '" class="btn btn-icon"><i class="bx bx-show bx-md"></i></a>' +
              '<a href="javascript:;" class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded bx-md"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Edit</a>' +
              '<a href="javascript:;" class="dropdown-item">Suspend</a>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[2, 'desc']],
      dom:
        '<"row"' +
        '<"col-md-2"<"ms-n2"l>>' +
        '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-6 mb-md-0 mt-n6 mt-md-0 gap-md-4"fB>>' +
        '>t' +
        '<"row"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'Search User',
        paginate: {
          next: '<i class="bx bx-chevron-right bx-18px"></i>',
          previous: '<i class="bx bx-chevron-left bx-18px"></i>'
        }
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle me-4',
          text: '<i class="bx bx-export me-2 bx-sm"></i>Export',
          buttons: [
            {
              extend: 'print',
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be print
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css('color', headingColor)
                  .css('border-color', borderColor)
                  .css('background-color', bodyBg);
                $(win.document.body)
                  .find('table')
                  .addClass('compact')
                  .css('color', 'inherit')
                  .css('border-color', 'inherit')
                  .css('background-color', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'excel',
              text: '<i class="bx bxs-file-export me-2"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'pdf',
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'copy',
              text: '<i class="bx bx-copy me-2" ></i>Copy',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            }
          ]
        },
        {
          text: '<i class="bx bx-plus bx-sm me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add New User</span>',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#offcanvasAddUser'
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },
      initComplete: function () {
        // Adding role filter once table initialized
        this.api()
          .columns(3)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>'
            )
              .appendTo('.user_role')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>');
              });
          });
        // Adding plan filter once table initialized
        this.api()
          .columns(4)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option></select>'
            )
              .appendTo('.user_plan')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>');
              });
          });
        // Adding status filter once table initialized
        this.api()
          .columns(6)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option></select>'
            )
              .appendTo('.user_status')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append(
                  '<option value="' +
                    statusObj[d].title +
                    '" class="text-capitalize">' +
                    statusObj[d].title +
                    '</option>'
                );
              });
          });
      }
    });
    // To remove default btn-secondary in export buttons
    $('.dt-buttons > .btn-group > button').removeClass('btn-secondary');
  }

  // Delete Record
  $('.datatables-users tbody').on('click', '.delete-record', function () {
    dt_user.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});

// Validation & Phone mask
(function () {
  const phoneMaskList = document.querySelectorAll('.phone-mask'),
    addNewUserForm = document.getElementById('addNewUserForm');

  // Phone Number
  if (phoneMaskList) {
    phoneMaskList.forEach(function (phoneMask) {
      new Cleave(phoneMask, {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }
  // Add New User Form Validation
  const fv = FormValidation.formValidation(addNewUserForm, {
    fields: {
      userFullname: {
        validators: {
          notEmpty: {
            message: 'Please enter fullname '
          }
        }
      },
      userEmail: {
        validators: {
          notEmpty: {
            message: 'Please enter your email'
          },
          emailAddress: {
            message: 'The value is not a valid email address'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        // Use this for enabling/changing valid/invalid class
        eleValidClass: '',
        rowSelector: function (field, ele) {
          // field is the field name & ele is the field element
          return '.mb-6';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      // Submit the form when all fields are valid
      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  });
})();
=======
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
>>>>>>> dev
