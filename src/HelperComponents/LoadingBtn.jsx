import React, { useContext } from 'react'
import { AppContext } from '../App'
import { LoadingButton } from '@mui/lab'

function LoadingButtonWithSnack({ afterName, beforeName, onClick }) {
    const { btnSaving } = useContext(AppContext)
    return (
        <>
            <div
            >
                <LoadingButton
                    ref={null}
                    fullWidth
                    onClick={onClick}
                    className='w-fit '
                    size='large'
                    disableElevation
                    sx={{ bgcolor: "#555259", p: 1 }}
                    variant="contained"
                    type="submit"
                    // sx={{ width: "10rem" }}
                    loading={btnSaving}
                    startIcon={<></>}
                    loadingPosition="start"
                >
                    {btnSaving ? <p>{afterName}</p> : <p>{beforeName}</p>}
                </LoadingButton>
            </div>
        </>
    )
}

export default LoadingButtonWithSnack