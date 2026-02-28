import "./sidebar.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall"

const Sidebar = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.category)

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar-header" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="sidebar-title">CATEGORIES</h5>
                <i className={`bi bi-chevron-down sidebar-toggle-icon ${isOpen ? "open" : ""}`}></i>
            </div>

            <ul className={`sidebar-links ${isOpen ? "show" : ""}`}>
                {categories.map((category) => (
                    <Link
                        className="sidebar-link"
                        key={category._id}
                        to={`/posts/categories/${category.title}`}
                        onClick={() => setIsOpen(false)}
                    >
                        {category.title}
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar