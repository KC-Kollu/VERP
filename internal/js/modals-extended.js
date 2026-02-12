// ============================================
// EXTENDED MODALS - View/Detail/Confirmation
// ============================================

// Add CSS for detail modals and toasts
$('head').append(`
<style>
.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.detail-section {
  background: #fafafa;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--border);
}

.detail-section.full-width {
  grid-column: span 2;
}

.detail-section h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--dark);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-row {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.8125rem;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row strong {
  color: var(--gray);
  margin-right: 0.5rem;
}

#toastContainer {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  background: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.875rem 1.125rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 300px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast i {
  font-size: 1.125rem;
}

.toast span {
  font-size: 0.875rem;
  color: var(--dark);
  font-weight: 500;
}
</style>
`);

// ============================================
// BOOKING DETAIL MODAL
// ============================================
function showBookingDetail(id) {
  // Sample data - in real app, fetch from API
  const data = {
    id: id,
    customer: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john@email.com',
    eventType: 'Wedding',
    venue: 'Grand Ballroom',
    eventDate: '2026-05-15',
    guests: 300,
    amount: 5000,
    paid: 2500,
    status: 'Confirmed',
    notes: 'Special decoration requirements for evening ceremony'
  };

  const content = `
    <div class="detail-grid">
      <div class="detail-section">
        <h4>Booking Information</h4>
        <div class="detail-row"><strong>Booking ID:</strong> ${data.id}</div>
        <div class="detail-row"><strong>Customer:</strong> ${data.customer}</div>
        <div class="detail-row"><strong>Phone:</strong> ${data.phone}</div>
        <div class="detail-row"><strong>Email:</strong> ${data.email}</div>
      </div>
      <div class="detail-section">
        <h4>Event Details</h4>
        <div class="detail-row"><strong>Event Type:</strong> ${data.eventType}</div>
        <div class="detail-row"><strong>Venue:</strong> ${data.venue}</div>
        <div class="detail-row"><strong>Event Date:</strong> ${data.eventDate}</div>
        <div class="detail-row"><strong>Guests:</strong> ${data.guests}</div>
      </div>
      <div class="detail-section">
        <h4>Financial</h4>
        <div class="detail-row"><strong>Amount:</strong> $${data.amount.toLocaleString()}</div>
        <div class="detail-row"><strong>Paid:</strong> $${data.paid.toLocaleString()}</div>
        <div class="detail-row"><strong>Balance:</strong> $${(data.amount - data.paid).toLocaleString()}</div>
        <div class="detail-row"><strong>Status:</strong> <span class="badge badge-success">${data.status}</span></div>
      </div>
      ${data.notes ? `<div class="detail-section full-width"><h4>Notes</h4><p style="margin: 0; color: var(--gray);">${data.notes}</p></div>` : ''}
    </div>
  `;

  if ($('#bookingDetailModal').length === 0) {
    $('body').append(`
      <div id="bookingDetailModal" class="modal-overlay">
        <div class="modal" style="max-width: 700px;">
          <div class="modal-header">
            <h3>Booking Details</h3>
            <button class="modal-close" onclick="closeModal('bookingDetailModal')">&times;</button>
          </div>
          <div class="modal-body" id="bookingDetailContent"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal('bookingDetailModal')">Close</button>
          </div>
        </div>
      </div>
    `);
  }

  $('#bookingDetailContent').html(content);
  openModal('bookingDetailModal');
}

// ============================================
// LEAD DETAIL MODAL
// ============================================
function showLeadDetail(id) {
  const data = {
    id: id,
    name: 'Alice Brown',
    phone: '(555) 123-4567',
    email: 'alice@email.com',
    source: 'Website',
    eventType: 'Wedding',
    venue: 'Grand Ballroom',
    eventDate: '2026-05-15',
    guests: 300,
    budget: 5000,
    status: 'new',
    createdAt: '2026-02-10',
    notes: 'Looking for elegant wedding venue'
  };

  const content = `
    <div class="detail-grid">
      <div class="detail-section">
        <h4>Contact Information</h4>
        <div class="detail-row"><strong>Lead ID:</strong> ${data.id}</div>
        <div class="detail-row"><strong>Name:</strong> ${data.name}</div>
        <div class="detail-row"><strong>Phone:</strong> ${data.phone}</div>
        <div class="detail-row"><strong>Email:</strong> ${data.email}</div>
        <div class="detail-row"><strong>Source:</strong> <span class="badge badge-info">${data.source}</span></div>
      </div>
      <div class="detail-section">
        <h4>Event Requirements</h4>
        <div class="detail-row"><strong>Event Type:</strong> ${data.eventType}</div>
        <div class="detail-row"><strong>Venue Preference:</strong> ${data.venue}</div>
        <div class="detail-row"><strong>Expected Date:</strong> ${data.eventDate}</div>
        <div class="detail-row"><strong>Guests:</strong> ${data.guests}</div>
        <div class="detail-row"><strong>Budget:</strong> $${data.budget.toLocaleString()}</div>
      </div>
      <div class="detail-section full-width">
        <h4>Status & Timeline</h4>
        <div class="detail-row"><strong>Current Stage:</strong> <span class="badge badge-warning">${data.status}</span></div>
        <div class="detail-row"><strong>Created:</strong> ${data.createdAt}</div>
      </div>
      ${data.notes ? `<div class="detail-section full-width"><h4>Notes</h4><p style="margin: 0; color: var(--gray);">${data.notes}</p></div>` : ''}
    </div>
  `;

  if ($('#leadDetailModal').length === 0) {
    $('body').append(`
      <div id="leadDetailModal" class="modal-overlay">
        <div class="modal" style="max-width: 700px;">
          <div class="modal-header">
            <h3>Lead Details</h3>
            <button class="modal-close" onclick="closeModal('leadDetailModal')">&times;</button>
          </div>
          <div class="modal-body" id="leadDetailContent"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal('leadDetailModal')">Close</button>
            <button class="btn btn-success" onclick="convertLeadAction('${id}')">Convert to Booking</button>
          </div>
        </div>
      </div>
    `);
  }

  $('#leadDetailContent').html(content);
  openModal('leadDetailModal');
}

function convertLeadAction(id) {
  closeModal('leadDetailModal');
  showSuccessToast(`Lead ${id} converted to booking!`);
}

// ============================================
// CUSTOMER DETAIL MODAL
// ============================================
function showCustomerDetail(id) {
  const data = {
    id: id,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    company: 'Smith Enterprises',
    tier: 'Gold',
    totalBookings: 8,
    totalRevenue: 42500,
    lastBooking: '2026-01-15',
    tags: ['VIP', 'Repeat', 'Corporate']
  };

  const content = `
    <div class="detail-grid">
      <div class="detail-section">
        <h4>Customer Information</h4>
        <div class="detail-row"><strong>Customer ID:</strong> ${data.id}</div>
        <div class="detail-row"><strong>Name:</strong> ${data.name}</div>
        <div class="detail-row"><strong>Email:</strong> ${data.email}</div>
        <div class="detail-row"><strong>Phone:</strong> ${data.phone}</div>
        ${data.company ? `<div class="detail-row"><strong>Company:</strong> ${data.company}</div>` : ''}
        ${data.tier ? `<div class="detail-row"><strong>Tier:</strong> <span class="badge badge-warning">${data.tier}</span></div>` : ''}
      </div>
      <div class="detail-section">
        <h4>Statistics</h4>
        <div class="detail-row"><strong>Total Bookings:</strong> ${data.totalBookings}</div>
        <div class="detail-row"><strong>Total Revenue:</strong> $${data.totalRevenue.toLocaleString()}</div>
        <div class="detail-row"><strong>Last Booking:</strong> ${data.lastBooking}</div>
      </div>
      ${data.tags && data.tags.length > 0 ? `
        <div class="detail-section full-width">
          <h4>Tags</h4>
          <div>${data.tags.map(tag => `<span class="badge badge-secondary" style="margin-right: 0.5rem;">${tag}</span>`).join('')}</div>
        </div>
      ` : ''}
    </div>
  `;

  if ($('#customerDetailModal').length === 0) {
    $('body').append(`
      <div id="customerDetailModal" class="modal-overlay">
        <div class="modal" style="max-width: 700px;">
          <div class="modal-header">
            <h3>Customer Profile</h3>
            <button class="modal-close" onclick="closeModal('customerDetailModal')">&times;</button>
          </div>
          <div class="modal-body" id="customerDetailContent"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal('customerDetailModal')">Close</button>
          </div>
        </div>
      </div>
    `);
  }

  $('#customerDetailContent').html(content);
  openModal('customerDetailModal');
}

// ============================================
// INVOICE DETAIL MODAL
// ============================================
function showInvoiceDetail(id) {
  const data = {
    id: id,
    customer: 'John Smith',
    bookingId: 'BK-1001',
    issueDate: '2026-02-01',
    dueDate: '2026-02-15',
    amount: 5000,
    paid: 2500,
    status: 'Partial',
    paymentMethod: 'Credit Card'
  };

  const balance = data.amount - data.paid;
  const content = `
    <div class="detail-grid">
      <div class="detail-section">
        <h4>Invoice Information</h4>
        <div class="detail-row"><strong>Invoice ID:</strong> ${data.id}</div>
        <div class="detail-row"><strong>Customer:</strong> ${data.customer}</div>
        <div class="detail-row"><strong>Booking ID:</strong> ${data.bookingId}</div>
        <div class="detail-row"><strong>Status:</strong> <span class="badge badge-${data.status === 'Paid' ? 'success' : data.status === 'Overdue' ? 'danger' : 'warning'}">${data.status}</span></div>
      </div>
      <div class="detail-section">
        <h4>Payment Details</h4>
        <div class="detail-row"><strong>Issue Date:</strong> ${data.issueDate}</div>
        <div class="detail-row"><strong>Due Date:</strong> ${data.dueDate}</div>
        <div class="detail-row"><strong>Amount:</strong> $${data.amount.toLocaleString()}</div>
        <div class="detail-row"><strong>Paid:</strong> $${data.paid.toLocaleString()}</div>
        <div class="detail-row"><strong>Balance:</strong> <span style="color: var(--danger); font-weight: 700;">$${balance.toLocaleString()}</span></div>
        ${data.paymentMethod ? `<div class="detail-row"><strong>Payment Method:</strong> ${data.paymentMethod}</div>` : ''}
      </div>
    </div>
  `;

  if ($('#invoiceDetailModal').length === 0) {
    $('body').append(`
      <div id="invoiceDetailModal" class="modal-overlay">
        <div class="modal" style="max-width: 700px;">
          <div class="modal-header">
            <h3>Invoice Details</h3>
            <button class="modal-close" onclick="closeModal('invoiceDetailModal')">&times;</button>
          </div>
          <div class="modal-body" id="invoiceDetailContent"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal('invoiceDetailModal')">Close</button>
            <button class="btn btn-success" onclick="showPaymentModal('${id}', ${data.amount}, ${data.paid})"><i class="fas fa-dollar-sign"></i> Record Payment</button>
            <button class="btn btn-primary" onclick="downloadInvoice('${id}')"><i class="fas fa-download"></i> Download PDF</button>
          </div>
        </div>
      </div>
    `);
  }

  $('#invoiceDetailContent').html(content);
  openModal('invoiceDetailModal');
}

// ============================================
// VENUE DETAIL MODAL
// ============================================
function showVenueDetail(id) {
  const data = {
    id: id,
    name: 'Grand Ballroom',
    type: 'Ballroom',
    status: 'active',
    capacity: 500,
    area: 5000,
    price: 5000,
    description: 'Elegant ballroom perfect for weddings and large events',
    amenities: ['AC', 'WiFi', 'Projector', 'Sound System', 'Stage', 'Catering'],
    occupancy: 85,
    bookingsThisMonth: 18
  };

  const content = `
    <div class="detail-grid">
      <div class="detail-section">
        <h4>Venue Information</h4>
        <div class="detail-row"><strong>Venue ID:</strong> ${data.id}</div>
        <div class="detail-row"><strong>Name:</strong> ${data.name}</div>
        <div class="detail-row"><strong>Type:</strong> ${data.type}</div>
        <div class="detail-row"><strong>Status:</strong> <span class="badge badge-${data.status === 'active' ? 'success' : 'secondary'}">${data.status}</span></div>
      </div>
      <div class="detail-section">
        <h4>Capacity & Pricing</h4>
        <div class="detail-row"><strong>Capacity:</strong> ${data.capacity} guests</div>
        <div class="detail-row"><strong>Area:</strong> ${data.area} sq ft</div>
        <div class="detail-row"><strong>Base Price:</strong> $${data.price.toLocaleString()}</div>
      </div>
      ${data.description ? `<div class="detail-section full-width"><h4>Description</h4><p style="margin: 0; color: var(--gray);">${data.description}</p></div>` : ''}
      ${data.amenities && data.amenities.length > 0 ? `
        <div class="detail-section full-width">
          <h4>Amenities</h4>
          <div>${data.amenities.map(amenity => `<span class="badge badge-info" style="margin-right: 0.5rem;">${amenity}</span>`).join('')}</div>
        </div>
      ` : ''}
      ${data.occupancy ? `
        <div class="detail-section full-width">
          <h4>Performance</h4>
          <div class="detail-row"><strong>Occupancy Rate:</strong> ${data.occupancy}%</div>
          <div class="detail-row"><strong>Bookings This Month:</strong> ${data.bookingsThisMonth}</div>
        </div>
      ` : ''}
    </div>
  `;

  if ($('#venueDetailModal').length === 0) {
    $('body').append(`
      <div id="venueDetailModal" class="modal-overlay">
        <div class="modal" style="max-width: 700px;">
          <div class="modal-header">
            <h3>Venue Details</h3>
            <button class="modal-close" onclick="closeModal('venueDetailModal')">&times;</button>
          </div>
          <div class="modal-body" id="venueDetailContent"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal('venueDetailModal')">Close</button>
          </div>
        </div>
      </div>
    `);
  }

  $('#venueDetailContent').html(content);
  openModal('venueDetailModal');
}

// ============================================
// CONFIRMATION MODAL
// ============================================
let confirmedAction = null;

function confirmAction(title, message, callback, buttonText = 'Confirm', buttonClass = 'btn-danger') {
  if ($('#confirmModal').length === 0) {
    $('body').append(`
      <div id="confirmModal" class="modal-overlay">
        <div class="modal" style="max-width: 450px;">
          <div class="modal-header">
            <h3 id="confirmTitle">Confirm Action</h3>
            <button class="modal-close" onclick="closeModal('confirmModal')">&times;</button>
          </div>
          <div class="modal-body">
            <p id="confirmMessage" style="margin: 0;">Are you sure?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal('confirmModal')">Cancel</button>
            <button class="btn btn-danger" id="confirmActionBtn" onclick="executeConfirmedAction()">Confirm</button>
          </div>
        </div>
      </div>
    `);
  }

  $('#confirmTitle').text(title);
  $('#confirmMessage').text(message);
  $('#confirmActionBtn').text(buttonText).attr('class', 'btn ' + buttonClass);
  confirmedAction = callback;
  openModal('confirmModal');
}

function executeConfirmedAction() {
  if (confirmedAction) {
    confirmedAction();
    confirmedAction = null;
  }
  closeModal('confirmModal');
}

// ============================================
// CHECK-IN MODAL
// ============================================
function showCheckinModal(id, customerName, venue, eventDate) {
  if ($('#checkinModal').length === 0) {
    $('body').append(`
      <div id="checkinModal" class="modal-overlay">
        <div class="modal" style="max-width: 500px;">
          <div class="modal-header">
            <h3>Check-in Customer</h3>
            <button class="modal-close" onclick="closeModal('checkinModal')">&times;</button>
          </div>
          <div class="modal-body" id="checkinContent"></div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal('checkinModal')">Cancel</button>
            <button class="btn btn-success" onclick="completeCheckin('${id}')">Complete Check-in</button>
          </div>
        </div>
      </div>
    `);
  }

  const content = `
    <div class="detail-section">
      <div class="detail-row"><strong>Booking ID:</strong> ${id}</div>
      <div class="detail-row"><strong>Customer:</strong> ${customerName}</div>
      <div class="detail-row"><strong>Venue:</strong> ${venue}</div>
      <div class="detail-row"><strong>Event Date:</strong> ${eventDate}</div>
    </div>
    <div style="margin-top: 1rem; padding: 1rem; background: #f0fdf4; border-left: 3px solid #10b981; border-radius: 4px;">
      <p style="margin: 0; color: #065f46; font-weight: 600;">✓ Ready for check-in</p>
    </div>
    <div class="form-group" style="margin-top: 1rem;">
      <label class="form-label">Check-in Notes</label>
      <textarea class="form-control" id="checkinNotes" rows="3" placeholder="Any special requirements or notes..."></textarea>
    </div>
  `;

  $('#checkinContent').html(content);
  $('#checkinNotes').val('');
  openModal('checkinModal');
}

function completeCheckin(id) {
  const notes = $('#checkinNotes').val();
  console.log('Checked in booking:', id, 'Notes:', notes);
  closeModal('checkinModal');
  showSuccessToast(`Customer checked in successfully for booking ${id}!`);
}

// ============================================
// PAYMENT MODAL
// ============================================
function showPaymentModal(invoiceId, invoiceAmount, paidAmount) {
  const balance = invoiceAmount - paidAmount;

  if ($('#paymentModal').length === 0) {
    $('body').append(`
      <div id="paymentModal" class="modal-overlay">
        <div class="modal" style="max-width: 500px;">
          <div class="modal-header">
            <h3>Record Payment</h3>
            <button class="modal-close" onclick="closeModal('paymentModal')">&times;</button>
          </div>
          <div class="modal-body">
            <form id="paymentForm">
              <div id="paymentContent"></div>
              <div class="form-group">
                <label class="form-label">Payment Amount *</label>
                <input type="number" class="form-control" id="paymentAmount" min="0" step="0.01" required>
              </div>
              <div class="form-group">
                <label class="form-label">Payment Method *</label>
                <select class="form-control" id="paymentMethod" required>
                  <option value="">Select Method</option>
                  <option value="cash">Cash</option>
                  <option value="card">Credit Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Transaction Reference</label>
                <input type="text" class="form-control" id="paymentReference" placeholder="Transaction ID, Check #, etc.">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal('paymentModal')">Cancel</button>
            <button class="btn btn-success" onclick="submitPayment('${invoiceId}')">Record Payment</button>
          </div>
        </div>
      </div>
    `);
  }

  const content = `
    <div class="detail-section" style="margin-bottom: 1rem;">
      <div class="detail-row"><strong>Invoice ID:</strong> ${invoiceId}</div>
      <div class="detail-row"><strong>Total Amount:</strong> $${invoiceAmount.toLocaleString()}</div>
      <div class="detail-row"><strong>Paid:</strong> $${paidAmount.toLocaleString()}</div>
      <div class="detail-row"><strong>Balance Due:</strong> <span style="color: var(--danger); font-weight: 700;">$${balance.toLocaleString()}</span></div>
    </div>
  `;

  $('#paymentContent').html(content);
  $('#paymentAmount').val(balance).attr('max', balance);
  openModal('paymentModal');
}

function submitPayment(invoiceId) {
  const form = document.getElementById('paymentForm');
  if (form.checkValidity()) {
    const payment = {
      invoiceId: invoiceId,
      amount: $('#paymentAmount').val(),
      method: $('#paymentMethod').val(),
      reference: $('#paymentReference').val()
    };
    console.log('Payment recorded:', payment);
    closeModal('paymentModal');
    closeModal('invoiceDetailModal');
    showSuccessToast(`Payment of $${payment.amount} recorded successfully!`);
    form.reset();
  } else {
    form.reportValidity();
  }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showSuccessToast(message) {
  showToast(message, 'success');
}

function showErrorToast(message) {
  showToast(message, 'error');
}

function showToast(message, type = 'info') {
  const toastId = 'toast_' + Date.now();
  const iconMap = {
    success: 'fas fa-check-circle',
    error: 'fas fa-times-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  };
  const colorMap = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  const toast = $(`
    <div id="${toastId}" class="toast" style="display: none;">
      <i class="${iconMap[type]}" style="color: ${colorMap[type]};"></i>
      <span>${message}</span>
    </div>
  `);

  if ($('#toastContainer').length === 0) {
    $('body').append('<div id="toastContainer"></div>');
  }

  $('#toastContainer').append(toast);
  toast.fadeIn(300);

  setTimeout(() => {
    toast.fadeOut(300, function() {
      $(this).remove();
    });
  }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function downloadInvoice(id) {
  showSuccessToast(`Downloading invoice ${id} PDF...`);
}

console.log('Extended modals loaded successfully');
