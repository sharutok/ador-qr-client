import React from 'react'
import IMAGES from '../assets/Image/Image'
function LoadingSpinner() {
    return (
        <div>
            <div className='center-align' id='element'>
                <img loading='lazy' style={{ fontFamily: "Archive" }} src={IMAGES.ador_star_logo} alt="Ador" width={"55"} height={"20"} />
            </div>
        </div>
    )
}

export default LoadingSpinner