import React, { useMemo, useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from 'react-hot-toast';
import { deleteUser, getUsers } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Employees() {

    //optionally, you can manage any/all of the table state yourself
    const [rowSelection, setRowSelection] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers())
        //do something when the row selection changes
    }, [rowSelection]);

    let data = useSelector(state => state.users.users);
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
                accessorFn: (row) => row.designation, //alternate way
                id: 'designation', //id required if you use accessorFn instead of accessorKey
                header: 'Designation',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
                // Header: () => <i>Age</i>, //optional custom header render
            },
            {
                accessorFn: (row) => row.joiningDate, //alternate way
                id: 'joininDate', //id required if you use accessorFn instead of accessorKey
                header: 'Joinin Date',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
                // Header: () => <i>Company</i>, //optional custom header render
            },
            {
                accessorKey: '_id', //alternate way
                id: 'action', //id required if you use accessorFn instead of accessorKey
                header: 'Action',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <div className='flex gap-2'>
                    <Link to={`/employees/data/${cell.getValue()}`} className='flex items-center gap-1 px-3 py-1 rounded text-white bg-[#333564]' >
                        <EditIcon className='!text-base -mt-[2px]' />
                        <span>Edit</span>
                    </Link>
                    {/* <button className='flex items-center gap-1 px-3 py-1 rounded text-white bg-[#d72424]' onClick={() => dispatch(deleteUser(cell.getValue()))}>
                        <DeleteForeverIcon className='!text-base -mt-[2px]' />
                        <span>Delete</span>
                    </button> */}
                </div>, //optional custom cell render
                // Header: () => <i>Company</i>, //optional custom header render
            },
        ],
        [],
    );


    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnOrdering: true, //enable some features
        enableRowSelection: false, //enable row selection for rows
        enablePagination: true, //enable a default feature
        onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
        state: { rowSelection }, //manage your own state, pass it back to the table (optional)
        export: true, //enable export mode for export
    });

    const someEventHandler = () => {
        //read the table state during an event from the table instance
        console.log(table.getState().sorting);
    };

    return (
        <>
            <Breadcrumb name="Employee List" linkName="Add Employee" link="/employees/data" />
            <div className='bg-white w-full px-5 py-3 rounded-lg shadow'>
                <div className='my-3'>
                    <MaterialReactTable table={table} /> {/* other more lightweight MRT sub components also available */}
                </div>
            </div>
        </>
    )
}

export default Employees