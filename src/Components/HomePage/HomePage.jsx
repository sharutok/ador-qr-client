import React from 'react'
import Header from '../../HelperComponents/Header'
import SideBar from '../../HelperComponents/SideBar'
import PlayArea from '../PlayArea/PlayArea'

function HomePage() {
    return (
        <div className='grid grid-cols-1'>
            <Header />
            <div className='grid grid-cols-[15rem_1fr] left-0'>
                <SideBar />
                <PlayArea />
            </div>
        </div>
    )
}

export default HomePage