'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useCart } from '../../context/CartContext';
import CartDropdown from '../cart/CartDropdown';
import ConfirmationDialog from '../ui/ConfirmationDialog';

const Header = () => {
  const { data: session } = useSession();
  const { items, setIsDropdownOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (session) {
      setShowWelcomePopup(true);
      const timer = setTimeout(() => setShowWelcomePopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [session]);

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    setShowSignOutConfirmation(true);
  };

  const confirmSignOut = async () => {
    await signOut();
    setShowSignOutConfirmation(false);
    setShowLogoutPopup(true);
    const timer = setTimeout(() => setShowLogoutPopup(false), 3000);
    return () => clearTimeout(timer);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600">
              Hamro Supermarket
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-green-600">
              Shop
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-green-600">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600">
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <div className="relative">
              <button
                className="text-gray-700 hover:text-green-600 relative"
                onClick={() => setIsDropdownOpen(true)}
                aria-label="Shopping cart"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <CartDropdown />
            </div>

            {/* User Menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden md:inline">{session.user?.name}</span>
                  </div>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    {session.user?.role === 'ADMIN' && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-gray-700 hover:text-green-600"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
      {showWelcomePopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
          Welcome back, {session?.user?.name}!
        </div>
      )}
      {showLogoutPopup && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-md shadow-lg">
          You have been successfully logged out.
        </div>
      )}
      <ConfirmationDialog
        isOpen={showSignOutConfirmation}
        onClose={() => setShowSignOutConfirmation(false)}
        onConfirm={confirmSignOut}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out?"
      />
    </header>
  );
};

export default Header;
