// ============================================================
// app.js — Shared utilities
// ============================================================

// ── Helpers ─────────────────────────────────────────────────
function formatDate(isoStr) {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  return d.toLocaleString('en-ZA', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false
  });
}

function timeAgo(isoStr) {
  if (!isoStr) return '—';
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function severityBadge(sev) {
  const map = {
    critical: 'badge-critical',
    high:     'badge-high',
    medium:   'badge-medium',
    low:      'badge-low'
  };
  return `<span class="badge ${map[sev] || 'badge-low'}">${sev || '?'}</span>`;
}

function stateBadge(state) {
  const cls = `badge-state-${(state || '').replace(/\s/g, '-')}`;
  return `<span class="badge ${cls}">${state || '?'}</span>`;
}

// ── Clock ────────────────────────────────────────────────────
function startClock(el) {
  function tick() {
    const now = new Date();
    el.textContent = now.toUTCString().replace('GMT', 'UTC');
  }
  tick();
  setInterval(tick, 1000);
}

// ── Nav active state ─────────────────────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.includes(page) || (page === 'index.html' && href.includes('index'))) {
      a.classList.add('active');
    }
  });
}

// ── Toast notifications ───────────────────────────────────────
function showToast(msg, type = 'info') {
  const el = document.createElement('div');
  const colors = { info: '#00d4ff', success: '#00e676', error: '#ff2b4a', warning: '#f5c518' };
  el.style.cssText = `
    position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999;
    background:#0d1117; border:1px solid ${colors[type]};
    color:#c8d8e8; font-family:'Share Tech Mono',monospace; font-size:0.8rem;
    padding:0.75rem 1.25rem; border-radius:6px;
    box-shadow:0 0 20px rgba(0,0,0,0.5);
    animation:slideIn 0.25s ease;
    max-width: 320px; line-height: 1.4;
  `;
  el.textContent = msg;

  const style = document.createElement('style');
  style.textContent = '@keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}';
  document.head.appendChild(style);

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ── Shared nav HTML ───────────────────────────────────────────
const NAV_HTML = `
<nav class="sidebar">
  <p class="sidebar-section-label">Operations</p>
  <a class="nav-item" href="index.html">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    Overview
  </a>
  <a class="nav-item" href="incidents.html">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    Incidents
  </a>

  <p class="sidebar-section-label">Analysis</p>
  <a class="nav-item" href="index.html#heatmap">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>
    Risk Heatmap
  </a>
  <a class="nav-item" href="index.html#trends">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    Trends
  </a>

  <p class="sidebar-section-label">System</p>
  <a class="nav-item" href="#">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
    Integrations
  </a>
  <a class="nav-item" href="#">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>
    Analysts
  </a>

  <div class="sidebar-bottom">
    <a class="nav-item" href="#">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      Settings
    </a>
  </div>
</nav>
`;

// ── Topbar HTML ───────────────────────────────────────────────
function buildTopbar(criticalCount = 0) {
  return `
<header class="topbar">
  <div class="topbar-logo">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
    SENTINEL
  </div>
  <div class="topbar-divider"></div>
  <div class="topbar-status">
    <span class="status-dot"></span>
    ALL SYSTEMS OPERATIONAL
  </div>
  ${criticalCount > 0 ? `<span class="topbar-alert-badge critical-pulse">${criticalCount} CRITICAL</span>` : ''}
  <div class="spacer"></div>
  <div class="topbar-clock" id="clock"></div>
</header>`;
}

// ── Init on page load ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  const clockEl = document.getElementById('clock');
  if (clockEl) startClock(clockEl);
});
