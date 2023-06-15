import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create slice for auth state
const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false, userId: null, userName: null },
    reducers: {
        // Reducer to handle the signin action
        signin(state, action) {
            state.isLoggedIn = true;
            state.userId = localStorage.getItem('userId');
            state.userName = localStorage.getItem('userName');
        },
        // Reducer to handle logout action
        logout(state) {
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            state.isLoggedIn = false;
            state.userId = null;
            state.userName = null;
        }
    }
});

// Export auth actions
export const authActions = authSlice.actions;

// Configure the Redux store with the auth slice as the reducer
export const store = configureStore({
    reducer: authSlice.reducer,
});
