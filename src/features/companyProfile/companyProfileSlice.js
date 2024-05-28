import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCompanyProfiles = createAsyncThunk("companyProfiles", async () => {
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/companyProfiles`);
    return result.json();
});

export const getCompanyProfile = createAsyncThunk("companyProfile", async (_id) => {
    let result = await fetch(`${import.meta.env.VITE_BASE_URL}api/companyProfiles/${_id}`)
    return result.json();
});

function removeCompanyProfile(_id) {
    fetch(`${import.meta.env.VITE_BASE_URL}api/companyProfiles/${_id}`,
        { method: 'DELETE' }
    );
}

const initialState = {
    isLoading: false,
    companyProfiles: [],
    companyProfile: {},
    isError: false,
};

export const companyProfileSlice = createSlice({
    name: 'companyProfile',
    initialState,
    reducers: {
        addCompanyProfileData: (state, action) => {
            state.companyProfile = action.payload;
        },
        removeCompanyProfileStateData: (state, action) => {
            state.companyProfile = {};
        },
        deleteCompanyProfile: (state, action) => {
            if (confirm('Are you sure you want to delete')) {
                removeCompanyProfile(action.payload);
                state.companyProfiles.data = state.companyProfiles.data.filter((companyProfile) => companyProfile._id !== action.payload)
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCompanyProfiles.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getCompanyProfiles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.companyProfiles = action.payload;
        });
        builder.addCase(getCompanyProfiles.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });

        builder.addCase(getCompanyProfile.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getCompanyProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.companyProfile = action.payload;
        });
        builder.addCase(getCompanyProfile.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });
    },
});

export const { removeCompanyProfileStateData, addCompanyProfileData, deleteCompanyProfile } = companyProfileSlice.actions;

export default companyProfileSlice.reducer;