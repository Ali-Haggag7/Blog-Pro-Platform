import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../../redux/slices/themeSlice"

const Navbar = ({ toggle, setToggle }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { mode } = useSelector(state => state.theme)

    // Toggle Theme Handler
    const handleToggleTheme = () => {
        dispatch(toggleTheme())
    }

    return (
        <nav className={`navbar ${toggle ? "show" : ""}`}>
            <ul className="nav-links">
                <Link to="/" onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-house"></i> Home
                </Link>
                <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
                    <i className="bi bi-stickies"></i> Posts
                </Link>
                {
                    user && (
                        <Link to="/posts/create-post" onClick={() => setToggle(false)} className="nav-link">
                            <i className="bi bi-journal-plus"></i> Create
                        </Link>
                    )
                }
                {
                    user?.isAdmin && (
                        <Link to="/admin-dashboard" onClick={() => setToggle(false)} className="nav-link">
                            <i className="bi bi-person-check"></i> Admin Dashboard
                        </Link>
                    )
                }

                {/* Theme Toggle Button */}
                <li onClick={handleToggleTheme} className="nav-link theme-toggle" style={{ cursor: "pointer" }}>
                    {
                        mode === "light" ? (
                            <>
                                <i className="bi bi-moon-stars-fill"></i> Dark Mode
                            </>
                        ) : (
                            <>
                                <i className="bi bi-sun-fill"></i> Light Mode
                            </>
                        )
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Navbar