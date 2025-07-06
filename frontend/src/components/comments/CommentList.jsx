import { useState } from "react";
import "./commentList.css";
import swal from "sweetalert";
import Moment from "react-moment";
import UpdateCommentModal from "./UpdateCommentModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, toggleLikeComment, addReplyToComment } from "../../redux/apiCalls/commentApiCall";


const CommentList = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)

    const [updateComment, setUpdateComment] = useState(false)
    const [commentForUpdate, setCommentForUpdate] = useState(null)

    // New states for reply
    const [replyingTo, setReplyingTo] = useState(null)
    const [replyText, setReplyText] = useState("")

    const [openReplies, setOpenReplies] = useState({})

    const toggleReplies = (commentId) => {
        setOpenReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }))
    }

    const updateCommentHandler = (comment) => {
        setCommentForUpdate(comment)
        setUpdateComment(true)
    }

    const deleteCommentHandler = (commentId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(deleteComment(commentId))
            }
        })
    }

    // Handle submit reply
    const handleReplySubmit = (commentId, postId) => {
        if (!replyText.trim()) {
            swal("Reply cannot be empty!", "", "error");
            return;
        }
        dispatch(addReplyToComment({ commentId, postId, text: replyText }))
            .then(() => {
                setReplyingTo(null);
                setReplyText("");
            })
            .catch(() => {
                swal("Failed to add reply", "", "error");
            });
    }


    return (
        <div className="comment-list">
            <h4 className="comment-list-count">{comments?.length} Comments</h4>
            {comments?.map((comment) => (
                <div key={comment._id} className="comment-item">

                    {/* Comment info */}
                    <div className="comment-item-info">
                        <div className="comment-item-username">{comment.username}</div>
                        <div className="comment-item-time">
                            <Moment fromNow ago>{comment.createdAt}</Moment> ago
                        </div>
                    </div>

                    <p className="comment-item-text">{comment.text}</p>

                    {/* Reply button */}
                    <button className="reply-button" onClick={() => setReplyingTo(comment._id)}>
                        Reply
                    </button>

                    {/* Reply form */}
                    {replyingTo === comment._id && (
                        <div className="reply-form">
                            <textarea
                                placeholder="Write your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={3}
                            />
                            <div>
                                <button onClick={() => handleReplySubmit(comment._id, comment.postId)}>Submit</button>
                                <button onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText("");
                                }}>Cancel</button>
                            </div>
                        </div>
                    )}

                    {/* Icons for update, delete */}
                    <div className="comment-details-icon-wrapper" style={{ display: "flex", justifyContent: "space-between" }}>
                        {user?._id === (comment.user?._id || comment.user) && (
                            <div className="comment-item-icon-wrapper">
                                <i onClick={() => updateCommentHandler(comment)} className="bi bi-pencil-square"></i>
                                <i onClick={() => deleteCommentHandler(comment._id)} className="bi bi-trash-fill"></i>
                            </div>
                        )}

                        <div className="likes-holder" style={{ display: "flex", alignItems: "center" }}>
                            {user && (
                                <i
                                    onClick={() => dispatch(toggleLikeComment(comment._id))}
                                    className={
                                        comment.likes?.includes(user._id)
                                            ? "bi bi-hand-thumbs-up-fill like-button"
                                            : "bi bi-hand-thumbs-up like-button"
                                    }
                                ></i>
                            )}
                            <span>{comment.likes?.length || 0} Likes</span>
                        </div>
                    </div>

                    {/* Replies */}
                    {/* زر لإظهار أو إخفاء الردود */}
                    {comment.replies?.length > 0 && (
                        <div>
                            <button
                                onClick={() => toggleReplies(comment._id)}
                                className="toggle-replies-btn"
                            >
                                {openReplies[comment._id]
                                    ? "Hide Replies ▲"
                                    : `Show Replies ▼ (${comment.replies.length})`}
                            </button>

                            {/* الردود */}
                            {openReplies[comment._id] && (
                                <div className="replies-wrapper">
                                    {comment.replies.map(reply => (
                                        <div key={reply._id} className="reply-item">
                                            <div className="reply-username">{reply.username}</div>
                                            <div className="reply-time">
                                                <Moment fromNow ago>{reply.createdAt}</Moment> ago
                                            </div>
                                            <p className="reply-text">{reply.text}</p>

                                            {/* أيقونات تعديل وحذف للرد - تظهر فقط لصاحب الرد */}
                                            {user?._id === (reply.user?._id|| reply.user) && (
                                                <div className="comment-item-icon-wrapper">
                                                    <i onClick={() => updateCommentHandler(reply)} className="bi bi-pencil-square"></i>
                                                    <i onClick={() => deleteCommentHandler(reply._id)} className="bi bi-trash-fill"></i>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
            {updateComment && <UpdateCommentModal setUpdateComment={setUpdateComment} commentForUpdate={commentForUpdate} />}
        </div>
    )
}

export default CommentList
