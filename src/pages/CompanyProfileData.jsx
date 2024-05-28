import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/user/userSlice';
import { getStates } from '../features/states/stateSlice';
import { getPartyTypes } from '../features/partyType/partyTypeSlice';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function CompanyProfileData() {

    const [isVisibleAdvance, setIsVisibleAdvance] = useState(false);
    const dispatch = useDispatch();
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getStates());
        dispatch(getPartyTypes());
        dispatch(getUsers());
    }, [])

    const showAdvanceOptions = () => {
        setIsVisibleAdvance(!isVisibleAdvance)
    }
    const currentUser = JSON.parse(useSelector(state => state.currentUser.currentUser));

    let states = useSelector(state => state.state.states);
    if (states?.data !== undefined) {
        states = states.data;
    }

    let partyTypes = useSelector(state => state.partyType.partyTypes);
    if (partyTypes?.data !== undefined) {
        partyTypes = partyTypes.data;
    }

    let users = useSelector(state => state.users.users);
    if (users?.data !== undefined) {
        users = users.data;
    }

    const submitCompanyProfileHandler = async (event) => {
        event.preventDefault();

        let data = event.target;
        data = new FormData(data);
        data = Object.fromEntries(data.entries());

        Object.keys(data).forEach(k => data[k] = data[k].trim());

        let result = {};

        if (param._id !== undefined) {
            result = await fetch(
                `${import.meta.env.VITE_BASE_URL}api/companyProfiles/${param._id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        } else {
            result = await fetch(
                `${import.meta.env.VITE_BASE_URL}api/companyProfiles`,
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
            navigate('/companyProfiles');
        }
    }

    return (
        <>
            <Breadcrumb name="Add Company Profile" linkName="Manage Company Profile" link="/companyProfiles" />
            <div className='bg-white w-full px-5 py-3 rounded-lg shadow'>
                <form onSubmit={submitCompanyProfileHandler}>
                    <input type="hidden" name="userId" value={currentUser._id} />
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>Company Name*</label>
                            <input
                                type="text"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Company Name'
                                name='name'
                                required
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Client Name*</label>
                            <input
                                type="text"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Client Name'
                                name='clientName'
                                required
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>Primary Email Id*</label>
                            <input
                                type="email"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Email Address'
                                name='primaryEmailId'
                                required
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Secondary Email Id</label>
                            <input
                                type="email"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Email Address'
                                name='secondaryEmailId'
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>Primary Mobile No.*</label>
                            <input
                                type="number"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Phone Number'
                                name='primaryMobileNo'
                                required
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Secondary Mobile No.</label>
                            <input
                                type="number"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Phone Number'
                                name='secondaryMobileNo'
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>State*</label>
                            <select className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm' name='stateId' required>
                                <option value="">Select</option>
                                {
                                    states.map((value) =>
                                        <option key={value._id} value={value._id} >{value.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>GST</label>
                            <input
                                type="text"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='GST Number'
                                name='gstNo'
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-1/2'>
                            <label className='text-sm'>Pin Code</label>
                            <input
                                type="number"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='Pin Code'
                                name='pinCode'
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='text-sm'>Website URL</label>
                            <input
                                type="url"
                                className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm'
                                placeholder='http://example.com'
                                name='websiteURL'
                            />
                        </div>
                    </div>
                    <div className='w-full flex gap-10 mb-3'>
                        <div className='w-full'>
                            <label className='text-sm'>Address*</label>
                            <textarea className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm' placeholder='Address' name='address' required></textarea>
                        </div>
                    </div>
                    <div className={`${isVisibleAdvance ? 'h-52' : 'h-0'} h-0 overflow-hidden transition-all`}>
                        <div className='flex justify-around items-center mb-3'>
                            <hr className='w-[45%] border-[1.2px]' />
                            <div className='font-semibold'>Advance</div>
                            <hr className='w-[45%] border-[1.2px]' />
                        </div>
                        <div className='w-full flex gap-10 mb-3'>
                            <div className='w-1/2'>
                                <label className='text-sm'>Party Type*</label>
                                <select className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm' required={isVisibleAdvance ? true : false} name='partyTypeId'>
                                    <option value="">Select</option>
                                    {
                                        partyTypes.map((value) =>
                                            <option key={value._id} value={value._id}>{value.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className='w-1/2'>
                                <label className='text-sm'>Shift To</label>
                                <select className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm' name='shiftTo'>
                                    <option value={currentUser._id}>Self</option>
                                    {
                                        users.map((value) =>
                                            <option key={value._id} value={value._id}>{value.name} ({value.designation})</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='w-full flex gap-10 mb-3'>
                            <div className='w-full'>
                                <label className='text-sm'>Comment ( Tagging )*</label>
                                <textarea className='outline-none border w-full rounded px-3 py-2 mt-1 text-sm' name='comment' placeholder='Add Comment' required={isVisibleAdvance ? true : false}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex mb-3 justify-between items-center'>
                        <button type='button' onClick={showAdvanceOptions} className='text-sm outline-none'>
                            <span>Advance</span>
                            <KeyboardArrowDownIcon />
                        </button>
                        <hr className='w-5/6' />
                        <button type='submit' className='px-5 py-2 text-sm rounded text-white bg-[#333564]'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CompanyProfileData