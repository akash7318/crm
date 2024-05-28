import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getDesignations } from '../features/designation/designationSlice';
import { getStates } from '../features/states/stateSlice';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, removeUserStateData, addUserData } from '../features/user/userSlice';

function EmployeeData() {

    const navigate = useNavigate();
    const param = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDesignations());
        dispatch(getStates());
        dispatch(removeUserStateData());
        if (param._id !== undefined) {
            getUserById(param._id);
            dispatch(getUser(param._id));
        }
    }, []);

    const chengeDesignation = (event) => {
        event.preventDefault();
    }

    const chengeState = (event) => {
        event.preventDefault();
    }

    const getUserById = async (_id) => {
        let result = await fetch(`${import.meta.env.VITE_BASE_URL}api/users/${_id}`)
        result = await result.json();
        dispatch(addUserData(result));
    }

    let designations = useSelector(state => state.designation.designations);
    if (designations?.data !== undefined) {
        designations = designations.data;
    }

    let states = useSelector(state => state.state.states);
    if (states?.data !== undefined) {
        states = states.data;
    }

    let user = useSelector(state => state.users.user);
    if (user?.data !== undefined) {
        user = user.data;
    }

    const submitEmployeeHandler = async (event) => {
        event.preventDefault();

        let data = event.target;
        data = new FormData(data);
        data = Object.fromEntries(data.entries());

        Object.keys(data).forEach(k => data[k] = data[k].trim());

        let result = {};

        if (param._id !== undefined) {
            result = await fetch(
                `${import.meta.env.VITE_BASE_URL}api/users/${param._id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        } else {
            result = await fetch(
                `${import.meta.env.VITE_BASE_URL}api/users`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        }

        result = await result.json();

        if (result.status) {
            toast.success('Saved Successfully!');
            dispatch(removeUserStateData());
            navigate('/employees');
        }
    }

    return (
        <>
            <Breadcrumb name={param._id !== undefined ? "Edit Employee" : "Add Employee"} linkName="Manage Employees" link="/employees" />
            <div className='bg-white w-full px-5 py-3 rounded-lg shadow'>
                <form onSubmit={submitEmployeeHandler}>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>Name*</label>
                            <input
                                type="text"
                                name='name'
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Name'
                                required
                                defaultValue={(param._id !== undefined && user?.user?.name) ? user?.user?.name : ''}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Personal Mobile No.*</label>
                            <input
                                type="number"
                                name='personalMobileNo'
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Phone Number'
                                required
                                defaultValue={(param._id !== undefined && user?.user?.personalMobileNo) ? user?.user?.personalMobileNo : ''}
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>Work Mobile No.</label>
                            <input
                                type="number"
                                name='workMobileNo'
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Phone Number'
                                defaultValue={(param._id !== undefined && user?.user?.workMobileNo) ? user?.user?.workMobileNo : ''}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Personal Email Id*</label>
                            <input
                                type="email"
                                name='personalEmailId'
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Email Address'
                                required
                                defaultValue={(param._id !== undefined && user?.user?.personalEmailId) ? user?.user?.personalEmailId : ''}
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>Work Email Id</label>
                            <input
                                type="email"
                                name='workEmailId'
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Email Address'
                                defaultValue={(param._id !== undefined && user?.user?.workEmailId) ? user.user.workEmailId : ''}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Date of Birth*</label>
                            <input
                                type="date"
                                name='dob'
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                required
                                defaultValue={(param._id !== undefined && user?.user?.dob) ? user?.user?.dob : ''}
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>Joining Date*</label>
                            <input
                                type="date"
                                name='joiningDate'
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='GST Number'
                                required
                                defaultValue={(param._id !== undefined && user?.user?.joiningDate) ? user.user.joiningDate : ''}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Designation*</label>
                            <select className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm' name='designationId' onChange={(e) => chengeDesignation(e.target.value)} value={user?.user?.designationId} required>
                                <option value=''>Select</option>
                                {
                                    designations.map((value) =>
                                        <option key={value._id} value={value._id} >{value.designation}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    {
                        param._id === undefined
                            ?
                            <div className='w-full flex gap-10 mb-3'>
                                <div className='w-1/2'>
                                    <label className='text-sm'>Password*</label>
                                    <input
                                        type="text"
                                        name='password'
                                        className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                        placeholder='Password'
                                        required
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <label className='text-sm'>Confirm Password*</label>
                                    <input
                                        type="text"
                                        name='confirmPassword'
                                        className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                        placeholder='Confirm Password'
                                        required
                                    />
                                </div>
                            </div>
                            :
                            ''
                    }
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>State*</label>
                            <select className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm' name='stateId' onChange={(e) => chengeState(e.target.value)} value={user?.user?.stateId} required>
                                <option value=''>Select</option>
                                {
                                    states.map((value) =>
                                        <option key={value._id} value={value._id} >{value.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Zip Code</label>
                            <input
                                type="number"
                                name='zipCode'
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Zip Code'
                                defaultValue={(param._id !== undefined && user?.user?.zipCode) ? user?.user?.zipCode : ''}
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-full'>
                            <label className='text-sm'>Address</label>
                            <textarea className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm' name='address' placeholder='Address' defaultValue={(param._id !== undefined && user?.user?.address) ? user?.user?.address : ''}></textarea>
                        </div>
                    </div>
                    <div className='w-full flex mb-3 justify-end'>
                        <button type='submit' className='px-5 py-2 text-sm rounded text-white bg-[#333564]'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EmployeeData