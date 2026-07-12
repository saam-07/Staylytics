import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Toast from "../components/ui/Toast";
import Loader from "../components/ui/Loader";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const showToast = (message, type = "info") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Minimum 6 characters";
    if (!confirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleRegister = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast("Please fix the errors below", "error");
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Registration failed");
      login(data.token, data.user);
      showToast("Account created successfully!", "success");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      showToast(err.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // Create a guest session without backend
    const guestUser = { id: "guest", email: "guest@staylytics.com", name: "Guest" };
    login("guest_token", guestUser);
    showToast("Continuing as guest", "info");
    setTimeout(() => navigate("/dashboard"), 800);
  };

  return (
    <main
      className="flex-1 min-h-screen flex items-center justify-center px-6 py-24"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      {loading && <Loader fullPage label="Creating your account..." />}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-sm"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-card)" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-dark)" }}
            >
              Staylytics
            </h1>
          </Link>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Create your account
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="e.g. Priya Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />

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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />

          <Button
            label="Create Account"
            onClick={handleRegister}
            variant="primary"
            size="lg"
            loading={loading}
          />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-main)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-main)" }} />
          </div>

          <Button
            label="Continue as Guest"
            variant="ghost"
            size="md"
            onClick={handleGuestLogin}
          />
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "#9b2335" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
