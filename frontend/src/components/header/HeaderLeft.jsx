import { Link } from "react-router-dom";

const HeaderLeft = ({ toggle, setToggle }) => {
    return (
        <div className="header-left">
            {/* Wrapped logo in a Link for better UX to navigate home */}
            <Link to="/" className="header-logo" onClick={() => setToggle(false)}>
                <strong>BLOG</strong>
                <i className="bi bi-pencil"></i>
            </Link>

            {/* Mobile menu toggle */}
            <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
                {toggle ? (<i className="bi bi-x-lg"></i>) : (<i className="bi bi-list"></i>)}
            </div>
        </div>
    );
};

export default HeaderLeft;