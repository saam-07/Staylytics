import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReviewArchive from "./pages/ReviewArchive";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#fdfaf6" }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
        } />
          <Route path="/reviews" element={<ProtectedRoute>
          <Reviews />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/review-archive" element={<ReviewArchive/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}