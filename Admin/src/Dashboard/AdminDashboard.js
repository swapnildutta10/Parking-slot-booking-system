import React from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "users", label: "Manage users", icon: "👤" },
  { id: "requests", label: "Host requests", icon: "✓" },
  { id: "slots", label: "Manage parking slots", icon: "▣" },
  { id: "bookings", label: "Manage bookings", icon: "◔" },
  { id: "payments", label: "Manage payments", icon: "$" },
  { id: "reports", label: "View reports", icon: "↗" },
];

const RECENT_BOOKINGS = [
  { name: "Riya Malhotra", detail: "Premium slot · Today, 10:30", status: "confirmed", tone: "#10a574" },
  { name: "Arjun Kapoor", detail: "Standard slot · Today, 11:15", status: "pending", tone: "#ff6b4a" },
  { name: "Sofia Patel", detail: "Economy slot · Today, 12:00", status: "confirmed", tone: "#3984b5" },
];

// Small deterministic "sparkline" — no charting library needed.
function Sparkline({ points, color }) {
  const width = 88;
  const height = 30;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const path = points
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg className="pn-spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AdminDashboard({ onBackHome, onLogout }) {
  const [activeSection, setActiveSection] = React.useState("dashboard");

  const activeLabel =
    NAV_ITEMS.find((item) => item.id === activeSection)?.label ?? "Dashboard";

  return (
    <div className="pn-scope pn-dash">
      <aside className="pn-dash-sidebar">
        <div className="pn-dash-brand">
          <span>P</span> ParkNova
        </div>
        <p className="pn-dash-label">Workspace</p>
        <nav className="pn-dash-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? "active" : ""}
              onClick={() => setActiveSection(item.id)}
            >
              <span aria-hidden="true">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <button className="pn-dash-nav pn-dash-home" type="button" onClick={onBackHome}>
          <span aria-hidden="true">←</span> Back to home
        </button>
        <button className="pn-dash-nav pn-dash-logout" type="button" onClick={onLogout}>
          <span aria-hidden="true">⏻</span> Log out
        </button>
      </aside>

      <main className="pn-dash-main">
        {activeSection === "dashboard" ? (
          <>
            <div className="pn-dash-topbar">
              <div>
                <p className="pn-dash-kicker">Administrator portal</p>
                <h1>Dashboard</h1>
              </div>
              <div className="pn-dash-profile">
                <div className="pn-dash-avatar">A</div>
                <div>
                  <strong>Admin profile</strong>
                  <small>Online now</small>
                </div>
              </div>
            </div>

            <div className="pn-banner">
              <div>
                <h2>Good morning, administrator.</h2>
                <p>Here&apos;s what&apos;s happening across your parking network.</p>
              </div>
            </div>

            <div className="pn-stat-grid">
              <div className="pn-stat-card">
                <span>Total users</span>
                <strong>12,480</strong>
                <div className="pn-stat-foot">
                  <small>+8.4% this month</small>
                  <Sparkline points={[4, 6, 5, 8, 7, 10, 12]} color="#10a574" />
                </div>
              </div>
              <div className="pn-stat-card">
                <span>Parking slots</span>
                <strong>864</strong>
                <div className="pn-stat-foot">
                  <small>92% currently available</small>
                  <Sparkline points={[8, 7, 9, 8, 10, 9, 11]} color="#3984b5" />
                </div>
              </div>
              <div className="pn-stat-card">
                <span>Active bookings</span>
                <strong>1,248</strong>
                <div className="pn-stat-foot">
                  <small>+12.1% this week</small>
                  <Sparkline points={[3, 5, 4, 7, 9, 8, 12]} color="#ff6b4a" />
                </div>
              </div>
              <div className="pn-stat-card">
                <span>Monthly revenue</span>
                <strong>$48.6k</strong>
                <div className="pn-stat-foot">
                  <small>+6.8% from last month</small>
                  <Sparkline points={[6, 6, 7, 9, 8, 10, 11]} color="#10a574" />
                </div>
              </div>
            </div>

            <div className="pn-panel-grid">
              <div className="pn-data-card">
                <div className="pn-data-card-head">
                  <div>
                    <p className="pn-dash-kicker" style={{ margin: "0 0 6px" }}>
                      Live activity
                    </p>
                    <h2>Recent bookings</h2>
                  </div>
                  <button type="button">View all</button>
                </div>
                {RECENT_BOOKINGS.map((booking) => (
                  <div
                    key={booking.name}
                    className={`pn-activity-row ${booking.status}`}
                  >
                    <div
                      className="pn-avatar-sm"
                      style={{ background: booking.tone }}
                    >
                      {initials(booking.name)}
                    </div>
                    <p>
                      <strong>{booking.name}</strong>
                      <small>{booking.detail}</small>
                    </p>
                    <span className={`pn-status-tag ${booking.status}`}>
                      {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pn-data-card">
                <div className="pn-data-card-head">
                  <div>
                    <p className="pn-dash-kicker" style={{ margin: "0 0 6px" }}>
                      Capacity
                    </p>
                    <h2>Slot availability</h2>
                  </div>
                  <span className="pn-capacity-value">92%</span>
                </div>
                <div className="pn-progress-track">
                  <span className="pn-progress-fill" style={{ width: "92%" }} />
                </div>
                <p style={{ color: "#769183", fontSize: 13, lineHeight: 1.6 }}>
                  794 of 864 parking slots are available across 18 locations.
                </p>
                <button
                  type="button"
                  style={{
                    marginTop: 18,
                    border: 0,
                    background: "transparent",
                    color: "#10a574",
                    fontWeight: 800,
                    fontSize: 12,
                  }}
                >
                  Manage slots <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="pn-placeholder">
            <div className="pn-placeholder-icon" aria-hidden="true">
              {NAV_ITEMS.find((item) => item.id === activeSection)?.icon}
            </div>
            <h2>{activeLabel}</h2>
            <p>
              This section is ready to be wired up to your real data — the
              layout, nav, and styling are already in place.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
