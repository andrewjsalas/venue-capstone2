import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false, userId: null, userName: null },
    reducers: {
        signin(state, action) {
            state.isLoggedIn = true;
            state.userId = localStorage.getItem('userId');
            state.userName = localStorage.getItem('userName');
        },
        logout(state) {
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            state.isLoggedIn = false;
            state.userId = null;
            state.userName = null;
        }
    }
});

export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: authSlice.reducer,
});
