"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    const navLinks = [
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/posts", label: "Posts" },
      { href: "/contact", label: "Contact" },
    ];
    return (
      <header className="site-header">
        <nav className="site-nav">
          <Link href="/" className="logo">
            Satria Aprilian
          </Link>
          <ul className="main-menu">
            {navLinks.map((v, i) => (
                <li key={i}>
                    <Link href={v.href} className={pathname == v.href ? "active" : ""}>
                        {v.label}
                    </Link>
                </li>
            ))}
          </ul>
          <ul className="main-menu" style={{display: "none"}}>
            <Link href="/cv.pdf" className="active">
              Download CV
            </Link>
          </ul>
        </nav>
      </header>
    );
}

export default Header;