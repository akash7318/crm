import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '/images/avatar.webp';
import Logo from '/images/logo-iwt-with-bg.webp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Nav() {

    return (
        <nav className="h-16 fixed top-0 left-0 flex w-full">
            <div className="w-1/5 h-full bg-[#333564] flex">
                <img src={Logo} className='w-auto h-3/4 bg-white p-1 rounded m-auto' alt="Instant Web Technology" />
            </div>
            <div className='flex justify-between items-center px-4 py-2 w-full shadow'>
                <MenuIcon />
                <input type="text" className='w-96 outline-none border px-4 py-2 rounded text-sm' placeholder='Search...' />
                <div className='flex gap-2 items-center relative group/item'>
                    <img src={Avatar} alt="User Avatar" className='w-12 rounded-full border' />
                    <button className='flex items-center outline-none'>
                        <p className='text-ellipsis overflow-hidden max-w-24 text-nowrap'>Akash</p>
                        <KeyboardArrowDownIcon />
                    </button>
                    <div className='px-4 py-2 absolute invisible opacity-0 top-12 right-1 z-10 bg-white shadow-md rounded-lg group/edit group-hover/item:visible group-hover/item:opacity-100 transition-all'>
                        <Link to={'/profile'} className='flex gap-2 px-4 py-2 text-gray-700'>
                            <AccountCircleIcon />
                            <span>Profile</span>
                        </Link>
                        <hr className='mb-2' />
                        <Link to={'/logout'} className='flex gap-2 px-4 py-2 text-gray-700'>
                            <LogoutIcon />
                            <span>Logout</span>
                        </Link>
                        <hr />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav