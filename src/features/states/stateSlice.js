import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getStates = createAsyncThunk("states", async () => {
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/states`);
    return result.json();
})

const initialState = {
    isLoading: false,
    states: [],
    isError: false,
};

export const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStates.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getStates.fulfilled, (state, action) => {
            state.isLoading = false;
            state.states = action.payload;
        });
        builder.addCase(getStates.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });
    },
});

export default stateSlice.reducer;