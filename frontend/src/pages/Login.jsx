import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import Toast from "../components/ui/Toast";
import Loader from "../components/ui/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });

  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
    return errs;
  };

  const handleLogin = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast("Please fix the errors below", "error");
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Logged in successfully!", "success");
    }, 2000);
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

          {/* Secondary buttons */}
          <Button
            label="Continue as Guest"
            variant="ghost"
            size="md"
            onClick={() => showToast("Entering as guest", "info")}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "#7a5c5c" }}>
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "#9b2335" }}>
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
