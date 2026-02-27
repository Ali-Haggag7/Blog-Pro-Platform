import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { logoutUser } from "../../redux/apiCalls/authApiCalls"

const HeaderRight = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [dropdown, setDropdown] = useState(false)

    // Logout Handler
    const logoutHandler = () => {
        setDropdown(false)
        dispatch(logoutUser())
    }

    return (
        <div className="header-right">
            {user ? (
                <>
                    <div className="header-right-user-info">
                        <span className="header-right-username" onClick={() => setDropdown(prev => !prev)}>
                            {user?.username}
                        </span>

                        {/* Added onClick to the image for better UX */}
                        <img
                            src={user?.profilePhoto.url}
                            alt="user photo"
                            className="header-right-user-photo"
                            onClick={() => setDropdown(prev => !prev)}
                        />

                        {/* Replaced conditional rendering with the .active class for smooth CSS animation */}
                        <div className={`header-right-dropdown ${dropdown ? 'show' : ''}`}>
                            <Link to={`/profile/${user?._id}`} className="header-dropdown-item" onClick={() => setDropdown(false)}>
                                <i className="bi bi-file-person"></i>
                                <span>Profile</span>
                            </Link>
                            <div onClick={logoutHandler} className="header-dropdown-item">
                                <i className="bi bi-box-arrow-in-left"></i>
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link to="login" className="header-right-link">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Login</span>
                    </Link>
                    <Link to="register" className="header-right-link">
                        <i className="bi bi-person-plus"></i>
                        <span>Register</span>
                    </Link>
                </>
            )
            }
        </div>
    )
}

export default HeaderRight