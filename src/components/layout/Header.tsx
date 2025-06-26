import Link from "next/link";

const Header = () => {
    return (
        <header className="site-header">
            <nav className="site-nav">
                <a href="#" className="logo">Satria Aprilian</a>
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
                    <a href="/">English</a>
                </ul>
            </nav>
        </header>
    )
}

export default Header;