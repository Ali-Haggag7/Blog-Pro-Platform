import PostItem from "./PostItem"
import "./posts.css";

const PostList = ({ posts }) => {
    return (
        <div className="post-list">
            {posts.length > 0 ? (
                posts.map(item => <PostItem post={item} key={item._id} />)
            ) : (
                <div className="no-posts-found">
                    <i className="bi bi-stickies"></i>
                    <h3>No Posts Found</h3>
                    <p>There are no posts available right now. Check back later!</p>
                </div>
            )}
        </div>
    )
}

export default PostList