import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPartyTypes = createAsyncThunk("getPartyTypes", async () => {
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/partyTypes`);
    return result.json();
})

export const savePartyType = createAsyncThunk("savePartyType", async (data) => {
    const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/partyTypes`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
        }
    );
    return result.json();
})

function updatePartyTypeInDB(_id, data) {
    fetch(`${import.meta.env.VITE_BASE_URL}api/partyTypes/${_id}`,
        {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        }
    );
}

function removePartyType(_id) {
    fetch(`${import.meta.env.VITE_BASE_URL}api/partyTypes/${_id}`,
        { method: 'DELETE' }
    );
}

const initialState = {
    isLoading: false,
    partyTypes: [],
    editPartyTypeValue: '',
    editPartyTypeId: '',
    isEdit: false,
    isError: false,
};

export const partyTypeSlice = createSlice({
    name: 'partyType',
    initialState,
    reducers: {
        // addPartyType: (state, action) => {
        //     const partyType = action.payload;
        //     state.partyTypes.data.push(partyType);
        // },
        editPartyType: (state, action) => {
            const editPartyType = state.partyTypes.data.filter((partyType) => partyType._id === action.payload)
            state.editPartyTypeValue = editPartyType[0].name;
            state.editPartyTypeId = editPartyType[0]._id;
            state.isEdit = true;
        },
        updatePartyType: (state, action) => {
            state.partyTypes.data = state.partyTypes.data.map(partyType => {
                if (partyType._id === state.editPartyTypeId) {
                    return { ...partyType, name: action.payload.name }
                }
                return partyType;
            });

            updatePartyTypeInDB(state.editPartyTypeId, action.payload);

            state.editPartyTypeValue = '';
            state.editPartyTypeId = '';
            state.isEdit = false;
        },
        deletePartyType: (state, action) => {
            if (confirm('Are you sure you want to delete')) {
                removePartyType(action.payload);
                state.partyTypes.data = state.partyTypes.data.filter((partyType) => partyType._id !== action.payload)
            }
        },
        cancelEditPartyType: (state, action) => {
            state.editPartyTypeId = '';
            state.editPartyTypeValue = '';
            state.isEdit = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPartyTypes.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPartyTypes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.partyTypes = action.payload;
        });
        builder.addCase(getPartyTypes.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });

        builder.addCase(savePartyType.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(savePartyType.fulfilled, (state, action) => {
            state.isLoading = false;
            state.partyTypes.data.push(action.payload.data);
        });
        builder.addCase(savePartyType.rejected, (state, action) => {
            console.log("Error ", action.payload);
            state.isError = true;
        });
    },
});

export const { deletePartyType, editPartyType, cancelEditPartyType, updatePartyType } = partyTypeSlice.actions;

export default partyTypeSlice.reducer;