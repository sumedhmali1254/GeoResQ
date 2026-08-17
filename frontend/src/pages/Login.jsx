import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  AlertTriangle,
  Mail,
  Lock,
  User,
  BadgeCheck,
  Phone,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import HeaderBrand from "../components/HeaderBrand";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useAuth();

  const initialRole =
    searchParams.get("role") === "authority" ? "authority" : "citizen";
  const [role, setRole] = useState(initialRole);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const paramRole =
      searchParams.get("role") === "authority" ? "authority" : "citizen";
    setRole(paramRole);
  }, [searchParams]);

  const switchRole = (nextRole) => {
    setRole(nextRole);
    setError("");
    setIsRegister(false);
    setSearchParams(nextRole === "authority" ? { role: "authority" } : {}, {
      replace: true,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({
        email,
        password,
        role,
        name: name || undefined,
        phone: phone || undefined,
      });
      if (role === "citizen") {
        navigate("/citizen");
      } else {
        navigate("/authority/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyAccess = () => {
    login({
      email: "emergency@citizen.in",
      password: "emergency",
      role: "citizen",
    });
    navigate("/citizen");
  };

  return (
    <div className="login-page">
      <div className="login-bg-pattern" />
      <div className="login-bg-gradient" />

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-role-tabs">
          <button
            type="button"
            className={`login-role-tab ${role === "citizen" ? "login-role-tab-active login-role-tab-citizen" : ""}`}
            onClick={() => switchRole("citizen")}
          >
            <Users size={15} />
            <span>Citizen Login</span>
          </button>
          <button
            type="button"
            className={`login-role-tab ${role === "authority" ? "login-role-tab-active login-role-tab-official" : ""}`}
            onClick={() => switchRole("authority")}
          >
            <Building2 size={15} />
            <span>Official Login</span>
          </button>
        </div>

        <div className="login-card-header">
          <Link
            to="/"
            className="login-brand-link"
            aria-label="Go to home page"
          >
            <img
              src="/main-logo.png"
              alt="GeoResQ India logo"
              className="login-card-logo"
            />
          </Link>

          <h1 className="login-title">
            {isRegister
              ? role === "citizen"
                ? "Create Citizen Account"
                : "Register Official Access"
              : role === "citizen"
                ? "Citizen Login"
                : "Official Login"}
          </h1>
          <p className="login-subtitle">
            {isRegister
              ? role === "citizen"
                ? "Register to receive alerts, report incidents, and access emergency services"
                : "Request authorized access to the command center dashboard"
              : role === "citizen"
                ? "Sign in to access risk alerts and emergency services"
                : "Authorized personnel only — enter your credentials"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {isRegister && (
            <div className="login-field">
              <label className="login-label">
                <User size={13} />
                Full Name
              </label>
              <div className="login-input-wrap">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="login-field">
            <label className="login-label">
              <Mail size={13} />
              {role === "citizen" ? "Email or Phone" : "Official Email"}
            </label>
            <div className="login-input-wrap">
              <input
                type="email"
                className="login-input"
                placeholder={
                  role === "citizen"
                    ? "rahul.sharma@gmail.com"
                    : "name@ndma.gov.in"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {isRegister && role === "citizen" && (
            <div className="login-field">
              <label className="login-label">
                <Phone size={13} />
                Mobile Number
              </label>
              <div className="login-input-wrap">
                <input
                  type="tel"
                  className="login-input"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="login-field">
            <label className="login-label">
              <Lock size={13} />
              Password
            </label>
            <div className="login-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {role === "authority" && !isRegister && (
            <div className="login-field">
              <label className="login-label">
                <BadgeCheck size={13} />
                Department / Badge ID
              </label>
              <div className="login-input-wrap">
                <input
                  type="text"
                  className="login-input"
                  placeholder="e.g. MDMA-2847"
                />
              </div>
            </div>
          )}

          {error && (
            <motion.div
              className="login-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertTriangle size={14} />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
            style={{
              background:
                role === "citizen"
                  ? "linear-gradient(135deg, #0ea5e9, #2563eb)"
                  : "linear-gradient(135deg, #7c3aed, #4f46e5)",
            }}
          >
            {loading ? (
              <span className="login-spinner" />
            ) : (
              <>
                <span>
                  {isRegister
                    ? role === "citizen"
                      ? "Create Account"
                      : "Submit Registration"
                    : role === "citizen"
                      ? "Enter Citizen Portal"
                      : "Enter Command Center"}
                </span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <p className="login-demo-hint">
            <span>Demo Mode:</span> Enter any email and password to proceed.
          </p>
        </form>

        <div className="login-switch-mode">
          <button
            type="button"
            className="login-switch-btn"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister
              ? "Already have an account? Sign in"
              : role === "citizen"
                ? "Don't have an account? Register as citizen"
                : "Need official access? Register here"}
          </button>
        </div>

        {role === "citizen" && (
          <div className="login-emergency-bypass">
            <AlertTriangle size={14} className="text-red-500" />
            <button
              type="button"
              className="login-emergency-btn"
              onClick={handleEmergencyAccess}
            >
              Emergency access without login →
            </button>
          </div>
        )}
      </motion.div>

      <div className="login-footer">
        <span>© 2026 GeoResQ India — Disaster Decision Intelligence</span>
        <span className="login-footer-dot">·</span>
        <span>Government Grade Security</span>
      </div>
    </div>
  );
}
