import React, { useState, useContext } from 'react'
import { IoLogOutOutline, IoList, IoCloudUploadOutline } from "react-icons/io5";
import { AppContext } from '../App';
import { useAtom } from 'jotai'
import { moduleAtom } from './hookes';

function SideBar() {
    const [_module, _setModule] = useAtom(moduleAtom)

    function handleOnClick(_module_) {
        _setModule(_module_)
    }


    return (
        <div className='h-[100vh] bg-[#ffffff] w-fit border-r-[#ececec] border-r border-solid px-2 '>
            <div className='mt-[2rem]  grid grid-cols-1 gap-5 px-3'>
                <div style={{ backgroundColor: _module === 0 && '#F3F4F6' }} onClick={() => handleOnClick(0)}
                    className='flex gap-5 hover:bg-Neutral1 rounded-lg cursor-pointer p-3 active:bg-Neutral2'>
                    <IoCloudUploadOutline color='#808285' size={24} />
                    <span className='text-[#555259] '>Upload Documents</span>
                </div>
                <div style={{ backgroundColor: _module === 1 && '#F3F4F6' }} onClick={() => handleOnClick(1)}
                    className='flex gap-5 hover:bg-Neutral1 rounded-lg cursor-pointer p-3 active:bg-Neutral2'>
                    <IoList color='#808285' size={24} />
                    <span className='text-[#555259] '>Upload List</span>
                </div>
                <div className='absolute bottom-10 w-max'>
                    <div className='flex gap-5  hover:bg-Neutral1 rounded-lg cursor-pointer p-3  active:bg-Neutral2'>
                        <IoLogOutOutline color='#808285' size={24} />
                        <span className='text-[#555259] '>Logout</span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar