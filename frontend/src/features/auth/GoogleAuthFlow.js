import React from "react";

function GoogleAuthFlow({ mode = "login", onComplete, onCancel }) {
  const [stage, setStage] = React.useState("connecting");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => setStage("verified"), 1300);
    return () => clearTimeout(timer);
  }, []);

  function handleContinue() {
    if (mode === "register") {
      setStage("details");
    } else {
      onComplete({});
    }
  }

  function handleDetailsSubmit(event) {
    event.preventDefault();
    onComplete({ phone });
  }

  return (
    <div className="google-auth-overlay" role="dialog" aria-modal="true">
      <div className="google-auth-card">
        <button
          className="google-auth-close"
          type="button"
          aria-label="Cancel Google sign-in"
          onClick={onCancel}
        >
          ×
        </button>

        {stage === "connecting" && (
          <div className="google-auth-step">
            <span className="google-auth-mark">G</span>
            <div className="google-auth-spinner" aria-hidden="true" />
            <p className="eyebrow">Connecting to Google</p>
            <h3>Verifying your account…</h3>
            <p className="google-auth-copy">
              This only takes a moment. Don&apos;t close this window.
            </p>
          </div>
        )}

        {stage === "verified" && (
          <div className="google-auth-step">
            <div className="google-auth-badge">
              <span aria-hidden="true">✓</span>
            </div>
            <p className="eyebrow">Verified</p>
            <h3>Your Google account is verified</h3>
            <p className="google-auth-copy">
              <strong>olivia@gmail.com</strong> is connected and ready to use
              with ParkNova.
            </p>
            <button
              className="primary-button btn"
              type="button"
              onClick={handleContinue}
            >
              Continue <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

        {stage === "details" && (
          <form className="google-auth-step" onSubmit={handleDetailsSubmit}>
            <div className="google-auth-badge google-auth-badge-muted">
              <span aria-hidden="true">✓</span>
            </div>
            <p className="eyebrow">One last step</p>
            <h3>Complete your profile</h3>
            <p className="google-auth-copy">
              Add a phone number so we can reach you about your bookings.
            </p>
            <label className="google-auth-field">
              Phone number
              <input
                className="form-control"
                required
                type="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
            <button className="primary-button btn" type="submit">
              Finish <span aria-hidden="true">✓</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default GoogleAuthFlow;