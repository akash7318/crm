import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users", async () => {
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/users`);
    return result.json();
});

export const getUser = createAsyncThunk("user", async (_id) => {
    let result = await fetch(`${import.meta.env.VITE_BASE_URL}api/users/${_id}`)
    return result.json();
});

function removeUser(_id) {
    fetch(`${import.meta.env.VITE_BASE_URL}api/users/${_id}`,
        { method: 'DELETE' }
    );
}

const initialState = {
    isLoading: false,
    users: [],
    user: {},
    isError: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData: (state, action) => {
            state.user = action.payload;
        },
        removeUserStateData: (state, action) => {
            state.user = {};
        },
        deleteUser: (state, action) => {
            if (confirm('Are you sure you want to delete')) {
                removeUser(action.payload);
                state.users.data = state.users.data.filter((user) => user._id !== action.payload)
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });

        builder.addCase(getUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });
    },
});

export const { removeUserStateData, addUserData, deleteUser } = userSlice.actions;

export default userSlice.reducer;