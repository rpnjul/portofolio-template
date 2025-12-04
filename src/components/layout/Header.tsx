"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isAdminPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/masuk");

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
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
    ];

    const navLinks = isAdminPage ? adminNavLinks : (isLoggedIn ? publicNavLinksWithDashboard : publicNavLinks);

    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/masuk");
    };

    return (
      <header className="site-header">
        <nav className="site-nav" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1rem',
          overflowX: 'auto',
          flexWrap: 'nowrap'
        }}>
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
          <ul
            className="main-menu"
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              margin: 0,
              padding: 0
            }}
          >
            {navLinks.map((v, i) => (
                <li key={i} style={{ flexShrink: 0 }}>
                    <Link href={v.href} className={pathname == v.href ? "active" : ""}>
                        {v.label}
                    </Link>
                </li>
            ))}
            {isAdminPage && pathname !== "/masuk" && (
              <li style={{ flexShrink: 0 }}>
                <button onClick={handleLogout} className="logout-link">
                  Logout
                </button>
              </li>
            )}
          </ul>
          {!isAdminPage && (
            <ul className="main-menu" style={{display: "none"}}>
              <Link href="/cv.pdf" className="active">
                Download CV
              </Link>
            </ul>
          )}
        </nav>
      </header>
    );
}

export default Header;