import Link from "next/link";

const Header = () => {
    return (
        <header className="site-header">
            <nav className="site-nav">
                <Link href="/" className="logo">Satria Aprilian</Link>
                <ul className="main-menu">
                    <li>
                        <Link href="/about" className="active">About</Link>
                    </li>
                    <li>
                        <Link href="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link href="/works">Works</Link>
                    </li>
                    <li>
                        <Link href="/projects">Projects</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact Me</Link>
                    </li>
                </ul>
                <ul className="main-menu">
                    <Link href="/">English</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header;