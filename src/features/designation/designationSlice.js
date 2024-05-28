import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDesignations = createAsyncThunk("designations", async () => {
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/designations`);
    return result.json();
})

export const saveDesignation = createAsyncThunk("saveDesignations", async (data) => {
    const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/designations`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        }
    );
    return result.json();
})

function updateDesignationInDB(_id, data) {
    fetch(`${import.meta.env.VITE_BASE_URL}api/designations/${_id}`,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        }
    );
}

function removeDesignation(_id) {
    fetch(`${import.meta.env.VITE_BASE_URL}api/designations/${_id}`,
        { method: 'DELETE' }
    );
}

const initialState = {
    isLoading: false,
    designations: [],
    editDesignationValue: '',
    editDesignationId: '',
    isEdit: false,
    isError: false,
};

export const designationSlice = createSlice({
    name: 'designation',
    initialState,
    reducers: {
        // addDesignation: (state, action) => {
        //     const designation = action.payload;
        //     state.designations.data.push(designation);
        // },
        editDesignation: (state, action) => {
            const editDesignation = state.designations.data.filter((designation) => designation._id === action.payload)
            state.editDesignationValue = editDesignation[0].designation;
            state.editDesignationId = editDesignation[0]._id;
            state.isEdit = true;
        },
        updateDesignation: (state, action) => {
            state.designations.data = state.designations.data.map(designation => {
                if (designation._id === state.editDesignationId) {
                    return { ...designation, designation: action.payload.designation }
                }
                return designation;
            });

            updateDesignationInDB(state.editDesignationId, action.payload);

            state.editDesignationValue = '';
            state.editDesignationId = '';
            state.isEdit = false;
        },
        deleteDesignation: (state, action) => {
            if (confirm('Are you sure you want to delete')) {
                removeDesignation(action.payload);
                state.designations.data = state.designations.data.filter((designation) => designation._id !== action.payload)
            }
        },
        cancelEditDesignation: (state, action) => {
            state.editDesignationId = '';
            state.editDesignationValue = '';
            state.isEdit = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDesignations.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getDesignations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.designations = action.payload;
        });
        builder.addCase(getDesignations.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });

        builder.addCase(saveDesignation.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(saveDesignation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.designations.data.push(action.payload.data);
        });
        builder.addCase(saveDesignation.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });
    },
});

export const { deleteDesignation, editDesignation, cancelEditDesignation, updateDesignation } = designationSlice.actions;

export default designationSlice.reducer;