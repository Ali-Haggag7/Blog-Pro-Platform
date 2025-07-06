import { createSlice } from "@reduxjs/toolkit"

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
    },
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload  // dispatchده هو البيانات اللي ببعتها مع الاكشن بال payloadال
        },
        addCategory(state, action) {
            state.categories.push(action.payload)
        },
        deleteCategory(state, action) {
            state.categories = state.categories.filter(c => c._id !== action.payload)
        },
    }
})

const categoryReducer = categorySlice.reducer  // storeعشان نسجله فال
const categoryActions = categorySlice.actions  // dispatchعشان نستخدمه فال

export { categoryActions, categoryReducer }