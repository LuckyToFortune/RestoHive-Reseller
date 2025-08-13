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
      1: { title: 'Processing', class: 'bg-label-warning' },
      2: { title: 'Delivered', class: 'bg-label-success' },
      3: { title: 'Cancelled', class: 'bg-label-danger' },
      4: { title: 'Hold', class: 'bg-label-warning' }
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
            return '<span class="fw-bold text-dark">#' + $order_id + '</span>';
          }
        },
        {
          // Date and Time
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
          }
        },
        {
          // Status
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
          }
        },
        {
          // Payment Method
          targets: 6,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex align-items-center text-nowrap">' +
              '<img src="' + assetsPath + 'img/icons/payments/mastercard.png" alt="mastercard" width="24" class="me-2">' +
              '<span>****0573</span>' +
              '</div>'
            );
          }
        },
        {
          // Action
          targets: 7,
          title: 'Action',
          searchable: false,
          orderable: false,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            return (
              '<button class="btn btn-sm btn-track" onclick="openTrackingPage(\'' + full.order + '\', \'' + (full.customer || '') + '\', \'' + full.date + '\', ' + full.status + ')">Track</button>'
            );
          }
        }
      ],
      order: [2, 'asc'], //set any columns order asc/desc
      dom: "<'card-header py-0 d-flex flex-column flex-md-row align-items-center'<'head-label'f><'dt-action-buttons text-end'B>>t<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>",
      lengthChange: false,
      pageLength: 10,
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
      // Export Button
      buttons: [
        {
          extend: 'excel',
          className: 'btn btn-warning my-2',
          text: '<i class="bx bx-export me-2"></i>Export',
          exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7],
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
    // Place Date & Time button into DataTables header next to Export
    var dateBtnHtml = '<button class="btn border d-flex align-items-center px-3 py-2 rounded-pill my-2"><i class="bx bx-time-five me-2"></i>Date And Time</button>';
    var $header = dt_order_table.closest('.card').find('.card-header');
    $header.addClass('justify-content-between');
    $('.head-label').empty().append(dateBtnHtml);
    $('.dt-action-buttons').removeClass('text-end').addClass('d-flex align-items-center');
    $('.dataTables_length').addClass('ms-n2');
    $('.dt-action-buttons').addClass('pt-0');
    $('.dataTables_filter').addClass('ms-n3 mb-0 mb-md-6');
    // Hide the default DataTables search input
    $('.dataTables_filter').hide();

    // Wire up navbar search to DataTable search
    $('#navbarOrdersSearch').on('keyup', function() {
      dt_products.search(this.value).draw();
    });
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

// Make the function globally available
window.openTrackingPage = function(orderId, customerName, orderDate, orderStatus) {
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
  var statusColor = '#1dbf73';
  switch(parseInt(orderStatus)) {
    case 1:
      statusText = 'Shipped';
      deliveryDate = '17 June - 19 June';
      statusColor = '#ff8f00';
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
      statusText = 'Shipped';
      deliveryDate = '17 June - 19 June';
      statusColor = '#ff8f00';
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
  var ordersHeader = document.getElementById('ordersHeaderRow');
  if (ordersHeader) ordersHeader.style.display = 'none';

  // Show the shipping info and map sections
  const shippingContainer = document.getElementById('shippingInfoContainer');
  if (shippingContainer) {
    shippingContainer.style.display = 'flex';
  }
}
// Back button handler
$(document).on('click', '#ordersBack', function(e) {
  e.preventDefault();
  // Hide the tracking page
  document.getElementById('orderTrackingPage').style.display = 'none';

  // Show the orders table
  document.querySelector('.datatables-order').parentElement.parentElement.style.display = '';
  var ordersHeader = document.getElementById('ordersHeaderRow');
  if (ordersHeader) ordersHeader.style.display = '';

  // Hide the shipping info and map sections
  const shippingContainer = document.getElementById('shippingInfoContainer');
  if (shippingContainer) {
    shippingContainer.style.display = 'none';
  }
});

// Function to update tracking timeline based on order status
function updateTrackingTimeline(orderStatus, orderDate) {
  const timeline = document.getElementById('tracking-timeline');
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

  // Delivered date
  let deliveryDate = '';
  if (orderStatus == 2) {
    deliveryDate = '10-20-2020';
  } else {
    deliveryDate = '17 June - 19 June';
  }
  document.getElementById('delivered-date').textContent = deliveryDate;

  // Style circles and lines to match screenshot
  const circles = timeline.querySelectorAll('.timeline-circle');
  const firstLine = timeline.querySelector('.timeline-line.first');
  const middleLine = timeline.querySelectorAll('.timeline-line.middle');
  const lastLine = timeline.querySelector('.timeline-line.last');

  // Reset basic styles
  firstLine.classList.remove('inactive');
  lastLine.classList.add('inactive');

  // Order Placed circle active (orange)
  circles[0].classList.add('bg-warning');
  // Dispatched circle active for shipped/delivered
  if (orderStatus == 1 || orderStatus == 2) {
    circles[1].classList.add('bg-warning');
    middleLine[0].classList.remove('inactive');
  }
  // Delivered circle active only when delivered
  if (orderStatus == 2) {
    circles[2].style.backgroundColor = '#ffc107';
    circles[2].querySelector('i') && (circles[2].querySelector('i').style.color = '#fff');
    lastLine.classList.remove('inactive');
  } else {
    circles[2].style.backgroundColor = '#e9ecef';
    const deliveredIcon = circles[2].querySelector('i');
    if (deliveredIcon) deliveredIcon.style.color = '#6c757d';
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
