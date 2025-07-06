import { postActions } from "../slices/postSlice"
import { commentActions } from "../slices/commentSlice"
import request from "../../utils/request"
import { toast } from "react-toastify"

// Create Comment
export function createComment(newComment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/comments", newComment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            });
            // نحدث تعليق جديد في commentSlice مش postSlice
            dispatch(commentActions.addComment(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
}


// Update Comment
export function updateComment(commentId, comment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(
                `/api/comments/${commentId}`,
                comment,
                {
                    headers: {
                        Authorization: "Bearer " + getState().auth.user.token,
                    },
                }
            )
            dispatch(commentActions.updateCommentSuccess(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Delete Comment
export function deleteComment(commentId) {
    return async (dispatch, getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            })
            dispatch(commentActions.deleteComment(commentId))
            dispatch(postActions.deleteCommentFromPost(commentId))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}

// Fetch All Comments
export function fetchAllComments() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/comments`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            })
            dispatch(commentActions.setComments(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Toggle Like Comment
export function toggleLikeComment(commentId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/comments/like/${commentId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(commentActions.setLikeOnComment(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// fetch Comments For Post
export function fetchPostComments(postId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/comments/post/${postId}`)
            dispatch(commentActions.setComments(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}


// في src/redux/apiCalls/commentApiCall.js


export function addReplyToComment(replyData) {
    return async (dispatch, getState) => {
        try {
            dispatch(commentActions.startLoading());
            const { commentId, postId, text } = replyData;

            const { data } = await request.post(`/api/comments`, {
                postId,
                text,
                parentComment: commentId,
            }, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                },
            });

            // تأكد إن البيانات اللي راجعة تحتوي user، لو مش موجود أضفه من ال state
            if (!data.user) {
                const authUser = getState().auth.user;
                data.user = {
                    _id: authUser._id,
                    username: authUser.username,
                };
            }

            dispatch(commentActions.addReplySuccess({ commentId, reply: data }));
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
}
