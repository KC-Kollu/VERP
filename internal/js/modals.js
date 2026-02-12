// ============================================
// MODAL MANAGEMENT SYSTEM
// ============================================

// Global modal functions
function openModal(modalId) {
  $(`#${modalId}`).addClass('active');
  $('body').css('overflow', 'hidden');
}

function closeModal(modalId) {
  $(`#${modalId}`).removeClass('active');
  $('body').css('overflow', 'auto');
}

// Close modal on overlay click
$(document).on('click', '.modal-overlay', function(e) {
  if (e.target === this) {
    $(this).removeClass('active');
    $('body').css('overflow', 'auto');
  }
});

// Close modal on ESC key
$(document).on('keydown', function(e) {
  if (e.key === 'Escape') {
    $('.modal-overlay.active').removeClass('active');
    $('body').css('overflow', 'auto');
  }
});

// ============================================
// NEW BOOKING MODAL
// ============================================
function createNewBookingModal() {
  return `
    <div id="newBookingModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>New Booking</h3>
          <button class="modal-close" onclick="closeModal('newBookingModal')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="newBookingForm">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Customer Name *</label>
                <input type="text" class="form-control" name="customerName" required>
              </div>
              <div class="form-group">
                <label class="form-label">Phone *</label>
                <input type="tel" class="form-control" name="phone" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" name="email">
              </div>
              <div class="form-group">
                <label class="form-label">Event Type *</label>
                <select class="form-control" name="eventType" required>
                  <option value="">Select Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Venue *</label>
                <select class="form-control" name="venue" required>
                  <option value="">Select Venue</option>
                  <option value="grand-ballroom">Grand Ballroom</option>
                  <option value="conference-hall">Conference Hall</option>
                  <option value="garden-lawn">Garden Lawn</option>
                  <option value="rooftop-terrace">Rooftop Terrace</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Event Date *</label>
                <input type="date" class="form-control" name="eventDate" required>
              </div>
              <div class="form-group">
                <label class="form-label">Guests</label>
                <input type="number" class="form-control" name="guests" min="1">
              </div>
              <div class="form-group">
                <label class="form-label">Estimated Budget</label>
                <input type="number" class="form-control" name="budget" min="0" step="100">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Special Requirements</label>
              <textarea class="form-control" name="notes" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('newBookingModal')">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewBooking()">Create Booking</button>
        </div>
      </div>
    </div>
  `;
}

function submitNewBooking() {
  const form = document.getElementById('newBookingForm');
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('New Booking:', data);
    alert('Booking created successfully!');
    closeModal('newBookingModal');
    form.reset();
  } else {
    form.reportValidity();
  }
}

// ============================================
// NEW LEAD MODAL
// ============================================
function createNewLeadModal() {
  return `
    <div id="newLeadModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>New Lead</h3>
          <button class="modal-close" onclick="closeModal('newLeadModal')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="newLeadForm">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Lead Name *</label>
                <input type="text" class="form-control" name="name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Phone *</label>
                <input type="tel" class="form-control" name="phone" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" name="email">
              </div>
              <div class="form-group">
                <label class="form-label">Source *</label>
                <select class="form-control" name="source" required>
                  <option value="">Select Source</option>
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="walkin">Walk-in</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Event Type</label>
                <select class="form-control" name="eventType">
                  <option value="">Select Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="birthday">Birthday</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Expected Date</label>
                <input type="date" class="form-control" name="eventDate">
              </div>
              <div class="form-group">
                <label class="form-label">Guests</label>
                <input type="number" class="form-control" name="guests" min="1">
              </div>
              <div class="form-group">
                <label class="form-label">Budget</label>
                <input type="number" class="form-control" name="budget" min="0" step="100">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Notes</label>
              <textarea class="form-control" name="notes" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('newLeadModal')">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewLead()">Create Lead</button>
        </div>
      </div>
    </div>
  `;
}

function submitNewLead() {
  const form = document.getElementById('newLeadForm');
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('New Lead:', data);
    alert('Lead created successfully!');
    closeModal('newLeadModal');
    form.reset();
  } else {
    form.reportValidity();
  }
}

// ============================================
// NEW CUSTOMER MODAL
// ============================================
function createNewCustomerModal() {
  return `
    <div id="newCustomerModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Add Customer</h3>
          <button class="modal-close" onclick="closeModal('newCustomerModal')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="newCustomerForm">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" class="form-control" name="name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input type="email" class="form-control" name="email" required>
              </div>
              <div class="form-group">
                <label class="form-label">Phone *</label>
                <input type="tel" class="form-control" name="phone" required>
              </div>
              <div class="form-group">
                <label class="form-label">Company</label>
                <input type="text" class="form-control" name="company">
              </div>
              <div class="form-group">
                <label class="form-label">Customer Tier</label>
                <select class="form-control" name="tier">
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Tags</label>
                <input type="text" class="form-control" name="tags" placeholder="VIP, Corporate, etc.">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Address</label>
              <textarea class="form-control" name="address" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Notes</label>
              <textarea class="form-control" name="notes" rows="2"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('newCustomerModal')">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewCustomer()">Add Customer</button>
        </div>
      </div>
    </div>
  `;
}

function submitNewCustomer() {
  const form = document.getElementById('newCustomerForm');
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('New Customer:', data);
    alert('Customer added successfully!');
    closeModal('newCustomerModal');
    form.reset();
  } else {
    form.reportValidity();
  }
}

// ============================================
// NEW INVOICE MODAL
// ============================================
function createNewInvoiceModal() {
  return `
    <div id="newInvoiceModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Create Invoice</h3>
          <button class="modal-close" onclick="closeModal('newInvoiceModal')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="newInvoiceForm">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Customer *</label>
                <select class="form-control" name="customer" required>
                  <option value="">Select Customer</option>
                  <option value="C-1001">John Smith</option>
                  <option value="C-1002">Sarah Johnson</option>
                  <option value="C-1003">Michael Chen</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Booking ID</label>
                <input type="text" class="form-control" name="bookingId" placeholder="BK-XXXX">
              </div>
              <div class="form-group">
                <label class="form-label">Issue Date *</label>
                <input type="date" class="form-control" name="issueDate" required>
              </div>
              <div class="form-group">
                <label class="form-label">Due Date *</label>
                <input type="date" class="form-control" name="dueDate" required>
              </div>
              <div class="form-group">
                <label class="form-label">Amount *</label>
                <input type="number" class="form-control" name="amount" min="0" step="0.01" required>
              </div>
              <div class="form-group">
                <label class="form-label">Payment Method</label>
                <select class="form-control" name="paymentMethod">
                  <option value="">Select Method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="card">Credit Card</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('newInvoiceModal')">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewInvoice()">Create Invoice</button>
        </div>
      </div>
    </div>
  `;
}

function submitNewInvoice() {
  const form = document.getElementById('newInvoiceForm');
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('New Invoice:', data);
    alert('Invoice created successfully!');
    closeModal('newInvoiceModal');
    form.reset();
  } else {
    form.reportValidity();
  }
}

// ============================================
// NEW VENUE MODAL
// ============================================
function createNewVenueModal() {
  return `
    <div id="newVenueModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Add Venue</h3>
          <button class="modal-close" onclick="closeModal('newVenueModal')">&times;</button>
        </div>
        <div class="modal-body">
          <form id="newVenueForm">
            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Venue Name *</label>
                <input type="text" class="form-control" name="name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Venue Type *</label>
                <select class="form-control" name="type" required>
                  <option value="">Select Type</option>
                  <option value="ballroom">Ballroom</option>
                  <option value="conference">Conference Hall</option>
                  <option value="garden">Garden/Lawn</option>
                  <option value="rooftop">Rooftop</option>
                  <option value="lounge">Lounge</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Capacity *</label>
                <input type="number" class="form-control" name="capacity" min="1" required>
              </div>
              <div class="form-group">
                <label class="form-label">Area (sq ft)</label>
                <input type="number" class="form-control" name="area" min="1">
              </div>
              <div class="form-group">
                <label class="form-label">Base Price *</label>
                <input type="number" class="form-control" name="price" min="0" step="100" required>
              </div>
              <div class="form-group">
                <label class="form-label">Status</label>
                <select class="form-control" name="status">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="description" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Amenities (comma separated)</label>
              <input type="text" class="form-control" name="amenities" placeholder="AC, WiFi, Projector, etc.">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('newVenueModal')">Cancel</button>
          <button class="btn btn-primary" onclick="submitNewVenue()">Add Venue</button>
        </div>
      </div>
    </div>
  `;
}

function submitNewVenue() {
  const form = document.getElementById('newVenueForm');
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('New Venue:', data);
    alert('Venue added successfully!');
    closeModal('newVenueModal');
    form.reset();
  } else {
    form.reportValidity();
  }
}

// ============================================
// INITIALIZE ALL MODALS
// ============================================
function initializeModals() {
  const modalsHTML = `
    ${createNewBookingModal()}
    ${createNewLeadModal()}
    ${createNewCustomerModal()}
    ${createNewInvoiceModal()}
    ${createNewVenueModal()}
  `;

  $('body').append(modalsHTML);
}

// Auto-initialize when document is ready
$(document).ready(function() {
  initializeModals();
});
