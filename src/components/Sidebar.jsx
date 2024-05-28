import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import GroupsIcon from '@mui/icons-material/Groups';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import HandshakeIcon from '@mui/icons-material/Handshake';

function Sidebar() {
    const location = useLocation();

    const links = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: <DashboardIcon />,
            addClass: location.pathname === "/dashboard" ? "active" : ''
        },
        {
            name: 'Employees',
            link: '/employees',
            icon: <GroupsIcon />,
            addClass: location.pathname === "/employees" ? "active" : ''
        },
        {
            name: 'Designation',
            link: '/designations',
            icon: <CardTravelIcon />,
            addClass: location.pathname === "/designations" ? "active" : ''
        },
        {
            name: 'Party Types',
            link: '/partyTypes',
            icon: <HandshakeIcon />,
            addClass: location.pathname === "/partyTypes" ? "active" : ''
        },
        {
            name: 'Company Profile',
            link: '/companyProfiles',
            icon: <AddBusinessIcon />,
            addClass: location.pathname === "/companyProfiles" ? "active" : ''
        },
    ];

    return (
        <div className='w-full h-full p-2'>
            {
                links.map((value, index) =>
                    <Link
                        key={index}
                        to={value.link}
                        className={`${value.addClass} flex gap-2 items-center p-2 mb-2 text-sm text-white rounded transition hover:bg-[#ffffff1f]`}
                    >
                        {value.icon}
                        <span>{value.name}</span>
                    </Link>
                )
            }
        </div>
    )
}

export default Sidebar