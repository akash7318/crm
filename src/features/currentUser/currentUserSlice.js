import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    currentUser: localStorage.getItem('user'),
    isError: false,
};

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
});

export default currentUserSlice.reducer;