/* ============================================
   ROLE-BASED CONFIGURATION
   ============================================ */

const RoleConfig = {
  // Super Admin - Full system access
  sa: {
    displayName: 'Super Admin',
    visiblePages: ['dashboard', 'bookings', 'calendar', 'leads', 'customers', 'invoices', 'venues', 'reports', 'settings', 'users', 'audit', 'workorders', 'payouts', 'events', 'incidents'],
    hiddenPages: [],

    dashboardWidgets: [
      {
        label: 'Total Users',
        field: 'totalUsers',
        icon: 'users',
        iconClass: 'primary',
        changeClass: 'positive'
      },
      {
        label: 'Total Revenue',
        field: 'revenue',
        icon: 'dollar-sign',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Active Bookings',
        field: 'activeBookings',
        icon: 'calendar-check',
        iconClass: 'warning',
        changeClass: 'positive'
      },
      {
        label: 'System Health',
        field: 'systemHealth',
        icon: 'heartbeat',
        iconClass: 'danger',
        changeClass: 'positive'
      }
    ],

    tableActions: ['view', 'edit', 'delete', 'approve'],

    quickActions: [
      {
        label: 'Manage Users',
        icon: 'fas fa-users-cog',
        class: 'btn-primary',
        onClick: "window.location.href='users.html'"
      },
      {
        label: 'Audit Logs',
        icon: 'fas fa-clipboard-list',
        class: 'btn-secondary',
        onClick: "window.location.href='audit.html'"
      },
      {
        label: 'System Settings',
        icon: 'fas fa-cog',
        class: 'btn-info',
        onClick: "window.location.href='settings.html'"
      }
    ],

    permissions: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApprove: true,
      canExport: true,
      canFinance: true,
      canManageUsers: true,
      canViewAudit: true,
      canManageVenues: true,
      canAccessCRM: true,
      canViewInvoices: true,
      canViewReports: true
    }
  },

  // Branch Manager - Oversight & approval authority
  bm: {
    displayName: 'Branch Manager',
    visiblePages: ['dashboard', 'bookings', 'calendar', 'leads', 'customers', 'invoices', 'venues', 'reports', 'users', 'audit', 'workorders', 'payouts', 'events'],
    hiddenPages: ['settings'],

    dashboardWidgets: [
      {
        label: 'Total Revenue',
        field: 'revenue',
        icon: 'dollar-sign',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Conversion Rate',
        field: 'conversion',
        icon: 'chart-line',
        iconClass: 'primary',
        changeClass: 'positive'
      },
      {
        label: 'Active Leads',
        field: 'leads',
        icon: 'user-plus',
        iconClass: 'warning',
        changeClass: 'positive'
      },
      {
        label: 'Pending Approvals',
        field: 'pendingApprovals',
        icon: 'clock',
        iconClass: 'danger',
        changeClass: 'negative'
      }
    ],

    tableActions: ['view', 'edit', 'delete', 'approve'],

    quickActions: [
      {
        label: 'New Booking',
        icon: 'fas fa-plus',
        class: 'btn-primary',
        onClick: "openModal('newBookingModal')"
      },
      {
        label: 'Pending Approvals',
        icon: 'fas fa-tasks',
        class: 'btn-warning',
        onClick: "showPendingApprovals()"
      },
      {
        label: 'Reports',
        icon: 'fas fa-chart-bar',
        class: 'btn-secondary',
        onClick: "window.location.href='reports.html'"
      }
    ],

    permissions: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canApprove: true,
      canExport: true,
      canFinance: true,
      canManageUsers: true,
      canViewAudit: true,
      canManageVenues: true,
      canAccessCRM: true,
      canViewInvoices: true,
      canViewReports: true
    }
  },

  // Sales / Front Desk - Operational focus
  sl: {
    displayName: 'Sales / Front Desk',
    visiblePages: ['dashboard', 'bookings', 'calendar', 'leads', 'customers', 'invoices', 'venues'],
    hiddenPages: ['reports', 'settings', 'users', 'audit', 'workorders', 'payouts', 'events', 'incidents'],

    dashboardWidgets: [
      {
        label: "Today's Bookings",
        field: 'todayBookings',
        icon: 'calendar-check',
        iconClass: 'primary',
        changeClass: 'positive'
      },
      {
        label: 'Active Leads',
        field: 'leads',
        icon: 'user-plus',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Check-ins Today',
        field: 'checkins',
        icon: 'sign-in-alt',
        iconClass: 'warning',
        changeClass: 'positive'
      },
      {
        label: 'Follow-ups Due',
        field: 'followups',
        icon: 'bell',
        iconClass: 'danger',
        changeClass: 'negative'
      }
    ],

    tableActions: ['view', 'edit', 'checkin'],

    quickActions: [
      {
        label: 'New Booking',
        icon: 'fas fa-plus',
        class: 'btn-primary',
        onClick: "openModal('newBookingModal')"
      },
      {
        label: 'New Lead',
        icon: 'fas fa-user-plus',
        class: 'btn-success',
        onClick: "openModal('newLeadModal')"
      },
      {
        label: 'Check-in',
        icon: 'fas fa-sign-in-alt',
        class: 'btn-info',
        onClick: "openModal('checkinModal')"
      }
    ],

    permissions: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canApprove: false,
      canExport: false,
      canFinance: false,
      canManageUsers: false,
      canViewAudit: false,
      canManageVenues: false,
      canAccessCRM: true,
      canViewInvoices: true,
      canViewReports: false
    }
  },

  // Accountant - Financial management
  ac: {
    displayName: 'Accountant',
    visiblePages: ['dashboard', 'invoices', 'reports', 'payouts', 'bookings', 'venues'],
    hiddenPages: ['leads', 'customers', 'calendar', 'settings', 'users', 'audit', 'workorders', 'events', 'incidents'],

    dashboardWidgets: [
      {
        label: 'Total Revenue',
        field: 'revenue',
        icon: 'dollar-sign',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Pending Payments',
        field: 'pendingPayments',
        icon: 'clock',
        iconClass: 'warning',
        changeClass: 'negative'
      },
      {
        label: 'Pending Payouts',
        field: 'pendingPayouts',
        icon: 'money-bill-wave',
        iconClass: 'primary',
        changeClass: 'negative'
      },
      {
        label: 'Tax Collections',
        field: 'taxCollections',
        icon: 'percentage',
        iconClass: 'danger',
        changeClass: 'positive'
      }
    ],

    tableActions: ['view', 'edit', 'finance', 'approve'],

    quickActions: [
      {
        label: 'Record Payment',
        icon: 'fas fa-money-check-alt',
        class: 'btn-success',
        onClick: "openModal('paymentModal')"
      },
      {
        label: 'Process Payout',
        icon: 'fas fa-hand-holding-usd',
        class: 'btn-primary',
        onClick: "window.location.href='payouts.html'"
      },
      {
        label: 'Financial Reports',
        icon: 'fas fa-file-invoice-dollar',
        class: 'btn-secondary',
        onClick: "window.location.href='reports.html'"
      }
    ],

    permissions: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canApprove: true,
      canExport: true,
      canFinance: true,
      canManageUsers: false,
      canViewAudit: false,
      canManageVenues: false,
      canAccessCRM: false,
      canViewInvoices: true,
      canViewReports: true
    }
  },

  // Operations Manager - Event execution
  op: {
    displayName: 'Operations Manager',
    visiblePages: ['dashboard', 'bookings', 'calendar', 'venues', 'events', 'workorders', 'incidents', 'payouts'],
    hiddenPages: ['leads', 'customers', 'invoices', 'reports', 'settings', 'users', 'audit'],

    dashboardWidgets: [
      {
        label: 'Events Today',
        field: 'eventsToday',
        icon: 'calendar-day',
        iconClass: 'primary',
        changeClass: 'positive'
      },
      {
        label: 'Pending Tasks',
        field: 'pendingTasks',
        icon: 'tasks',
        iconClass: 'warning',
        changeClass: 'negative'
      },
      {
        label: 'Resource Utilization',
        field: 'resourceUtil',
        icon: 'chart-pie',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Active Incidents',
        field: 'activeIncidents',
        icon: 'exclamation-triangle',
        iconClass: 'danger',
        changeClass: 'negative'
      }
    ],

    tableActions: ['view', 'edit'],

    quickActions: [
      {
        label: 'Event Planning',
        icon: 'fas fa-calendar-alt',
        class: 'btn-primary',
        onClick: "window.location.href='events.html'"
      },
      {
        label: 'Assign Resources',
        icon: 'fas fa-boxes',
        class: 'btn-success',
        onClick: "openModal('resourceModal')"
      },
      {
        label: 'Work Orders',
        icon: 'fas fa-clipboard-list',
        class: 'btn-secondary',
        onClick: "window.location.href='workorders.html'"
      }
    ],

    permissions: {
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canApprove: false,
      canExport: false,
      canFinance: false,
      canManageUsers: false,
      canViewAudit: true,
      canManageVenues: true,
      canManageEvents: true,
      canAllocateResources: true,
      canAccessCRM: false,
      canViewInvoices: false,
      canViewReports: false
    }
  },

  // Vendor - Limited assigned access
  vn: {
    displayName: 'Vendor',
    visiblePages: ['dashboard', 'workorders', 'payouts'],
    hiddenPages: ['bookings', 'calendar', 'leads', 'customers', 'invoices', 'venues', 'reports', 'settings', 'users', 'audit', 'events', 'incidents'],

    dashboardWidgets: [
      {
        label: 'My Work Orders',
        field: 'myWorkOrders',
        icon: 'clipboard-list',
        iconClass: 'primary',
        changeClass: 'positive'
      },
      {
        label: 'Pending Tasks',
        field: 'pendingTasks',
        icon: 'tasks',
        iconClass: 'warning',
        changeClass: 'negative'
      },
      {
        label: 'Completed This Month',
        field: 'completedMonth',
        icon: 'check-circle',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Pending Payouts',
        field: 'pendingPayouts',
        icon: 'money-bill-wave',
        iconClass: 'danger',
        changeClass: 'positive'
      }
    ],

    tableActions: ['view'],

    quickActions: [
      {
        label: 'My Work Orders',
        icon: 'fas fa-list',
        class: 'btn-primary',
        onClick: "window.location.href='workorders.html'"
      },
      {
        label: 'Update Status',
        icon: 'fas fa-edit',
        class: 'btn-success',
        onClick: "openModal('statusModal')"
      },
      {
        label: 'My Payouts',
        icon: 'fas fa-wallet',
        class: 'btn-secondary',
        onClick: "window.location.href='payouts.html'"
      }
    ],

    permissions: {
      canView: 'assigned',
      canCreate: false,
      canEdit: 'assigned',
      canDelete: false,
      canApprove: false,
      canExport: false,
      canFinance: false,
      canManageUsers: false,
      canViewAudit: false,
      canManageVenues: false,
      canAccessCRM: false,
      canViewInvoices: false,
      canViewReports: false,
      canViewPayouts: 'own'
    }
  },

  // Security Staff - Incident logging
  se: {
    displayName: 'Security Staff',
    visiblePages: ['dashboard', 'calendar', 'incidents'],
    hiddenPages: ['bookings', 'leads', 'customers', 'invoices', 'venues', 'reports', 'settings', 'users', 'audit', 'workorders', 'payouts', 'events'],

    dashboardWidgets: [
      {
        label: 'My Assigned Events',
        field: 'assignedEvents',
        icon: 'calendar-check',
        iconClass: 'primary',
        changeClass: 'positive'
      },
      {
        label: 'Open Incidents',
        field: 'openIncidents',
        icon: 'exclamation-circle',
        iconClass: 'danger',
        changeClass: 'negative'
      },
      {
        label: 'Events Today',
        field: 'eventsToday',
        icon: 'calendar-day',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Incidents This Week',
        field: 'incidentsWeek',
        icon: 'chart-line',
        iconClass: 'warning',
        changeClass: 'positive'
      }
    ],

    tableActions: ['view'],

    quickActions: [
      {
        label: 'Log Incident',
        icon: 'fas fa-exclamation-triangle',
        class: 'btn-danger',
        onClick: "openModal('incidentModal')"
      },
      {
        label: 'My Events',
        icon: 'fas fa-calendar',
        class: 'btn-primary',
        onClick: "filterMyEvents()"
      },
      {
        label: 'View Incidents',
        icon: 'fas fa-list',
        class: 'btn-secondary',
        onClick: "window.location.href='incidents.html'"
      }
    ],

    permissions: {
      canView: 'assigned',
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canApprove: false,
      canExport: false,
      canFinance: false,
      canManageUsers: false,
      canViewAudit: false,
      canManageVenues: false,
      canAccessCRM: false,
      canViewInvoices: false,
      canViewReports: false,
      canCreateIncidents: true,
      canViewEvents: 'assigned'
    }
  },

  // Legacy aliases for backward compatibility
  frontdesk: {
    displayName: 'Front Desk (Legacy)',
    visiblePages: ['dashboard', 'bookings', 'calendar'],
    hiddenPages: ['leads', 'customers', 'invoices', 'venues', 'reports', 'settings', 'users', 'audit', 'workorders', 'payouts', 'events', 'incidents'],

    dashboardWidgets: [
      {
        label: "Today's Bookings",
        field: 'todayBookings',
        icon: 'calendar-check',
        iconClass: 'primary',
        changeClass: 'positive'
      },
      {
        label: 'Check-ins Today',
        field: 'checkins',
        icon: 'sign-in-alt',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Room Setup Pending',
        field: 'setupPending',
        icon: 'tools',
        iconClass: 'warning',
        changeClass: 'negative'
      },
      {
        label: 'No-shows Alert',
        field: 'noShows',
        icon: 'exclamation-triangle',
        iconClass: 'danger',
        changeClass: 'negative'
      }
    ],

    tableActions: ['view', 'checkin'],

    quickActions: [
      {
        label: 'Check-in Customer',
        icon: 'fas fa-sign-in-alt',
        class: 'btn-success',
        onClick: "openModal('checkinModal')"
      },
      {
        label: 'View Today',
        icon: 'fas fa-calendar-day',
        class: 'btn-primary',
        onClick: "filterTodayBookings()"
      }
    ],

    permissions: {
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canExport: false,
      canViewReports: false,
      canManageVenues: false,
      canAccessCRM: false,
      canViewInvoices: false
    }
  },

  sales: {
    displayName: 'Sales Manager (Legacy)',
    visiblePages: ['dashboard', 'bookings', 'calendar', 'leads', 'customers', 'invoices', 'venues', 'reports', 'settings'],
    hiddenPages: ['users', 'audit', 'workorders', 'payouts', 'events', 'incidents'],

    dashboardWidgets: [
      {
        label: 'Total Revenue',
        field: 'revenue',
        icon: 'dollar-sign',
        iconClass: 'success',
        changeClass: 'positive'
      },
      {
        label: 'Conversion Rate',
        field: 'conversion',
        icon: 'chart-line',
        iconClass: 'primary',
        changeClass: 'positive'
      },
      {
        label: 'Active Leads',
        field: 'leads',
        icon: 'user-plus',
        iconClass: 'warning',
        changeClass: 'positive'
      },
      {
        label: 'Pending Payments',
        field: 'payments',
        icon: 'clock',
        iconClass: 'danger',
        changeClass: 'negative'
      }
    ],

    tableActions: ['view', 'edit', 'delete'],

    quickActions: [
      {
        label: 'New Booking',
        icon: 'fas fa-plus',
        class: 'btn-primary',
        onClick: "openModal('newBookingModal')"
      },
      {
        label: 'New Lead',
        icon: 'fas fa-user-plus',
        class: 'btn-success',
        onClick: "openModal('newLeadModal')"
      },
      {
        label: 'Reports',
        icon: 'fas fa-chart-bar',
        class: 'btn-secondary',
        onClick: "window.location.href='reports.html'"
      }
    ],

    permissions: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canExport: true,
      canViewReports: true,
      canManageVenues: true,
      canAccessCRM: true,
      canViewInvoices: true
    }
  }
};

// Widget data by field
const WidgetData = {
  // Super Admin widgets
  totalUsers: {
    value: '48',
    change: '+5 this month'
  },
  systemHealth: {
    value: '98%',
    change: 'All systems operational'
  },
  activeBookings: {
    value: '156',
    change: '+12% from last month'
  },

  // Branch Manager widgets
  pendingApprovals: {
    value: '7',
    change: '3 urgent'
  },

  // Sales/Front Desk widgets
  todayBookings: {
    value: '8',
    change: '+2 from yesterday'
  },
  checkins: {
    value: '5/8',
    change: '3 pending check-ins'
  },
  setupPending: {
    value: '3',
    change: '2 urgent'
  },
  noShows: {
    value: '1',
    change: 'Today at 10 AM'
  },
  followups: {
    value: '12',
    change: '5 overdue'
  },

  // Accountant widgets
  pendingPayments: {
    value: '$12,300',
    change: '15 pending invoices'
  },
  pendingPayouts: {
    value: '$8,500',
    change: '8 vendors awaiting payment'
  },
  taxCollections: {
    value: '$6,200',
    change: 'This month'
  },

  // Operations Manager widgets
  eventsToday: {
    value: '4',
    change: '2 in progress'
  },
  pendingTasks: {
    value: '18',
    change: '6 high priority'
  },
  resourceUtil: {
    value: '76%',
    change: 'Good utilization'
  },
  activeIncidents: {
    value: '2',
    change: '1 critical'
  },

  // Vendor widgets
  myWorkOrders: {
    value: '6',
    change: '4 active'
  },
  completedMonth: {
    value: '24',
    change: '+8 from last month'
  },

  // Security widgets
  assignedEvents: {
    value: '3',
    change: 'Today'
  },
  openIncidents: {
    value: '2',
    change: '1 requires attention'
  },
  incidentsWeek: {
    value: '8',
    change: '+2 from last week'
  },

  // Common widgets
  revenue: {
    value: '$48,500',
    change: '+18.2% from last month'
  },
  conversion: {
    value: '42%',
    change: '+5% from last month'
  },
  leads: {
    value: '34',
    change: '+8 new this week'
  },
  payments: {
    value: '$12,300',
    change: '15 pending invoices'
  }
};

// Export for global access
window.RoleConfig = RoleConfig;
window.WidgetData = WidgetData;
