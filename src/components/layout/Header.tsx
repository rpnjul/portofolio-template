"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isAdminPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/masuk");

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }, [pathname]);

    // Close mobile menu when route changes
    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [pathname]);

    const publicNavLinks = [
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/posts", label: "Posts" },
      { href: "/contact", label: "Contact" },
    ];

    const publicNavLinksWithDashboard = [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/posts", label: "Posts" },
      { href: "/contact", label: "Contact" },
    ];

    const adminNavLinks = [
      { href: "/", label: "Home" },
      { href: "/dashboard/posts", label: "Posts" },
      { href: "/dashboard/projects", label: "Projects" },
      { href: "/dashboard/experience", label: "Experience" },
    ];

    const navLinks = isAdminPage ? adminNavLinks : (isLoggedIn ? publicNavLinksWithDashboard : publicNavLinks);

    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/masuk");
    };

    return (
      <header className="site-header">
        <nav className="site-nav">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            {/* Logo */}
            <Link
              href={isAdminPage ? "/dashboard" : "/"}
              className="logo"
              style={{
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
            >
              {isAdminPage ? "Admin Dashboard" : "Satria Aprilian"}
            </Link>

            {/* Hamburger Button - Only visible on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button"
              aria-label="Toggle menu"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                color: 'inherit'
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMobileMenuOpen ? (
                  // X icon when menu is open
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  // Hamburger icon when menu is closed
                  <>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>

            {/* Desktop Menu */}
            <ul
              className="main-menu desktop-menu"
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem',
                margin: 0,
                padding: 0,
                listStyle: 'none'
              }}
            >
              {navLinks.map((v, i) => (
                  <li key={i}>
                      <Link href={v.href} className={pathname == v.href ? "active" : ""}>
                          {v.label}
                      </Link>
                  </li>
              ))}
              {isAdminPage && pathname !== "/masuk" && (
                <li>
                  <button onClick={handleLogout} className="logout-link">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu Dropdown */}
          <ul
            className={`main-menu mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
            style={{
              flexDirection: 'column',
              gap: '0',
              margin: isMobileMenuOpen ? '1rem 0 0 0' : '0',
              padding: 0,
              listStyle: 'none',
              borderTop: isMobileMenuOpen ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}
          >
            {navLinks.map((v, i) => (
                <li key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Link
                      href={v.href}
                      className={pathname == v.href ? "active" : ""}
                      style={{
                        display: 'block',
                        padding: '0.75rem 0'
                      }}
                    >
                        {v.label}
                    </Link>
                </li>
            ))}
            {isAdminPage && pathname !== "/masuk" && (
              <li style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <button
                  onClick={handleLogout}
                  className="logout-link"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 0'
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
}

export default Header;