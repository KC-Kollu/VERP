/* ============================================
   COMPONENT LOADER & UTILITIES
   ============================================ */

// Component Loader
class ComponentLoader {
  static async load(componentName, targetId, data = {}) {
    try {
      const response = await fetch(`components/${componentName}.html`);
      const html = await response.text();

      // Simple template replacement
      let processedHtml = html;
      Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        processedHtml = processedHtml.replace(regex, data[key]);
      });

      $(`#${targetId}`).html(processedHtml);
      return true;
    } catch (error) {
      console.error(`Failed to load component: ${componentName}`, error);
      return false;
    }
  }

  static async loadMultiple(components) {
    const promises = components.map(comp =>
      this.load(comp.name, comp.target, comp.data || {})
    );
    return await Promise.all(promises);
  }
}

// Widget Builder
class WidgetBuilder {
  static createStatWidget(config) {
    const {label, value, change, icon, iconClass, changeClass} = config;

    return `
      <div class="stat-widget">
        <div class="stat-icon ${iconClass || 'primary'}">
          <i class="${icon || 'fas fa-chart-line'}"></i>
        </div>
        <div class="stat-content">
          <div class="stat-label">${label}</div>
          <div class="stat-value">${value}</div>
          <div class="stat-change ${changeClass || 'positive'}">
            <i class="fas fa-arrow-${changeClass === 'negative' ? 'down' : 'up'}"></i> ${change}
          </div>
        </div>
      </div>
    `;
  }

  static renderWidgets(widgets, containerId) {
    const html = widgets.map(w => this.createStatWidget(w)).join('');
    $(`#${containerId}`).html(html);
  }
}

// Calendar Manager
class CalendarManager {
  constructor(containerId) {
    this.containerId = containerId;
    this.currentDate = new Date();
    this.events = [];
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const today = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    $('#currentMonth').text(`${monthNames[month]} ${year}`);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

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
      const isToday = i === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear();
      const hasEvent = this.hasEventOnDate(year, month, i);

      daysHTML += `<div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}"
                    onclick="calendar.selectDate(${year}, ${month}, ${i})">${i}</div>`;
    }

    $('#calendarDays').html(daysHTML);
  }

  hasEventOnDate(year, month, day) {
    return this.events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year &&
             eventDate.getMonth() === month &&
             eventDate.getDate() === day;
    });
  }

  selectDate(year, month, day) {
    console.log('Selected date:', `${year}-${month + 1}-${day}`);
    // Trigger date selection event
  }

  addEvent(date, title, type) {
    this.events.push({ date, title, type });
    this.renderCalendar();
  }

  changeMonth(direction) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.renderCalendar();
  }
}

// Global calendar instance
let calendar;

function changeMonth(direction) {
  if (calendar) {
    calendar.changeMonth(direction);
  }
}

// Advanced DataTable Builder with Search, Sort, and Pagination
class TableBuilder {
  static tables = {};

  static create(config) {
    const {columns, data, actions, searchable = true, sortable = true, pageSize = 10} = config;
    const tableId = 'table_' + Math.random().toString(36).substr(2, 9);

    this.tables[tableId] = {
      columns,
      allData: data,
      filteredData: data,
      actions,
      currentPage: 1,
      pageSize,
      sortColumn: null,
      sortDirection: 'asc',
      searchTerm: ''
    };

    let html = '<div class="datatable-wrapper">';

    // Search and controls
    if (searchable) {
      html += `
        <div class="datatable-controls">
          <div class="datatable-search">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search..." id="${tableId}_search" class="form-control">
          </div>
          <div class="datatable-info">
            <select id="${tableId}_pagesize" class="form-control" style="width: auto;">
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </div>
        </div>
      `;
    }

    html += `<div id="${tableId}_content" class="datatable-content"></div>`;
    html += `<div id="${tableId}_pagination" class="datatable-pagination"></div>`;
    html += '</div>';

    setTimeout(() => {
      this.attachEvents(tableId);
      this.renderTable(tableId);
    }, 100);

    return html;
  }

  static renderTable(tableId) {
    const table = this.tables[tableId];
    if (!table) return;

    const {columns, filteredData, actions, currentPage, pageSize, sortColumn, sortDirection} = table;

    // Pagination
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredData.slice(start, end);
    const totalPages = Math.ceil(filteredData.length / pageSize);

    let html = '<table class="table"><thead><tr>';

    // Headers with sorting
    columns.forEach(col => {
      const sortIcon = sortColumn === col.field
        ? (sortDirection === 'asc' ? '<i class="fas fa-sort-up"></i>' : '<i class="fas fa-sort-down"></i>')
        : '<i class="fas fa-sort"></i>';
      html += `<th class="sortable" data-table="${tableId}" data-field="${col.field}">${col.label} ${sortIcon}</th>`;
    });
    if (actions) html += '<th style="width: 150px;">Actions</th>';
    html += '</tr></thead><tbody>';

    // Rows
    if (pageData.length === 0) {
      html += `<tr><td colspan="${columns.length + (actions ? 1 : 0)}" style="text-align: center; color: var(--gray); padding: 2rem;">No data found</td></tr>`;
    } else {
      pageData.forEach(row => {
        html += '<tr>';
        columns.forEach(col => {
          const value = row[col.field];
          const formatted = col.format ? col.format(value, row) : value;
          html += `<td>${formatted}</td>`;
        });

        if (actions) {
          html += '<td class="table-actions">';
          actions.forEach(action => {
            html += `<button class="btn btn-sm ${action.class}" onclick="${action.onClick}('${row.id}')" title="${action.label}">
              <i class="${action.icon}"></i>
            </button> `;
          });
          html += '</td>';
        }

        html += '</tr>';
      });
    }

    html += '</tbody></table>';
    $(`#${tableId}_content`).html(html);

    // Pagination
    this.renderPagination(tableId, currentPage, totalPages, filteredData.length);
  }

  static renderPagination(tableId, currentPage, totalPages, totalRecords) {
    const table = this.tables[tableId];
    const start = (currentPage - 1) * table.pageSize + 1;
    const end = Math.min(currentPage * table.pageSize, totalRecords);

    let html = '<div class="pagination-info">';
    html += `<span>Showing ${start} to ${end} of ${totalRecords} entries</span>`;
    html += '</div><div class="pagination-buttons">';

    if (totalPages > 1) {
      // Previous button
      html += `<button class="btn btn-sm btn-secondary" onclick="TableBuilder.goToPage('${tableId}', ${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;

      // Page numbers
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        html += `<button class="btn btn-sm btn-secondary" onclick="TableBuilder.goToPage('${tableId}', 1)">1</button>`;
        if (startPage > 2) html += '<span style="padding: 0 0.5rem;">...</span>';
      }

      for (let i = startPage; i <= endPage; i++) {
        html += `<button class="btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-secondary'}" onclick="TableBuilder.goToPage('${tableId}', ${i})">${i}</button>`;
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += '<span style="padding: 0 0.5rem;">...</span>';
        html += `<button class="btn btn-sm btn-secondary" onclick="TableBuilder.goToPage('${tableId}', ${totalPages})">${totalPages}</button>`;
      }

      // Next button
      html += `<button class="btn btn-sm btn-secondary" onclick="TableBuilder.goToPage('${tableId}', ${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
    }

    html += '</div>';
    $(`#${tableId}_pagination`).html(html);
  }

  static attachEvents(tableId) {
    // Search
    $(`#${tableId}_search`).on('input', function() {
      TableBuilder.search(tableId, $(this).val());
    });

    // Page size
    $(`#${tableId}_pagesize`).on('change', function() {
      TableBuilder.changePageSize(tableId, parseInt($(this).val()));
    });

    // Sorting (delegated event)
    $(document).on('click', `th.sortable[data-table="${tableId}"]`, function() {
      const field = $(this).data('field');
      TableBuilder.sort(tableId, field);
    });
  }

  static search(tableId, term) {
    const table = this.tables[tableId];
    table.searchTerm = term.toLowerCase();
    table.filteredData = table.allData.filter(row => {
      return table.columns.some(col => {
        const value = String(row[col.field] || '').toLowerCase();
        return value.includes(table.searchTerm);
      });
    });
    table.currentPage = 1;
    this.renderTable(tableId);
  }

  static sort(tableId, field) {
    const table = this.tables[tableId];

    if (table.sortColumn === field) {
      table.sortDirection = table.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      table.sortColumn = field;
      table.sortDirection = 'asc';
    }

    table.filteredData.sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];

      // Handle numbers
      if (!isNaN(aVal) && !isNaN(bVal)) {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      // Handle dates
      if (aVal instanceof Date) {
        aVal = aVal.getTime();
        bVal = bVal.getTime();
      }

      if (aVal < bVal) return table.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return table.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.renderTable(tableId);
  }

  static goToPage(tableId, page) {
    const table = this.tables[tableId];
    const totalPages = Math.ceil(table.filteredData.length / table.pageSize);

    if (page >= 1 && page <= totalPages) {
      table.currentPage = page;
      this.renderTable(tableId);
    }
  }

  static changePageSize(tableId, size) {
    const table = this.tables[tableId];
    table.pageSize = size;
    table.currentPage = 1;
    this.renderTable(tableId);
  }

  static render(config, containerId) {
    $(`#${containerId}`).html(this.create(config));
  }
}

// Modal Manager
class ModalManager {
  static open(modalId) {
    $(`#${modalId}`).addClass('active');
    $('body').css('overflow', 'hidden');
  }

  static close(modalId) {
    $(`#${modalId}`).removeClass('active');
    $('body').css('overflow', 'auto');
  }

  static create(config) {
    const {id, title, body, footer, size = 'medium'} = config;

    return `
      <div id="${id}" class="modal-overlay">
        <div class="modal" style="max-width: ${size === 'large' ? '800px' : size === 'small' ? '400px' : '600px'};">
          <div class="modal-header">
            <h2>${title}</h2>
            <button class="modal-close" onclick="ModalManager.close('${id}')">&times;</button>
          </div>
          <div class="modal-body">
            ${body}
          </div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>
    `;
  }
}

// Page Manager
class PageManager {
  static setTitle(title) {
    $('#pageTitle').text(title);
    document.title = `${title} - Venue ERP Internal`;
  }

  static setQuickActions(actions) {
    const html = actions.map(action =>
      `<button class="btn btn-sm ${action.class || 'btn-primary'}" onclick="${action.onClick}">
        <i class="${action.icon}"></i> ${action.label}
      </button>`
    ).join('');

    $('#quickActions').html(html);
  }

  static setActiveNav(page) {
    $('.nav-link').removeClass('active');
    $(`.nav-link[data-page="${page}"]`).addClass('active');
  }
}

// Data Formatter Utilities
class Formatters {
  static currency(value) {
    return `$${parseFloat(value).toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  }

  static date(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  static badge(status) {
    const statusMap = {
      'confirmed': 'badge-success',
      'pending': 'badge-warning',
      'cancelled': 'badge-danger',
      'completed': 'badge-info'
    };

    const badgeClass = statusMap[status.toLowerCase()] || 'badge-secondary';
    return `<span class="badge ${badgeClass}">${status}</span>`;
  }

  static phone(number) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
}

// Role Manager
class RoleManager {
  static getCurrentRole() {
    const auth = localStorage.getItem('internalAuth');
    if (auth) {
      try {
        return JSON.parse(auth).user.role || 'frontdesk';
      } catch (e) {
        return 'frontdesk';
      }
    }
    return 'frontdesk';
  }

  static getConfig() {
    const role = this.getCurrentRole();
    return window.RoleConfig[role] || window.RoleConfig.frontdesk;
  }

  static hasPermission(permission) {
    return this.getConfig().permissions[permission] || false;
  }

  static isPageVisible(page) {
    return this.getConfig().visiblePages.includes(page);
  }

  static filterSidebar() {
    const config = this.getConfig();
    const currentRole = this.getCurrentRole();

    // Filter individual nav items by page (use visiblePages whitelist)
    $('.nav-link').each(function() {
      const page = $(this).data('page');
      if (page) {
        // Use visiblePages whitelist instead of hiddenPages
        if (config.visiblePages.includes(page)) {
          $(this).closest('.nav-item').show();
        } else {
          $(this).closest('.nav-item').hide();
        }
      }
    });

    // Filter sections by data-roles attribute
    $('.nav-section').each(function() {
      const allowedRoles = $(this).data('roles');

      // If section has role restrictions
      if (allowedRoles) {
        // FIX: Add trim() to handle whitespace in data-roles
        const rolesArray = allowedRoles.toString().split(',').map(r => r.trim());
        if (rolesArray.includes(currentRole)) {
          $(this).show();
        } else {
          $(this).hide();
          return; // Skip checking visible items
        }
      }

      // Hide entire sections if all items are hidden
      const visibleItems = $(this).find('.nav-item:visible').length;
      if (visibleItems === 0) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  }

  static getTableActions() {
    const config = this.getConfig();
    return config.tableActions || ['view'];
  }

  static getDashboardWidgets() {
    const config = this.getConfig();
    const widgets = config.dashboardWidgets || [];

    return widgets.map(w => ({
      label: w.label,
      value: window.WidgetData[w.field]?.value || '0',
      change: window.WidgetData[w.field]?.change || '',
      icon: `fas fa-${w.icon}`,
      iconClass: w.iconClass || 'primary',
      changeClass: w.changeClass || 'positive'
    }));
  }

  static getQuickActions() {
    const config = this.getConfig();
    return config.quickActions || [];
  }

  static getDisplayName() {
    return this.getConfig().displayName || 'User';
  }

  // Granular permission methods for VCEDA$X system
  static canPerformAction(action, context = {}) {
    const config = this.getConfig();
    const perm = config.permissions;

    // Handle special scoped permissions
    if (perm[action] === 'assigned' && !context.isAssigned) return false;
    if (perm[action] === 'own' && !context.isOwn) return false;
    if (perm[action] === 'request') return 'request'; // Returns special mode

    return perm[action] === true;
  }

  static getActionLabel(baseAction) {
    const config = this.getConfig();
    const perm = config.permissions['can' + baseAction.charAt(0).toUpperCase() + baseAction.slice(1)];

    if (perm === 'request') return 'Request ' + baseAction;
    if (perm === 'assigned') return baseAction + ' (Assigned Only)';
    if (perm === 'own') return baseAction + ' (Own Only)';

    return baseAction;
  }

  static requiresApproval(action) {
    const approvalActions = ['refund', 'cancel', 'discount', 'payout'];
    const role = this.getCurrentRole();

    // Sales/Front Desk needs approval for financial actions
    if (role === 'sl' && approvalActions.includes(action)) return true;

    // Operations needs approval for refunds and cancellations
    if (role === 'op' && ['refund', 'cancel'].includes(action)) return true;

    return false;
  }

  static canView(context = {}) {
    const perm = this.getConfig().permissions.canView;
    if (perm === true) return true;
    if (perm === 'assigned') return context.isAssigned === true;
    if (perm === 'own') return context.isOwn === true;
    return false;
  }

  static canCreate(context = {}) {
    const perm = this.getConfig().permissions.canCreate;
    if (perm === true) return true;
    if (perm === 'request') return 'request'; // Special mode
    return false;
  }

  static canEdit(context = {}) {
    const perm = this.getConfig().permissions.canEdit;
    if (perm === true) return true;
    if (perm === 'assigned') return context.isAssigned === true;
    if (perm === 'own') return context.isOwn === true;
    return false;
  }

  static canDelete(context = {}) {
    const perm = this.getConfig().permissions.canDelete;
    if (perm === true) return true;
    if (perm === 'own') return context.isOwn === true;
    return false;
  }

  static canApprove() {
    return this.getConfig().permissions.canApprove === true;
  }

  static canExport() {
    return this.getConfig().permissions.canExport === true;
  }

  static canFinance() {
    return this.getConfig().permissions.canFinance === true;
  }

  // Role-specific capabilities
  static canManageUsers() {
    return this.getConfig().permissions.canManageUsers === true;
  }

  static canViewAudit() {
    return this.getConfig().permissions.canViewAudit === true;
  }

  static canManageVenues() {
    return this.getConfig().permissions.canManageVenues === true;
  }

  static canAccessCRM() {
    return this.getConfig().permissions.canAccessCRM === true;
  }

  static canViewInvoices() {
    return this.getConfig().permissions.canViewInvoices === true;
  }

  static canViewReports() {
    return this.getConfig().permissions.canViewReports === true;
  }

  static canManageEvents() {
    return this.getConfig().permissions.canManageEvents === true;
  }

  static canAllocateResources() {
    return this.getConfig().permissions.canAllocateResources === true;
  }

  static canCreateIncidents() {
    return this.getConfig().permissions.canCreateIncidents === true;
  }

  // Page-level access control methods (CRITICAL SECURITY)
  static getCurrentPageName() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    return page || 'dashboard';
  }

  static requirePageAccess() {
    const currentPage = this.getCurrentPageName();
    const config = this.getConfig();

    // Check if page is in visiblePages
    if (!config.visiblePages.includes(currentPage)) {
      console.warn(`Access denied to ${currentPage} for role ${this.getCurrentRole()}`);
      window.location.href = 'dashboard.html';
      return false;
    }

    return true;
  }

  // Get button HTML based on permission
  static getActionButton(action, itemId, context = {}) {
    const role = this.getCurrentRole();
    const requiresApproval = this.requiresApproval(action);

    if (action === 'edit' && this.canEdit(context)) {
      return `<button class="btn btn-sm btn-primary" onclick="edit${capitalize(action)}(${itemId})">
        <i class="fas fa-edit"></i> Edit
      </button>`;
    }

    if (action === 'delete' && this.canDelete(context)) {
      return `<button class="btn btn-sm btn-danger" onclick="delete${capitalize(action)}(${itemId})">
        <i class="fas fa-trash"></i> Delete
      </button>`;
    }

    if (action === 'refund') {
      if (requiresApproval) {
        return `<button class="btn btn-sm btn-warning" onclick="requestRefund(${itemId})">
          <i class="fas fa-clock"></i> Request Refund
        </button>`;
      } else if (this.canFinance()) {
        return `<button class="btn btn-sm btn-success" onclick="processRefund(${itemId})">
          <i class="fas fa-dollar-sign"></i> Process Refund
        </button>`;
      }
    }

    if (action === 'approve' && this.canApprove()) {
      return `<button class="btn btn-sm btn-success" onclick="approve(${itemId})">
        <i class="fas fa-check"></i> Approve
      </button>`;
    }

    return '';
  }
}

// Helper function
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export for use in other scripts
window.ComponentLoader = ComponentLoader;
window.WidgetBuilder = WidgetBuilder;
window.CalendarManager = CalendarManager;
window.TableBuilder = TableBuilder;
window.ModalManager = ModalManager;
window.PageManager = PageManager;
window.Formatters = Formatters;
window.RoleManager = RoleManager;
