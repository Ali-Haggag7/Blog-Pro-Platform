import AdminSidebar from "./AdminSidebar"
import { Link } from "react-router-dom"
import "./adminTable.css"
import swal from "sweetalert"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall"

const CategoriesTable = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const deleteCategoryHandler = (categoryId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(deleteCategory(categoryId))
            }
        })
    }

    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">
                    <Link to="/admin-dashboard" className="table-back-btn">
                        <i className="bi bi-arrow-left"></i>
                    </Link>
                    Categories
                </h1>
                {categories.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Count</th>
                                <th>Category Title</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td><b>{item.title}</b></td>
                                    <td>
                                        <div className="table-button-group">
                                            <button onClick={() => deleteCategoryHandler(item._id)}>Delete Category</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-posts-found">
                        <i className="bi bi-tags"></i>
                        <h3>No Categories Found</h3>
                        <p>There are no categories available right now. Please add some.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
export default CategoriesTable;