import PostList from "../../components/posts/PostList"
import "./home.css"
import { Link } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "../../redux/apiCalls/postApiCall"

const Home = () => {

    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)

    useEffect(() => {
        dispatch(fetchPosts(1))
        window.scrollTo(0, 0)
    }, [])

    return (
        <section className="home">
            {/* 🌟 Modern Typographic Hero Section */}
            <div className="home-hero">
                <div className="home-hero-layout">
                    <h1 className="home-title">Discover. <span>Learn.</span> Share.</h1>
                    <p className="home-subtitle">
                        Dive into a world of insightful articles, tutorials, and stories from our passionate community of writers.
                    </p>
                </div>
            </div>

            <div className="home-latest-post">
                <h2>Latest Posts</h2>
            </div>

            <div className="home-container">
                <PostList posts={posts} />
                <Sidebar />
            </div>

            <div className="home-see-posts-link">
                <Link to="/posts" className="home-link">
                    See All Posts
                </Link>
            </div>
        </section>
    )
}

export default Home