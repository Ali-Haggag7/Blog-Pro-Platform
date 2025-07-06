import { createSlice } from "@reduxjs/toolkit"

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        replies: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setComments(state, action) {
            state.comments = action.payload
        },
        addComment: (state, action) => {
            const newComment = action.payload
            if (newComment.parentComment) {
                state.replies.unshift(newComment)
            } else {
                state.comments.unshift(newComment)
            }
        },
        setLikeOnComment: (state, action) => {
            const updatedComment = action.payload;
            const index = state.comments.findIndex(c => c._id === updatedComment._id)
            if (index !== -1) {
                // فقط تحديث اللايك والحقول اللي تغيرت بدون تغيير ترتيب أو حذف
                state.comments[index] = {
                    ...state.comments[index],
                    likes: updatedComment.likes,
                }
            }
        },
        deleteComment(state, action) {
            const deletedId = action.payload;
            state.comments = state.comments.filter(c => c._id !== deletedId)
            // احذف الردود التابعة
            state.comments.forEach(comment => {
                if (comment.replies) {
                    comment.replies = comment.replies.filter(reply => reply._id !== deletedId)
                }
            })
        },
        startLoading: (state) => {
            state.isLoading = true
            state.error = null
        },
        hasError: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        addReplySuccess: (state, action) => {
            state.isLoading = false;
            const { commentId, reply } = action.payload;
            const comment = state.comments.find(c => c._id === commentId);
            if (comment) {
                if (!comment.replies) {
                    comment.replies = [];
                }
                comment.replies.unshift(reply); // ضيف الرد كامل كما استلمته من السيرفر
            }
        },
        updateCommentSuccess: (state, action) => {
            const updatedComment = action.payload
            if (updatedComment.parentComment) {
                // الرد فرعي
                const parentComment = state.comments.find(c => c._id === updatedComment.parentComment)
                if (parentComment && parentComment.replies) {
                    const replyIndex = parentComment.replies.findIndex(r => r._id === updatedComment._id)
                    if (replyIndex !== -1) {
                        parentComment.replies[replyIndex] = {
                            ...parentComment.replies[replyIndex],
                            ...updatedComment,
                        }
                    }
                }
            } else {
                // كومنت رئيسي
                const index = state.comments.findIndex(c => c._id === updatedComment._id)
                if (index !== -1) {
                    state.comments[index] = {
                        ...state.comments[index],
                        ...updatedComment,
                    }
                }
            }
            state.isLoading = false
        },
    }
})

const commentReducer = commentSlice.reducer
const commentActions = commentSlice.actions

export { commentActions, commentReducer }