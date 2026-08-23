import React from "react";
import { ADMIN_CREDENTIALS } from "./authCredentials";

const USER_SITE_URL = process.env.REACT_APP_USER_SITE_URL || "/";

function AdminLogin({ onLoginSuccess }) {
  const [adminId, setAdminId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const isValid =
      adminId.trim() === ADMIN_CREDENTIALS.id &&
      password === ADMIN_CREDENTIALS.password;

    if (!isValid) {
      setError("That admin ID or password isn't recognized.");
      return;
    }
    setError("");
    setSubmitted(true);

    if (onLoginSuccess) {
      onLoginSuccess();
    }
  }

  return (
    <div className="pn-scope pn-admin-login">
      <div className="pn-admin-grid-texture" aria-hidden="true" />

      <div className="pn-admin-card">
        <div className="pn-admin-mark">⚙</div>
        <p className="pn-eyebrow">Restricted access</p>
        <h2>Admin console</h2>
        <p className="pn-sub">
          Sign in with your administrator credentials to manage ParkNova&apos;s
          lots, pricing, and driver accounts.
        </p>

        {!submitted ? (
          <form className="pn-admin-form" onSubmit={handleSubmit}>
            <label className="pn-admin-field">
              Admin ID
              <input
                required
                type="text"
                placeholder="admin@parknova.com"
                value={adminId}
                onChange={(event) => setAdminId(event.target.value)}
              />
            </label>
            <label className="pn-admin-field">
              Password
              <input
                required
                minLength="8"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            {error && <p className="pn-admin-error">{error}</p>}

            <button className="pn-admin-submit" type="submit">
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>
        ) : (
          <div className="pn-success">
            <div className="pn-success-icon">✓</div>
            <h2 style={{ color: "#fff" }}>Welcome, admin.</h2>
            <p style={{ color: "#a9c3b4" }}>
              Redirecting you to the ParkNova dashboard.
            </p>
          </div>
        )}

        <div className="pn-status-strip">
          <span className="pn-status-dot" aria-hidden="true" />
          All systems operational · access is monitored and logged.
        </div>

        <a className="pn-admin-back" href={USER_SITE_URL}>
          ← Visit the ParkNova user site
        </a>
      </div>
    </div>
  );
}

export default AdminLogin;
