$(document).ready(function() {

  // ========== AUTH CHECK (OPTIONAL) ==========
  function checkAuth() {
    const authData = localStorage.getItem('authData');

    if (!authData) {
      // No auth data, use default guest user
      return {
        isAuthenticated: false,
        user: {
          id: Date.now(),
          name: 'Guest User',
          email: 'guest@example.com',
          role: 'customer'
        }
      };
    }

    try {
      return JSON.parse(authData);
    } catch (e) {
      console.error('Invalid auth data:', e);
      localStorage.removeItem('authData');
      // Return default user
      return {
        isAuthenticated: false,
        user: {
          id: Date.now(),
          name: 'Guest User',
          email: 'guest@example.com',
          role: 'customer'
        }
      };
    }
  }

  // Check authentication on page load
  const auth = checkAuth();

  // ========== DISPLAY USER INFO ==========
  const user = auth.user;

  // Update user name in header
  if (user.name) {
    $('#userName').text(user.name);
    $('#welcomeName').text(user.name);

    // Update avatar with first letter
    const initial = user.name.charAt(0).toUpperCase();
    $('#userAvatar').text(initial);
  }

  // ========== LOGOUT ==========
  $('#logoutBtn').on('click', function(e) {
    e.preventDefault();

    // Clear auth data (if any)
    localStorage.removeItem('authData');

    // Redirect to guest home
    window.location.href = '../index.html';
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

  // Show toggle button on mobile
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

  // Close sidebar when clicking outside on mobile
  $(document).on('click', function(e) {
    if ($(window).width() <= 768) {
      if (!$(e.target).closest('.sidebar, .sidebar-toggle').length) {
        $('.sidebar').removeClass('active');
      }
    }
  });

  // ========== SEARCH FUNCTIONALITY ==========
  $('.header-search input').on('input', function() {
    const searchTerm = $(this).val().toLowerCase();
    console.log('Searching for:', searchTerm);
    // Implement search logic here
  });

  // ========== NOTIFICATIONS ==========
  $('.header-icon').on('click', function() {
    console.log('Notification clicked');
    // Implement notification dropdown here
  });

  // ========== USER MENU DROPDOWN ==========
  $('.user-menu').on('click', function() {
    console.log('User menu clicked');
    // Implement user menu dropdown here
  });

  // ========== CONSOLE MESSAGE ==========
  console.log('%c👤 Customer Panel Loaded', 'color: #6366f1; font-size: 16px; font-weight: bold;');
  console.log('User:', user);

});
