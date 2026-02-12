$(document).ready(function() {

  // ========== AUTH CHECK ==========
  function checkAuth() {
    const authData = localStorage.getItem('internalAuth');

    if (!authData) {
      // No auth, use default user
      return {
        isAuthenticated: false,
        user: {
          id: Date.now(),
          name: 'Guest User',
          email: 'guest@venueerp.com',
          role: 'sales'
        }
      };
    }

    try {
      return JSON.parse(authData);
    } catch (e) {
      console.error('Invalid auth data:', e);
      return {
        isAuthenticated: false,
        user: {
          id: Date.now(),
          name: 'Guest User',
          email: 'guest@venueerp.com',
          role: 'sales'
        }
      };
    }
  }

  // Check authentication
  const auth = checkAuth();
  const user = auth.user;

  // Update user info in header (will be called again after components load)
  if (user.name) {
    $('#userName').text(user.name);
    const initial = user.name.charAt(0).toUpperCase();
    $('#userAvatar').text(initial);
  }

  // ========== REMOVED EARLY FILTER SIDEBAR ==========
  // filterSidebar() now called in initializePage() AFTER components load
  // This was causing the bug where all roles could see all pages

  // ========== LOGOUT ==========
  function logout(e) {
    if (e) e.preventDefault();

    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('internalAuth');
      window.location.href = 'index.html';
    }
  }

  $('#logoutBtn').on('click', logout);

  // ========== INITIALIZE PAGE FUNCTION ==========
  // This function should be called by each page after DOM ready
  window.initializePage = async function(pageTitle) {
    // Load all components first
    await ComponentLoader.loadMultiple([
      { name: 'sidebar', target: 'sidebarContainer' },
      { name: 'header', target: 'headerContainer' }
    ]);

    // THEN filter sidebar (after HTML is loaded) - CRITICAL FIX
    if (typeof RoleManager !== 'undefined') {
      RoleManager.filterSidebar();
    }

    // Set user info and page title (update after components load)
    const displayName = RoleManager.getDisplayName();
    $('#userName').text(user.name || displayName);
    $('#userRole').text(displayName);
    document.title = pageTitle + ' - Venue ERP';

    // Set up logout handler
    $('#logoutBtn').off('click').on('click', logout);
  };

  // ========== CONTINUE WITH MOBILE SIDEBAR (old code) ==========
  $('#logoutBtn').on('click', function(e) {
    e.preventDefault();

    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('internalAuth');
      window.location.href = 'index.html';
    }
  });

  // ========== MOBILE SIDEBAR TOGGLE ==========
  const sidebarToggle = $('<button>')
    .addClass('sidebar-toggle')
    .html('<i class="fas fa-bars"></i>')
    .css({
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      width: '40px',
      height: '40px',
      background: 'var(--primary)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    });

  $('body').append(sidebarToggle);

  sidebarToggle.on('click', function() {
    $('.sidebar').toggleClass('active');
  });

  // Show toggle on mobile
  function handleResize() {
    if ($(window).width() <= 768) {
      sidebarToggle.css('display', 'flex');
    } else {
      sidebarToggle.css('display', 'none');
      $('.sidebar').removeClass('active');
    }
  }

  handleResize();
  $(window).on('resize', handleResize);

  // Close sidebar on click outside (mobile)
  $(document).on('click', function(e) {
    if ($(window).width() <= 768) {
      if (!$(e.target).closest('.sidebar, .sidebar-toggle').length) {
        $('.sidebar').removeClass('active');
      }
    }
  });

  // ========== CALENDAR WIDGET ==========
  function renderCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    $('#currentMonth').text(`${monthNames[currentMonth]} ${currentYear}`);

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prevLastDay = new Date(currentYear, currentMonth, 0);

    const firstDayIndex = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();

    let daysHTML = '';

    // Previous month days
    for (let x = firstDayIndex; x > 0; x--) {
      daysHTML += `<div class="calendar-day other-month">${prevLastDayDate - x + 1}</div>`;
    }

    // Current month days
    for (let i = 1; i <= lastDayDate; i++) {
      const isToday = i === today.getDate() && currentMonth === today.getMonth();
      const hasEvent = [5, 12, 18, 25].includes(i); // Sample event days

      daysHTML += `<div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">${i}</div>`;
    }

    $('#calendarDays').html(daysHTML);
  }

  // Initialize calendar if element exists
  if ($('#calendarDays').length) {
    renderCalendar();
  }

  // ========== CONSOLE MESSAGE ==========
  console.log('%c🏢 Internal Sales Dashboard Loaded', 'color: #6366f1; font-size: 16px; font-weight: bold;');
  console.log('User:', user);

});

// ========== GLOBAL MODAL FUNCTIONS ==========

function openModal(modalId) {
  $('#' + modalId).addClass('active');
  $('body').css('overflow', 'hidden');
}

function closeModal(modalId) {
  $('#' + modalId).removeClass('active');
  $('body').css('overflow', 'auto');
}

// Close modal on overlay click
$(document).on('click', '.modal-overlay', function(e) {
  if ($(e.target).hasClass('modal-overlay')) {
    const modalId = $(this).attr('id');
    closeModal(modalId);
  }
});

// Close modal on ESC key
$(document).on('keydown', function(e) {
  if (e.key === 'Escape') {
    $('.modal-overlay.active').each(function() {
      closeModal($(this).attr('id'));
    });
  }
});
