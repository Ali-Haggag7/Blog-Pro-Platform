import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("userInfo") ?  // value
            JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMessage: null,
        isEmailVerified: false,
    },
    reducers: {
        login(state, action) {  // set value
            state.user = action.payload  // ده payloadالبيانات اللي هناخدها من السيرفر تكون فال
            state.registerMessage = null
        },
        logout(state) {  // set value
            state.user = null  // ده payloadالبيانات اللي هناخدها من السيرفر تكون فال
        },
        register(state, action) {
            state.registerMessage = action.payload
        },
        setUserPhoto(state, action) {
            state.user.profilePhoto = action.payload
        },
        setUsername(state, action) {
            state.user.username = action.payload
        },
        setIsEmailVerified(state) {
            state.isEmailVerified = true
            state.registerMessage = null
        }
    }
})

const authReducer = authSlice.reducer
const authActions = authSlice.actions

export { authActions, authReducer }