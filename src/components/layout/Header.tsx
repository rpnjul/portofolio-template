import Link from "next/link";

const Header = () => {
    return (
        <header className="site-header">
            <nav className="site-nav">
                <a href="#" className="logo">Satria Aprilian</a>
                <ul className="main-menu">
                    <li>
                        <Link href="#" className="active">About</Link>
                    </li>
                    <li>
                        <Link href="#">Posts</Link>
                    </li>
                    <li>
                        <Link href="#">Works</Link>
                    </li>
                    <li>
                        <Link href="#">Projects</Link>
                    </li>
                    <li>
                        <Link href="#">Contact Me</Link>
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