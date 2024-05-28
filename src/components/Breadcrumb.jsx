import React from 'react'
import { Link } from 'react-router-dom'

function Breadcrumb(props) {
    return (
        <div className='flex justify-between items-center w-full h-fit mb-4'>
            <p className='text-xl font-semibold'>{props.name}</p>
            {
                props.link
                    ?
                    <Link to={props.link} className='text-white bg-[#333564] flex items-center gap-1 text-sm rounded-md px-4 py-2 float-right'>
                        {props.linkIcon}
                        {props.linkName}
                    </Link>
                    :
                    ''
            }
        </div>
    )
}

export default Breadcrumb