import React, { useMemo, useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import toast from 'react-hot-toast';

import { useSelector, useDispatch } from 'react-redux';
import { deletePartyType, editPartyType, updatePartyType, getPartyTypes, savePartyType, cancelEditPartyType } from '../features/partyType/partyTypeSlice';

function PartyType() {

    const dispatch = useDispatch();

    //optionally, you can manage any/all of the table state yourself
    const [rowSelection, setRowSelection] = useState({});
    useEffect(() => {
        dispatch(getPartyTypes())
    }, [rowSelection]);

    const editPartyTypeValue = useSelector(state => state.partyType.editPartyTypeValue);
    const isEdit = useSelector(state => state.partyType.isEdit);

    let data = useSelector(state => state.partyType.partyTypes);
    if (data?.data !== undefined) {
        data = data.data;
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //simple recommended way to define a column
                header: 'Name',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
            },
            {
                accessorKey: "_id", //alternate way
                id: 'action', //id required if you use accessorFn instead of accessorKey
                header: 'Action',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) =>
                    <div className='flex gap-2'>
                        <button className='flex items-center gap-1 px-3 py-1 rounded text-white bg-[#333564]' onClick={() => dispatch(editPartyType(cell.getValue()))}>
                            <EditIcon className='!text-base -mt-[2px]' />
                            <span>Edit</span>
                        </button>
                        {/* <button className='flex items-center gap-1 px-3 py-1 rounded text-white bg-[#d72424]' onClick={() => dispatch(deletePartyType(cell.getValue()))}>
                            <DeleteForeverIcon className='!text-base -mt-[2px]' />
                            <span>Delete</span>
                        </button> */}
                    </div>, //optional custom cell render
                // Header: () => <i>Age</i>, //optional custom header render
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnOrdering: true, //enable some features
        enableRowSelection: false, //disable some features
        enablePagination: true, //enable a default feature
        onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
        state: { rowSelection }, //manage your own state, pass it back to the table (optional)
    });

    const someEventHandler = () => {
        //read the table state during an event from the table instance
        console.log(table.getState().sorting);
    };

    const submitPartyTypeHandler = async (event) => {
        event.preventDefault();

        let data = event.target;
        data = new FormData(data);
        data = Object.fromEntries(data.entries());

        Object.keys(data).forEach(k => data[k] = data[k].trim());

        isEdit
            ?
            dispatch(updatePartyType(data))
            :
            dispatch(savePartyType(data))

        toast.success('Saved Successfully!');

        event.target.reset();
    }

    return (
        <>
            <Breadcrumb name="Party Type" />
            <div className='bg-white w-full flex gap-10 px-5 py-5 rounded-lg shadow'>
                <div className='w-3/5'>
                    <MaterialReactTable table={table} /> {/* other more lightweight MRT sub components also available */}
                </div>
                <div className='w-2/5 p-4 h-fit rounded shadow-[0_0_4px_1px_rgba(0,0,0,0.1)]'>
                    <form onSubmit={submitPartyTypeHandler}>
                        <div className='w-full mb-3'>
                            <label className='text-sm'>Party Type Name*</label>
                            <input
                                type="text"
                                name='name'
                                defaultValue={editPartyTypeValue}
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Party Type Name'
                                required
                            />
                        </div>
                        <div className='w-full flex mb-3 justify-end'>
                            {
                                isEdit
                                    ?
                                    <button type='button' className='flex items-center gap-1 px-3 py-2 mr-2 text-sm rounded text-white bg-[#dcab2d]' onClick={() => dispatch(cancelEditPartyType())}>
                                        <ClearIcon className='!text-base' />
                                        <span>Cancel</span>
                                    </button>
                                    :
                                    ''
                            }
                            <button type='submit' className='flex items-center gap-1 px-5 py-2 text-sm rounded text-white bg-[#333564]'>
                                <SaveIcon className='!text-base' />
                                {
                                    isEdit
                                        ?
                                        <span>Update</span>
                                        :
                                        <span>Save</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PartyType