import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, FileText } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/** 
 * Navbar component - Top navigation bar
 * 
 **/

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();//to navigate programmatically
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!currentUser?.name) return 'U';
    const names = currentUser.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return currentUser.name[0].toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <FileText className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">
                ResumeRefine
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {getUserInitials()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {currentUser?.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />

                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentUser?.email}
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* User Info */}
            <div className="px-3 py-2 border-b border-gray-200 mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {getUserInitials()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser?.name}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>
              </div>
            </div>

            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>

            {/* Logout */}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;