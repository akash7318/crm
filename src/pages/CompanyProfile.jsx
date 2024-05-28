import React, { useMemo, useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from 'react-hot-toast';
import { deleteUser, getUsers } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCompanyProfiles } from '../features/companyProfile/companyProfileSlice';

function Employees() {

    //optionally, you can manage any/all of the table state yourself
    const [rowSelection, setRowSelection] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCompanyProfiles())
        //do something when the row selection changes
    }, [rowSelection]);

    let data = useSelector(state => state.companyProfile.companyProfiles);
    if (data?.data !== undefined) {
        data = data.data;
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //simple recommended way to define a column
                header: 'Company Name',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <>
                    <p className='text-ellipsis overflow-hidden max-w-60 line-clamp-2'>{cell.getValue()}</p>
                </>, //optional custom cell render
            },
            {
                accessorFn: (row) => row.clientName, //alternate way
                id: 'clientName', //id required if you use accessorFn instead of accessorKey
                header: 'Client Name',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <p className='text-ellipsis overflow-hidden max-w-60 line-clamp-2'>{cell.getValue()}</p>, //optional custom cell render
                // Header: () => <i>Age</i>, //optional custom header render
            },
            {
                accessorFn: (row) => row.createdAt, //alternate way
                id: 'createdAt', //id required if you use accessorFn instead of accessorKey
                header: 'Added On',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <span>{`${new Date(cell.getValue()).getDate()} ${months[new Date(cell.getValue()).getMonth()]} ${new Date(cell.getValue()).getFullYear()}`}</span>, //optional custom cell render
                // Header: () => <i>Company</i>, //optional custom header render
            },
            {
                accessorFn: (row) => row, //alternate way
                id: 'userName', //id required if you use accessorFn instead of accessorKey
                header: 'Added By',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <div>
                    <p>{cell.getValue().userName}</p>
                    <p className='text-[10px] text-gray-400'>{cell.getValue().designation ? "(" + cell.getValue().designation + ")" : ''}</p>
                </div>, //optional custom cell render
                // Header: () => <i>Company</i>, //optional custom header render
            },
            {
                accessorFn: (row) => row, //alternate way
                id: 'shiftTo', //id required if you use accessorFn instead of accessorKey
                header: 'Shifted To',
                muiTableHeadCellProps: { sx: { color: '#333564' } }, //optional custom props
                Cell: ({ cell }) => <div>
                    <p>{cell.getValue().shiftTo}</p>
                    <p className='text-xs text-gray-400'>{cell.getValue().shiftToDesignation ? "(" + cell.getValue().shiftToDesignation + ")" : ''}</p>
                </div>, //optional custom cell render
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

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv);
    };


    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnOrdering: true, //enable some features
        enableRowSelection: true, //enable row selection for rows
        enablePagination: true, //enable a default feature
        enableRowNumbers: true, //enable a default feature
        enableColumnPinning: true, //enable a default feature
        enableExpanding: true, //enable a default feature
        // columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    onClick={handleExportData}
                    startIcon={<FileDownloadIcon />}
                >
                    Export All Data
                </Button>
                <Button
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() =>
                        handleExportRows(table.getPrePaginationRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                >
                    Export All Rows
                </Button>
                <Button
                    disabled={table.getRowModel().rows.length === 0}
                    //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    Export Page Rows
                </Button>
                <Button
                    disabled={
                        !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                    }
                    //only export selected rows
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    Export Selected Rows
                </Button>
            </Box>
        ),
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === 'dark'
                        ? 'rgba(255,210,244,0.1)'
                        : 'rgba(0,0,0,0.05)',
            }),
        }),
        //custom expand button rotation
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
            sx: {
                transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s',
            },
        }),
        //conditionally render detail panel
        renderDetailPanel: ({ row }) =>
            row.original.name ? (
                <div className='px-10'>
                    <span className='text-xl'>Company Name </span><span className='text-[#333564]'>({row.original.name})</span>
                    <hr className='border-2' />
                    <div className='flex justify-between'>
                        <div className='mt-4'>
                            <div className='mb-4'>
                                <span>Client Name: </span>
                                <span className='text-[#333564]'>{row.original.clientName}</span>
                                <div className='border-b border-dashed border-2 border-b-[#333564]'></div>
                            </div>
                            <div>
                                <span>Added On: </span>
                                <span className='text-[#333564]'>{row.original.addedOn}</span>
                                <div className='border-b border-dashed border-2 border-b-[#333564]'></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null,
        // getSubRows: (originalRow) => originalRow.subRows,
        // onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
        // state: { rowSelection }, //manage your own state, pass it back to the table (optional)
    });

    const someEventHandler = () => {
        //read the table state during an event from the table instance
        console.log(table.getState().sorting);
    };

    return (
        <>
            <Breadcrumb name="Company Profiles List" linkName="Add Company Profile" link="/companyProfiles/data" />
            <div className='bg-white w-full px-5 py-3 rounded-lg shadow'>
                <div className='my-3'>
                    <MaterialReactTable table={table} /> {/* other more lightweight MRT sub components also available */}
                </div>
            </div>
        </>
    )
}

export default Employees