import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        userName: "",
        userId: "",
        userEmail: "",
        userImg: "",
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userName = action.payload.userName;
            state.userId = action.payload.userId;
            state.userEmail = action.payload.userEmail;
            state.userImg = action.payload.userImg;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userName = "";
            state.userId = "";
            state.userEmail = "";
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;