import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                FOOTBALL<span>UNIVERSE</span>
            </Link>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/players">
                    Players
                </Link>

                <Link to="/clubs">
                    Clubs
                </Link>

                <Link to="/competitions">
                    Competitions
                </Link>

                <Link to="/transfers">
                    Transfers
                </Link>

                <Link to="/compare">
                    Compare
                </Link>

                <Link to="/timeline">
                    Timeline
                </Link>

                <Link to="/formations">
                    Formations
                </Link>

                <Link to="/explore">
                    Explore
                </Link>

                <Link to="/analytics">Analytics</Link>

            </div>

        </nav>
    );
}

export default Navbar;