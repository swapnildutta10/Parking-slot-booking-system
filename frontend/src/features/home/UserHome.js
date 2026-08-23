import React from "react";

function UserHome({ onRegister, onLogin, onLogout }) {
  const [activeView, setActiveView] = React.useState("home");

  return (
    <div className="pn-scope pn-home">
      <header className="pn-home-header">
        <a
          className="pn-home-brand"
          href="#user-home"
          onClick={() => setActiveView("home")}
        >
          <span>P</span> ParkNova
        </a>
        <nav className="pn-home-nav" aria-label="User portal navigation">
          <button
            type="button"
            className={activeView === "home" ? "active" : ""}
            onClick={() => setActiveView("home")}
          >
            Home
          </button>
          <button
            type="button"
            className={activeView === "profile" ? "active" : ""}
            onClick={() => setActiveView("profile")}
          >
            User profile
          </button>
          <button
            type="button"
            className={activeView === "update" ? "active" : ""}
            onClick={() => setActiveView("update")}
          >
            Update profile
          </button>
          <button type="button" className="pn-logout" onClick={onLogout}>
            Log out
          </button>
        </nav>
      </header>

      {activeView === "home" && (
        <section className="pn-home-hero" id="user-home">
          <div>
            <p className="pn-kicker">Driver portal</p>
            <h1>Your parking, in one calm place.</h1>
            <p>
              Sign in to manage bookings, or create an account to start
              reserving smarter spaces.
            </p>
            <div className="pn-home-actions">
              <button className="pn-btn-primary" type="button" onClick={onLogin}>
                Login <span aria-hidden="true">→</span>
              </button>
              <button
                className="pn-btn-secondary"
                type="button"
                onClick={onRegister}
              >
                Register
              </button>
            </div>
            <div className="pn-quick-row">
              <span className="pn-quick-chip">📍 Find a nearby spot</span>
              <span className="pn-quick-chip">⏱ Extend a booking</span>
              <span className="pn-quick-chip">💬 Contact support</span>
            </div>
          </div>

          <div className="pn-ticket" aria-label="Your next reserved trip">
            <div className="pn-ticket-top">
              <span>Next trip</span>
              <span className="pn-ticket-badge">Confirmed</span>
            </div>
            <div className="pn-ticket-slot">A-24</div>
            <p className="pn-ticket-loc">Brainware University Main Gate</p>

            <div className="pn-ticket-perf">
              <span className="pn-ticket-notch left" />
              <span className="pn-ticket-notch right" />
            </div>

            <div className="pn-ticket-details">
              <div>
                <span>Date</span>
                <strong>Today</strong>
              </div>
              <div>
                <span>Arrival</span>
                <strong>4:30 PM</strong>
              </div>
              <div>
                <span>Duration</span>
                <strong>3 hours</strong>
              </div>
              <div>
                <span>Rate</span>
                <strong>$13/day</strong>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeView === "profile" && (
        <section className="pn-panel">
          <p className="pn-kicker">Account overview</p>
          <h1>User profile</h1>
          <div className="pn-profile-card">
            <strong>Olivia Martin</strong>
            <span>olivia@example.com</span>
            <span>Member since August 2026</span>
          </div>
          <button
            className="pn-btn-primary"
            type="button"
            onClick={() => setActiveView("update")}
          >
            Update profile <span aria-hidden="true">→</span>
          </button>
        </section>
      )}

      {activeView === "update" && (
        <section className="pn-panel">
          <p className="pn-kicker">Account settings</p>
          <h1>Update profile</h1>
          <form
            className="pn-form-card"
            onSubmit={(event) => event.preventDefault()}
          >
            <label>
              Full name
              <input defaultValue="Olivia Martin" />
            </label>
            <label>
              Email address
              <input defaultValue="olivia@example.com" type="email" />
            </label>
            <label>
              Phone number
              <input placeholder="Add your phone number" type="tel" />
            </label>
            <button className="pn-btn-primary" type="submit">
              Save changes <span aria-hidden="true">✓</span>
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default UserHome;
