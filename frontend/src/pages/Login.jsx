import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import Toast from "../components/ui/Toast";
import Loader from "../components/ui/Loader";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };
  useEffect(() => {
  // Define callback
  window.handleGoogleCallback = async (response) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);
      login(data.token, data.user);
      showToast("Signed in with Google!", "success");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      showToast(err.message || "Google sign in failed", "error");
    }
  };

  // Initialize Google Identity Services
  const initGoogle = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "580034075318-sp27koska9ar8vdo4af5m83r8e2ch5mn.apps.googleusercontent.com",
        callback: window.handleGoogleCallback,
      });
        window._googleInitialized = true;
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        {
          theme: "outline",
          size: "large",
          width: 400,
          text: "sign_in_with",
          shape: "rectangular",
        }
      );
    } else {
      // Script not loaded yet, retry after 500ms
      setTimeout(initGoogle, 500);
    }
  };

  initGoogle();
}, [login, navigate, showToast]);

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
    return errs;
  };

  const handleLogin = async () => {
  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    showToast("Please fix the errors below", "error");
    return;
  }
  setErrors({});
  setLoading(true);
  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Login failed");
    login(data.token, data.user);
    showToast("Logged in successfully!", "success");
    setTimeout(() => navigate("/dashboard"), 800);
  } catch (err) {
    showToast(err.message || "Login failed", "error");
  } finally {
    setLoading(false);
  }
};


  const handleReset = () => {
    setModalOpen(false);
    showToast("Password reset link sent to your email", "success");
  };

  return (
    <main className="flex-1 min-h-screen flex items-center justify-center px-6 py-24"
      style={{ backgroundColor: "#fdfaf6" }}>

      {/* Loader overlay when logging in */}
      {loading && <Loader fullPage label="Signing you in..." />}

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {/* Reset Password Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Reset Password"
        confirmLabel="Send Reset Link"
        onConfirm={handleReset}
      >
        <p className="mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
      </Modal>

      {/* Login card */}
      <div className="w-full max-w-md rounded-2xl p-8 shadow-sm"
        style={{ backgroundColor: "#ffffff", border: "1px solid #f0e6e0" }}>

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-2xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "#2d1515" }}>
              Staylytics
            </h1>
          </Link>
          <p className="text-sm" style={{ color: "#7a5c5c" }}>
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint="Minimum 6 characters"
          />

          {/* Forgot password */}
          <div className="flex justify-end -mt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-medium hover:opacity-70 transition-opacity"
              style={{ color: "#9b2335" }}
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <Button
            label="Sign In"
            onClick={handleLogin}
            variant="primary"
            size="lg"
            loading={loading}
          />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: "#f0e6e0" }} />
            <span className="text-xs" style={{ color: "#7a5c5c" }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#f0e6e0" }} />
          </div>
{/* Google renders its button here */}
<div id="google-signin-btn" className="w-full flex justify-center" />


<button
  onClick={() => window.google?.accounts.id.prompt()}
  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
             font-semibold text-sm transition-all duration-200
             hover:opacity-80 hover:-translate-y-0.5"
  style={{
    backgroundColor: "#ffffff",
    border: "1px solid var(--border-main)",
    color: "#3c4043",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  }}
>
  {/* Google SVG icon */}
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
  Sign in with Google
</button>

          {/* Secondary buttons */}
          <Button
            label="Continue as Guest"
            variant="ghost"
            size="md"
            onClick={() => {
          const guestUser = { id: "guest", email: "guest@staylytics.com", name: "Guest" };
          login("guest_token", guestUser);
          showToast("Continuing as guest", "info");
          setTimeout(() => navigate("/dashboard"), 800);
            }}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "#7a5c5c" }}>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "#9b2335" }}>
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
