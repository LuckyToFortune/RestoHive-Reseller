/**
 * app-ecommerce-order-list Script
 */

'use strict';

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

  var dt_order_table = $('.datatables-order'),
    statusObj = {
<<<<<<< HEAD
      1: { title: 'Dispatched', class: 'bg-label-warning' },
      2: { title: 'Delivered', class: 'bg-label-success' },
      3: { title: 'Out for Delivery', class: 'bg-label-primary' },
      4: { title: 'Ready to Pickup', class: 'bg-label-info' }
=======
      1: { title: 'Processing', class: 'bg-label-warning' },
      2: { title: 'Delivered', class: 'bg-label-success' },
      3: { title: 'Cancelled', class: 'bg-label-danger' },
      4: { title: 'Hold', class: 'bg-label-warning' }
>>>>>>> dev
    },
    paymentObj = {
      1: { title: 'Paid', class: 'text-success' },
      2: { title: 'Pending', class: 'text-warning' },
      3: { title: 'Failed', class: 'text-danger' },
      4: { title: 'Cancelled', class: 'text-secondary' }
    };

  // E-commerce Products datatable

  if (dt_order_table.length) {
    var dt_products = dt_order_table.DataTable({
      ajax: assetsPath + 'json/ecommerce-customer-order.json', // JSON file to add data
      columns: [
<<<<<<< HEAD
        // columns according to JSON
        { data: 'id' },
        { data: 'id' },
        { data: 'order' },
        { data: 'date' },
        { data: 'customer' }, //email //avatar
        { data: 'payment' },
        { data: 'status' },
        { data: 'method' }, //method_number
        { data: '' }
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
          // Order ID
          targets: 2,
          render: function (data, type, full, meta) {
            var $order_id = full['order'];
            // Creates full output for row
            var $row_output = '<a href="/Ecommerce/OrderDetails"><span>#' + $order_id + '</span></a>';
            return $row_output;
=======
        { data: null },         // Checkbox
        { data: 'order' },      // ORDER
        { data: 'date' },       // DATE
        { data: '' },           // TO ADDRESS (static)
        { data: '' },           // DELIVERY DATE (based on status)
        { data: 'status' },     // STATUS
        { data: '' },           // PAYMENT METHOD (static)
        { data: '' }            // ACTION
      ],
      columnDefs: [
        {
          // Checkbox
          targets: 0,
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return '<input type="checkbox" class="order-checkbox">';
          }
        },
        {
          // Order ID
          targets: 1,
          render: function (data, type, full, meta) {
            var $order_id = full['order'];
            return '<a href="/Ecommerce/OrderDetails"><span>#' + $order_id + '</span></a>';
>>>>>>> dev
          }
        },
        {
          // Date and Time
<<<<<<< HEAD
          targets: 3,
          render: function (data, type, full, meta) {
            var date = new Date(full.date); // convert the date string to a Date object
            var timeX = full['time'].substring(0, 5);
            var formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              time: 'numeric'
            });
            return '<span class="text-nowrap">' + formattedDate + ', ' + timeX + '</span>';
          }
        },
        {
          // Customers
          targets: 4,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full['customer'],
              $email = full['email'],
              $avatar = full['avatar'];
            if ($avatar) {
              // For Avatar image
              var $output =
                '<img src="' + assetsPath + 'img/avatars/' + $avatar + '" alt="Avatar" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['customer'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center order-name text-nowrap">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar avatar-sm me-3">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<h6 class="m-0"><a href="/Pages/ProfileUser" class="text-heading">' +
              $name +
              '</a></h6>' +
              '<small>' +
              $email +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          targets: 5,
          render: function (data, type, full, meta) {
            var $payment = full['payment'],
              $paymentObj = paymentObj[$payment];
            if ($paymentObj) {
              return (
                '<h6 class="mb-0 align-items-center d-flex w-px-100 ' +
                $paymentObj.class +
                '">' +
                '<i class="bx bxs-circle bx-8px me-1"></i>' +
                $paymentObj.title +
                '</h6>'
              );
            }
            return data;
=======
          targets: 2,
          render: function (data, type, full, meta) {
            var date = new Date(full.date);
            var timeX = full['time'] ? full['time'].substring(0, 5) : '';
            var formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            return '<span class="text-nowrap">' + formattedDate + (timeX ? ', ' + timeX : '') + '</span>';
          }
        },
        {
          // To Address
          targets: 3,
          render: function (data, type, full, meta) {
            return '<span class="text-nowrap">123 Main St, New York</span>';
          }
        },
        {
          // Delivery Date
          targets: 4,
          render: function (data, type, full, meta) {
            if (full['status'] == 2 || full['status'] == 1) {
              return '<span class="text-nowrap">10-20-2020</span>';
            } else {
              return '<span class="text-nowrap">-</span>';
            }
>>>>>>> dev
          }
        },
        {
          // Status
<<<<<<< HEAD
          targets: -3,
          render: function (data, type, full, meta) {
            var $status = full['status'];

            return (
              '<span class="badge px-2 ' +
              statusObj[$status].class +
              '" text-capitalized>' +
              statusObj[$status].title +
              '</span>'
            );
=======
          targets: 5,
          render: function (data, type, full, meta) {
            var $status = full['status'];
            var statusMap = {
              1: { text: 'Processing', class: 'order-status-processing' },
              2: { text: 'Delivered', class: 'order-status-delivered' },
              3: { text: 'Canceled', class: 'order-status-canceled' },
              4: { text: 'Hold', class: 'order-status-hold' }
            };
            var s = statusMap[$status] || statusMap[1];
            return '<span class="order-status ' + s.class + '">' + s.text + '</span>';
>>>>>>> dev
          }
        },
        {
          // Payment Method
<<<<<<< HEAD
          targets: -2,
          render: function (data, type, full, meta) {
            var $method = full['method'];
            var $method_number = full['method_number'];

            if ($method == 'paypal') {
              $method_number = '@gmail.com';
            }
            return (
              '<div class="d-flex align-items-center text-nowrap">' +
              '<img src="' +
              assetsPath +
              'img/icons/payments/' +
              $method +
              '.png" alt="' +
              $method +
              '" width="29">' +
              '<span><i class="bx bx-dots-horizontal-rounded mt-1"></i>' +
              $method_number +
              '</span>' +
=======
          targets: 6,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex align-items-center text-nowrap">' +
              '<img src="' + assetsPath + 'img/icons/payments/mastercard.png" alt="mastercard" width="24" class="me-2">' +
              '<span>****0573</span>' +
>>>>>>> dev
              '</div>'
            );
          }
        },
        {
<<<<<<< HEAD
          // Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex justify-content-sm-start align-items-sm-center">' +
              '<button class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded bx-md"></i></button>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="/Ecommerce/OrderDetails" class="dropdown-item">View</a>' +
              '<a href="javascript:0;" class="dropdown-item delete-record">' +
              'Delete' +
              '</a>' +
              '</div>' +
              '</div>'
=======
          // Action
          targets: 7,
          title: 'Action',
          searchable: false,
          orderable: false,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            return (
              '<button class="btn btn-sm btn-track" style="background-color: #fd7e14; color: white; border-color: #fd7e14;" onclick="openTrackingPage(\'' + full.order + '\', \'' + (full.customer || '') + '\', \'' + full.date + '\', ' + full.status + ')">Track</button>'
>>>>>>> dev
            );
          }
        }
      ],
<<<<<<< HEAD
      order: [3, 'asc'], //set any columns order asc/desc
=======
      order: [2, 'asc'], //set any columns order asc/desc
>>>>>>> dev
      dom:
        '<"card-header py-0 d-flex flex-column flex-md-row align-items-center"<f><"d-flex align-items-center justify-content-md-end gap-2 justify-content-center"l<"dt-action-buttons"B>>' +
        '>t' +
        '<"row"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      lengthMenu: [10, 40, 60, 80, 100], //for length of menu
      language: {
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'Search Order',
        info: 'Displaying _START_ to _END_ of _TOTAL_ entries',
        paginate: {
          next: '<i class="bx bx-chevron-right bx-18px"></i>',
          previous: '<i class="bx bx-chevron-left bx-18px"></i>'
        }
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle',
          text: '<i class="bx bx-export bx-sm me-2"></i>Export',
          buttons: [
            {
              extend: 'print',
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: 'dropdown-item',
              exportOptions: {
<<<<<<< HEAD
                columns: [2, 3, 4, 5, 6, 7],
=======
                columns: [1, 2, 3, 4, 5, 6, 7],
>>>>>>> dev
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
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
                // Customize print view for dark
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
<<<<<<< HEAD
                columns: [2, 3, 4, 5, 6, 7],
=======
                columns: [1, 2, 3, 4, 5, 6, 7],
>>>>>>> dev
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
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
<<<<<<< HEAD
                columns: [2, 3, 4, 5, 6, 7],
=======
                columns: [1, 2, 3, 4, 5, 6, 7],
>>>>>>> dev
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
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
<<<<<<< HEAD
                columns: [2, 3, 4, 5, 6, 7],
=======
                columns: [1, 2, 3, 4, 5, 6, 7],
>>>>>>> dev
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
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
<<<<<<< HEAD
                columns: [2, 3, 4, 5, 6, 7],
=======
                columns: [2, 3, 4, 5, 6, 7, 8],
>>>>>>> dev
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
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
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['customer'];
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
      }
    });
    $('.dataTables_length').addClass('ms-n2');
    $('.dt-action-buttons').addClass('pt-0');
    $('.dataTables_filter').addClass('ms-n3 mb-0 mb-md-6');
  }

  // Delete Record
  $('.datatables-order tbody').on('click', '.delete-record', function () {
    dt_products.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
<<<<<<< HEAD
=======

// Order Tracking Modal Function
function openTrackingPage(orderId, customerName, orderDate, orderStatus) {
  // Populate modal with order data (same as before)
  document.getElementById('tracking-order').textContent = '#' + orderId;
  document.getElementById('tracking-customer').textContent = customerName;
  document.getElementById('tracking-date').textContent = new Date(orderDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  var paymentAmount = '$85.00';
  if (orderStatus == 1) {
    paymentAmount = '$120.00';
  } else if (orderStatus == 2) {
    paymentAmount = '$95.00';
  } else if (orderStatus == 3) {
    paymentAmount = '$75.00';
  } else if (orderStatus == 4) {
    paymentAmount = '$85.00';
  }
  document.getElementById('tracking-price').textContent = paymentAmount;
  var statusText = '';
  var deliveryDate = '';
  var statusColor = '#fd7e14';
  switch(parseInt(orderStatus)) {
    case 1:
      statusText = 'Processing';
      deliveryDate = '17 June - 19 June';
      statusColor = '#fd7e14';
      break;
    case 2:
      statusText = 'Delivered';
      deliveryDate = '10-20-2020';
      statusColor = '#1dbf73';
      break;
    case 3:
      statusText = 'Canceled';
      deliveryDate = '-';
      statusColor = '#e74c3c';
      break;
    case 4:
      statusText = 'Hold';
      deliveryDate = '-';
      statusColor = '#bfa21d';
      break;
    default:
      statusText = 'Processing';
      deliveryDate = '17 June - 19 June';
      statusColor = '#fd7e14';
  }
  document.getElementById('tracking-status').textContent = statusText;
  document.getElementById('tracking-status').style.color = statusColor;
  document.getElementById('tracking-delivery').textContent = deliveryDate;
  document.getElementById('tracking-address').textContent = '123 Main St, New York';
  document.getElementById('tracking-courier').textContent = new Date(orderDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  document.getElementById('tracking-number').textContent = generateTrackingNumber(orderId);
  updateTrackingTimeline(orderStatus, orderDate);
  // Hide orders table and show tracking page
  document.querySelector('.datatables-order').parentElement.parentElement.style.display = 'none';
  document.getElementById('orderTrackingPage').style.display = '';
}
// Back button handler
$(document).on('click', '#ordersBack', function(e) {
  e.preventDefault();
  document.getElementById('orderTrackingPage').style.display = 'none';
  document.querySelector('.datatables-order').parentElement.parentElement.style.display = '';
});

// Function to update tracking timeline based on order status
function updateTrackingTimeline(orderStatus, orderDate) {
  const timeline = document.querySelector('#tracking-timeline');
  if (!timeline) return;

  // Format the order date
  const orderDateObj = new Date(orderDate);
  const formattedDate = orderDateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  // Update timeline dates
  document.getElementById('order-placed-date').textContent = formattedDate;
  document.getElementById('dispatched-date').textContent = formattedDate;

  // Set delivery date based on status
  let deliveryDate = '';
  if (orderStatus == 2) {
    deliveryDate = '10-20-2020';
  } else if (orderStatus >= 1) {
    deliveryDate = '17 June - 19 June';
  } else {
    deliveryDate = formattedDate + ' - 19 June';
  }
  document.getElementById('delivered-date').textContent = deliveryDate;

  // Reset all timeline elements
  const circles = timeline.querySelectorAll('.rounded-circle');
  const lines = timeline.querySelectorAll('.flex-grow-1');

  // Order Placed - always completed
  circles[0].className = 'rounded-circle bg-warning d-flex align-items-center justify-content-center me-3';
  circles[0].style.width = '40px';
  circles[0].style.height = '40px';

  // Dispatched - completed for status 1, 2, 4
  if (orderStatus >= 1) {
    circles[1].className = 'rounded-circle bg-warning d-flex align-items-center justify-content-center me-3';
    lines[0].className = 'flex-grow-1 bg-warning';
    lines[0].style.height = '2px';
  } else {
    circles[1].className = 'rounded-circle bg-secondary d-flex align-items-center justify-content-center me-3';
    lines[0].className = 'flex-grow-1 bg-secondary';
    lines[0].style.height = '2px';
  }

  // Delivered - completed for status 2
  if (orderStatus == 2) {
    circles[2].className = 'rounded-circle bg-warning d-flex align-items-center justify-content-center me-3';
    lines[1].className = 'flex-grow-1 bg-warning';
    lines[1].style.height = '2px';
  } else {
    circles[2].className = 'rounded-circle bg-secondary d-flex align-items-center justify-content-center me-3';
    lines[1].className = 'flex-grow-1 bg-secondary';
    lines[1].style.height = '2px';
  }
}

// Function to generate a tracking number based on order ID
function generateTrackingNumber(orderId) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let trackingNumber = '';
  for (let i = 0; i < 25; i++) {
    trackingNumber += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return trackingNumber;
}
>>>>>>> dev
