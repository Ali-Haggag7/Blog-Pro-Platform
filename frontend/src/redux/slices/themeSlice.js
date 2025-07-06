// redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: localStorage.getItem("theme") || "light",
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.mode);
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem("theme", action.payload);
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
