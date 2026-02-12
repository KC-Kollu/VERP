// ==========================================================================
// VENUE ERP - MAIN JAVASCRIPT
// ==========================================================================

$(document).ready(function() {

  // ========== MOBILE NAVIGATION TOGGLE ==========
  $('.nav-toggle').on('click', function() {
    $('.nav-menu').toggleClass('active');
    $(this).toggleClass('active');
  });

  // Close mobile menu when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.navbar').length) {
      $('.nav-menu').removeClass('active');
      $('.nav-toggle').removeClass('active');
    }
  });

  // Close mobile menu when clicking a link
  $('.nav-link').on('click', function() {
    $('.nav-menu').removeClass('active');
    $('.nav-toggle').removeClass('active');
  });

  // ========== STICKY NAVBAR ON SCROLL ==========
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 100) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  // ========== ACTIVE NAVIGATION LINK ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  $('.nav-link').each(function() {
    const href = $(this).attr('href');
    if (href && href.includes(currentPage)) {
      $(this).addClass('active');
    }
  });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 800);
    }
  });

  // ========== FORM VALIDATION ==========
  $('form').on('submit', function(e) {
    let isValid = true;
    const form = $(this);

    // Clear previous errors
    form.find('.form-error').remove();
    form.find('.form-control').removeClass('error');

    // Validate required fields
    form.find('[required]').each(function() {
      const field = $(this);
      const value = field.val().trim();

      if (!value) {
        isValid = false;
        field.addClass('error');
        field.after('<div class="form-error">This field is required</div>');
      }
    });

    // Validate email
    form.find('input[type="email"]').each(function() {
      const field = $(this);
      const value = field.val().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (value && !emailRegex.test(value)) {
        isValid = false;
        field.addClass('error');
        field.after('<div class="form-error">Please enter a valid email address</div>');
      }
    });

    // Validate phone
    form.find('input[type="tel"]').each(function() {
      const field = $(this);
      const value = field.val().trim();
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;

      if (value && !phoneRegex.test(value)) {
        isValid = false;
        field.addClass('error');
        field.after('<div class="form-error">Please enter a valid phone number</div>');
      }
    });

    // Validate date (must be future date)
    form.find('input[type="date"]').each(function() {
      const field = $(this);
      const value = field.val();

      if (value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          isValid = false;
          field.addClass('error');
          field.after('<div class="form-error">Please select a future date</div>');
        }
      }
    });

    if (!isValid) {
      e.preventDefault();
      // Scroll to first error
      const firstError = form.find('.error').first();
      if (firstError.length) {
        $('html, body').animate({
          scrollTop: firstError.offset().top - 100
        }, 500);
      }
    }
  });

  // Remove error styling on input
  $('.form-control').on('input change', function() {
    $(this).removeClass('error');
    $(this).next('.form-error').remove();
  });

  // ========== SET MINIMUM DATE FOR DATE INPUTS ==========
  const today = new Date().toISOString().split('T')[0];
  $('input[type="date"]').attr('min', today);

  // ========== AVAILABILITY FORM SUBMISSION ==========
  $('#availabilityForm').on('submit', function(e) {
    e.preventDefault();

    // Simulate availability check
    const isAvailable = Math.random() > 0.3; // 70% chance available

    $('#availabilityResult').fadeIn();

    if (isAvailable) {
      $('#resultAvailable').show();
      $('#resultNotAvailable').hide();
    } else {
      $('#resultAvailable').hide();
      $('#resultNotAvailable').show();
    }

    // Scroll to result
    $('html, body').animate({
      scrollTop: $('#availabilityResult').offset().top - 100
    }, 500);
  });

  // ========== ENQUIRY FORM SUBMISSION ==========
  $('#enquiryForm').on('submit', function(e) {
    e.preventDefault();

    // Generate reference number
    const refNumber = 'ENQ' + Date.now();
    $('#referenceNumber').text(refNumber);

    // Show success message
    $('#enquiryForm').fadeOut(300, function() {
      $('#enquirySuccess').fadeIn();
    });

    // Scroll to success message
    setTimeout(function() {
      $('html, body').animate({
        scrollTop: $('#enquirySuccess').offset().top - 100
      }, 500);
    }, 300);
  });

  // ========== VENUE FILTERS ==========
  $('#venueFilters select').on('change', function() {
    // In a real application, this would filter the venues
    console.log('Filter changed:', $(this).attr('id'), '=', $(this).val());

    // You can implement client-side filtering here
    // or make an AJAX request to filter server-side
  });

  // ========== FADE IN ANIMATIONS ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  $('.card, .feature-card, .stat-item').each(function() {
    observer.observe(this);
  });

  // ========== CURRENCY FORMATTING ==========
  $('.price').each(function() {
    const price = $(this).text();
    if (price && !isNaN(price)) {
      $(this).text('₹' + parseInt(price).toLocaleString('en-IN'));
    }
  });

  // ========== SCROLL TO TOP BUTTON ==========
  const scrollTopBtn = $('<button class="scroll-top" title="Back to top"><i class="fas fa-arrow-up"></i></button>');
  $('body').append(scrollTopBtn);

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 500) {
      scrollTopBtn.addClass('show');
    } else {
      scrollTopBtn.removeClass('show');
    }
  });

  scrollTopBtn.on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
  });

  // Add scroll-top button styles
  $('<style>')
    .text(`
      .scroll-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        box-shadow: var(--shadow-lg);
        z-index: 999;
      }
      .scroll-top.show {
        opacity: 1;
        visibility: visible;
      }
      .scroll-top:hover {
        background: var(--primary-dark);
        transform: translateY(-3px);
      }
    `)
    .appendTo('head');

  // ========== AUTH MODALS ==========

  // Login Form Handler
  $('#loginForm').on('submit', function(e) {
    e.preventDefault();

    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
    const remember = $(this).find('input[name="remember"]').is(':checked');

    // Simulate authentication
    console.log('Login attempt:', { email, password, remember });

    // Store auth data
    const authData = {
      isAuthenticated: true,
      user: {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        role: 'customer',
        loginTime: new Date().toISOString()
      }
    };

    localStorage.setItem('authData', JSON.stringify(authData));

    // Show success and redirect
    alert('Login successful! Redirecting to customer panel...');
    closeModal('loginModal');

    // Redirect to customer panel
    setTimeout(() => {
      window.location.href = 'customer/dashboard.html';
    }, 500);
  });

  // Register Form Handler
  $('#registerForm').on('submit', function(e) {
    e.preventDefault();

    const name = $('#registerName').val();
    const email = $('#registerEmail').val();
    const phone = $('#registerPhone').val();
    const password = $('#registerPassword').val();
    const confirmPassword = $('#registerConfirmPassword').val();

    // Validate password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    // Simulate registration
    console.log('Registration attempt:', { name, email, phone });

    // Store auth data
    const authData = {
      isAuthenticated: true,
      user: {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        role: 'customer',
        registeredAt: new Date().toISOString()
      }
    };

    localStorage.setItem('authData', JSON.stringify(authData));

    // Show success and redirect
    alert('Registration successful! Welcome to Venue ERP.');
    closeModal('registerModal');

    // Redirect to customer panel
    setTimeout(() => {
      window.location.href = 'customer/dashboard.html';
    }, 500);
  });

  // Forgot Password Form Handler
  $('#forgotForm').on('submit', function(e) {
    e.preventDefault();

    const email = $('#forgotEmail').val();

    console.log('Password reset requested for:', email);

    alert(`Password reset link sent to ${email}. Please check your inbox.`);
    closeModal('forgotModal');

    // Clear form
    $(this)[0].reset();
  });

  // ========== CONSOLE MESSAGE ==========
  console.log('%c🏢 Venue ERP Guest Website Loaded Successfully', 'color: #6366f1; font-size: 16px; font-weight: bold;');

});

// ========== AUTH MODAL FUNCTIONS (Global) ==========

function openModal(modalId) {
  $('#' + modalId).addClass('active');
  $('body').css('overflow', 'hidden');
}

function closeModal(modalId) {
  $('#' + modalId).removeClass('active');
  $('body').css('overflow', 'auto');
}

function switchModal(currentModalId, targetModalId) {
  closeModal(currentModalId);
  setTimeout(() => {
    openModal(targetModalId);
  }, 300);
}

// Close modal on overlay click
$(document).on('click', '.modal-overlay', function(e) {
  if ($(e.target).hasClass('modal-overlay')) {
    closeModal($(this).attr('id'));
  }
});

// Close modal on Escape key
$(document).on('keydown', function(e) {
  if (e.key === 'Escape') {
    $('.modal-overlay.active').each(function() {
      closeModal($(this).attr('id'));
    });
  }
});
