import React from "react";
import GoogleAuthFlow from "./GoogleAuthFlow";
import { MEMBER_CREDENTIALS } from "./authCredentials";

const LIVE_DOT_INDICES = [2, 7, 9, 14, 19, 23];

function UserLogin({ onGoToRegister, onLoginSuccess }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const [showGoogleAuth, setShowGoogleAuth] = React.useState(false);
  const [memberId, setMemberId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [shake, setShake] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const isValid =
      memberId.trim() === MEMBER_CREDENTIALS.id &&
      password === MEMBER_CREDENTIALS.password;

    if (!isValid) {
      setError("That ID or password doesn't match a ParkNova account.");
      setShake(true);
      return;
    }
    setError("");

    if (onLoginSuccess) {
      onLoginSuccess();
      return;
    }
    setSubmitted(true);
  }

  function handleGoogleAuthComplete(profile) {
    setShowGoogleAuth(false);
    if (onLoginSuccess) {
      onLoginSuccess(profile);
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="pn-scope pn-login">
      {showGoogleAuth && (
        <GoogleAuthFlow
          mode="login"
          onCancel={() => setShowGoogleAuth(false)}
          onComplete={handleGoogleAuthComplete}
        />
      )}

      <aside className="pn-login-visual pn-anim-visual">
        <div className="pn-login-brand">
          <span>P</span> ParkNova
        </div>

        <div className="pn-login-map" aria-hidden="true">
          <div className="pn-map-grid">
            {Array.from({ length: 24 }).map((_, index) => (
              <span
                key={index}
                className={`pn-map-dot pn-anim-dot${LIVE_DOT_INDICES.includes(index) ? " is-live" : ""}`}
                style={{
                  animationDelay: `${(index % 6) * 0.3}s`,
                  "--pop-delay": `${0.4 + index * 0.02}s`,
                }}
              />
            ))}
          </div>
          <div className="pn-map-pin">
            <span>✓</span> Spot A-24 reserved
          </div>
        </div>

        <div className="pn-login-stats">
          <div>
            <strong>12,480</strong>
            <span>Drivers onboard</span>
          </div>
          <div>
            <strong>18</strong>
            <span>Live locations</span>
          </div>
          <div>
            <strong>4.9</strong>
            <span>Average rating</span>
          </div>
        </div>
      </aside>

      <section className="pn-login-form-side">
        <div className="pn-login-form-wrap pn-anim-form-wrap">
          {!submitted ? (
            <>
              <p className="pn-eyebrow pn-anim-item" style={{ "--d": "0.05s" }}>
                Driver access
              </p>
              <h1 className="pn-anim-item" style={{ "--d": "0.1s" }}>
                Welcome back
              </h1>
              <p className="pn-sub pn-anim-item" style={{ "--d": "0.15s" }}>
                Log in to manage your reservations and find your next spot.
              </p>

              <form
                className={`pn-form pn-anim-item${shake ? " pn-shake" : ""}`}
                style={{ "--d": "0.2s" }}
                onSubmit={handleSubmit}
                onAnimationEnd={() => setShake(false)}
              >
                <label className="pn-field">
                  <span>Email or member ID</span>
                  <input
                    required
                    type="text"
                    placeholder="olivia@example.com"
                    value={memberId}
                    onChange={(event) => setMemberId(event.target.value)}
                  />
                </label>
                <label className="pn-field">
                  <span>Password</span>
                  <input
                    required
                    minLength="8"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>

                {error && <p className="pn-form-error pn-anim-error">{error}</p>}

                <div className="pn-form-row">
                  <label className="pn-checkbox">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember((value) => !value)}
                    />
                    Remember me
                  </label>
                  <a className="pn-link" href="#forgot">
                    Forgot password?
                  </a>
                </div>

                <button className="pn-button-primary" type="submit">
                  Log in <span aria-hidden="true">→</span>
                </button>
              </form>

              <div className="pn-divider pn-anim-item" style={{ "--d": "0.25s" }}>
                <span>or</span>
              </div>

              <button
                className="pn-button-google pn-anim-item"
                style={{ "--d": "0.3s" }}
                type="button"
                onClick={() => setShowGoogleAuth(true)}
              >
                <span className="pn-google-mark">G</span> Continue with Google
              </button>

              <p className="pn-foot-link pn-anim-item" style={{ "--d": "0.35s" }}>
                Don&apos;t have an account?{" "}
                <a
                  href="#register"
                  onClick={(event) => {
                    if (onGoToRegister) {
                      event.preventDefault();
                      onGoToRegister();
                    }
                  }}
                >
                  Sign up
                </a>
              </p>
            </>
          ) : (
            <div className="pn-success pn-anim-success">
              <svg
                className="pn-success-check"
                viewBox="0 0 64 64"
                width="56"
                height="56"
                aria-hidden="true"
              >
                <circle
                  className="pn-success-check-circle"
                  cx="32"
                  cy="32"
                  r="29"
                  fill="none"
                  strokeWidth="4"
                />
                <path
                  className="pn-success-check-mark"
                  d="M19 33.5 L28 42.5 L46 22.5"
                  fill="none"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h2 className="pn-anim-item" style={{ "--d": "0.15s" }}>
                Welcome back.
              </h2>
              <p className="pn-anim-item" style={{ "--d": "0.22s" }}>
                Let&apos;s find you a better place to park today.
              </p>
              <button
                className="pn-button-primary pn-anim-item"
                style={{ "--d": "0.3s" }}
                type="button"
                onClick={() => setSubmitted(false)}
              >
                Back to login <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default UserLogin;
