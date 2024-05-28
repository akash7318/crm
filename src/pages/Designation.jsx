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
import { deleteDesignation, editDesignation, updateDesignation, getDesignations, saveDesignation, cancelEditDesignation } from '../features/designation/designationSlice';

function Designation() {

    const dispatch = useDispatch();

    //optionally, you can manage any/all of the table state yourself
    const [rowSelection, setRowSelection] = useState({});
    useEffect(() => {
        dispatch(getDesignations())
    }, [rowSelection]);

    const editDesignationValue = useSelector(state => state.designation.editDesignationValue);
    const isEdit = useSelector(state => state.designation.isEdit);

    let data = useSelector(state => state.designation.designations);
    if (data?.data !== undefined) {
        data = data.data;
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'designation', //simple recommended way to define a column
                header: 'Designation',
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
                        <button className='flex items-center gap-1 px-3 py-1 rounded text-white bg-[#333564]' onClick={() => dispatch(editDesignation(cell.getValue()))}>
                            <EditIcon className='!text-base -mt-[2px]' />
                            <span>Edit</span>
                        </button>
                        {/* <button className='flex items-center gap-1 px-3 py-1 rounded text-white bg-[#d72424]' onClick={() => dispatch(deleteDesignation(cell.getValue()))}>
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

    const submitDesignationHandler = async (event) => {
        event.preventDefault();

        let data = event.target;
        data = new FormData(data);
        data = Object.fromEntries(data.entries());

        Object.keys(data).forEach(k => data[k] = data[k].trim());

        isEdit
            ?
            dispatch(updateDesignation(data))
            :
            dispatch(saveDesignation(data))

        toast.success('Saved Successfully!');

        event.target.reset();
    }

    return (
        <>
            <Breadcrumb name="Designation" />
            <div className='bg-white w-full flex gap-10 px-5 py-5 rounded-lg shadow'>
                <div className='w-3/5'>
                    <MaterialReactTable table={table} /> {/* other more lightweight MRT sub components also available */}
                </div>
                <div className='w-2/5 p-4 h-fit rounded shadow-[0_0_4px_1px_rgba(0,0,0,0.1)]'>
                    <form onSubmit={submitDesignationHandler}>
                        <div className='w-full mb-3'>
                            <label className='text-sm'>Designation Name*</label>
                            <input
                                type="text"
                                name='designation'
                                defaultValue={editDesignationValue}
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Designation Name'
                                required
                            />
                        </div>
                        <div className='w-full flex mb-3 justify-end'>
                            {
                                isEdit
                                    ?
                                    <button type='button' className='flex items-center gap-1 px-3 py-2 mr-2 text-sm rounded text-white bg-[#dcab2d]' onClick={() => dispatch(cancelEditDesignation())}>
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

export default Designation