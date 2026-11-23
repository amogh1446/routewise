import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Compass, Menu, X, Plus } from "lucide-react";
import { getStoredTrips } from "@/service/tripStorage";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tripCount, setTripCount] = useState<number>(0);

  useEffect(() => {
    const updateCount = () => {
      const trips = getStoredTrips();
      setTripCount(trips.length);
    };
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, [location.pathname]);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);

    if (!sectionId || sectionId === "hero") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (location.pathname === "/") {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const isHomeActive =
    location.pathname === "/" && (!location.hash || location.hash === "#hero");
  const isAboutActive = location.pathname === "/" && location.hash === "#about";
  const isFeaturesActive =
    location.pathname === "/" && location.hash === "#features";
  const isPricingActive =
    location.pathname === "/" && location.hash === "#pricing";
  const isHistoryActive = location.pathname === "/history";
  const isCreateTripActive = location.pathname === "/create-trip";

  return (
    <header className="sticky top-0 z-50 bg-[#09111f]/95 backdrop-blur-md text-white border-b border-gray-800/80 shadow-lg transition-all">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2 group transition"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-blue-300 bg-clip-text text-transparent">
            AI Trip Planner
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => handleNavClick("hero")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
              isHomeActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("features")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
              isFeaturesActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
              isAboutActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("pricing")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer ${
              isPricingActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            Pricing
          </button>
          <Link
            to="/history"
            className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              isHistoryActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            My Trips
            {tripCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold rounded-full bg-blue-600 text-white">
                {tripCount}
              </span>
            )}
          </Link>
          <Link to="/create-trip" className="ml-2">
            <Button
              className={`text-sm font-medium flex items-center gap-1.5 transition shadow-sm ${
                isCreateTripActive
                  ? "bg-blue-500 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-[#09111f]"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30"
              }`}
            >
              <Plus className="w-4 h-4" />
              Plan a Trip
            </Button>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/create-trip">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Plan
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1527] border-b border-gray-800 px-6 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick("hero")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
              isHomeActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("features")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
              isFeaturesActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
              isAboutActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("pricing")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
              isPricingActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            Pricing
          </button>
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
              isHistoryActive
                ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                : "text-gray-300 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <span>My Trips</span>
            {tripCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-600 text-white">
                {tripCount} saved
              </span>
            )}
          </Link>
          <Link
            to="/create-trip"
            onClick={() => setMobileMenuOpen(false)}
            className="block pt-2"
          >
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 flex items-center justify-center gap-1.5">
              <Plus className="w-4 h-4" />
              Plan a New Trip
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
