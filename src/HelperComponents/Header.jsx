import React from 'react'
import IMAGES from '../assets/Image/Image'
import Divider from '@mui/material/Divider';

function Header() {
    return (
        <div className='w-full bg-[#ffffff]  border-b-[#ececec] border-b border-solid'>
            <div className='flex justify-left p-5 gap-2 '>
                <div className='flex justify-center'>
                    <img loading='lazy' style={{ fontFamily: "Archive" }} src={IMAGES.ador_star_logo} alt="Ador" width={"35"} height={"20"} />
                </div>
                <div className='px-1 py-2'>
                    <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                </div>
                <span align="center" style={{ fontFamily: "Archive" }} className=' text-[1.2rem] mt-1 text-[#555259] font-extrabold'>ADOR<span className='text-red-600 font-bold'> QR</span></span>
            </div>
        </div>
    )
}

export default Header