// Track active tab
let activeAdminTab = "dashboard";

// Show toast notification
function showAdminToast(message) {
  let toast = document.querySelector('.admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Show selected tab content
function showAdminTab(tabId) {
  const tabs = ["dashboardTab", "inventoryTab", "ordersTab", "staffTab", "reportsTab"];
  tabs.forEach(t => {
    const el = document.getElementById(t);
    if (el) el.classList.remove("active-tab");
  });
  
  const target = document.getElementById(`${tabId}Tab`);
  if (target) target.classList.add("active-tab");
  
  // Update nav buttons active style
  const navBtns = document.querySelectorAll('.admin-nav-btn');
  navBtns.forEach(btn => {
    const val = btn.getAttribute('data-admin-tab');
    if (val === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update header title
  const titleMap = {
    dashboard: "Dashboard",
    inventory: "Inventory Management",
    orders: "Live Orders",
    staff: "Staff & Attendance",
    reports: "Sales Reports"
  };
  
  const panelTitle = document.getElementById('adminPanelTitle');
  if (panelTitle) panelTitle.innerText = titleMap[tabId] || "Admin";
  activeAdminTab = tabId;
}

// Initialize admin navigation
function initAdminTabs() {
  const navBtns = document.querySelectorAll('.admin-nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-admin-tab');
      if (tab) showAdminTab(tab);
    });
  });
  showAdminTab('dashboard');
}

// Inventory actions
function initInventoryActions() {
  const restockBtn = document.getElementById('simulateRestockBtn');
  if (restockBtn) {
    restockBtn.addEventListener('click', () => {
      showAdminToast("🔄 Simulated restock: Beef Patty (+30), French Fries (+15)");
    });
  }
}

// Orders actions
function initOrdersActions() {
  const refreshBtn = document.getElementById('refreshOrdersBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      showAdminToast("🔄 Orders refreshed. 4 pending orders.");
    });
  }
}

// Staff actions
function initStaffActions() {
  const logBtn = document.getElementById('logActivityBtn');
  if (logBtn) {
    logBtn.addEventListener('click', () => {
      showAdminToast("📝 Staff activity logged: Cire updated menu prices.");
    });
  }
}

// Reports actions
function initReportsActions() {
  const exportBtn = document.getElementById('exportReportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      showAdminToast("📁 CSV report generated: sales_may2026.csv");
    });
  }
}

// ---------- PAGE LOAD ----------
document.addEventListener('DOMContentLoaded', () => {
  initAdminTabs();
  initInventoryActions();
  initOrdersActions();
  initStaffActions();
  initReportsActions();
});