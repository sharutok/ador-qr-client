import React, { useContext, useState } from 'react'
import IMAGES from '../../assets/Image/Image';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../../App'
import moment from 'moment';
import axios from 'axios';
import { api } from '../../HelperComponents/Api';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';

export default function () {
    const { id } = useParams()
    console.log(id);

    const onClickDownloadOriginalPDF = async (e) => {
        e.preventDefault()
        try {
            if (e.target.email.value) {
                const response = await axios.post(api.main.for_client_download_pdf, {
                    email_id: e.target.email.value, file_name: id, _id: id
                })
                response?.data?.data &&
                    setTimeout(() => {
                        window.open(response?.data?.data, window.location.reload())
                    }, 2000)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div className='flex justify-left p-5 gap-5 mb-9'>
                <div className='flex justify-center'>
                    <img loading='lazy' style={{ fontFamily: "Archive" }} src={IMAGES.ador_star_logo} alt="Ador" width={"50"} height={"50"} />
                </div>
                <div className='px-1 py-2'>
                    <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                </div>
                <span align="center" style={{ fontFamily: "Archive" }} className=' text-[1.9rem] mt-1 text-[#555259] font-extrabold'>ADOR<span className='text-red-600 font-bold'> QR</span></span>
            </div>
            <div >
                <div className='flex justify-center relative p-5 '>
                    <div className='grid gap-5 w-[30rem]'>
                        <span className='text-[1.5rem]'>Please provide your email address to access the document</span>
                        <LoginBody onClickDownloadOriginalPDF={onClickDownloadOriginalPDF} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function LoginBody(props) {
    const { btnSaving, setBtnSaving, userLogin, setUserLogin } = useContext(AppContext)
    const { onClickDownloadOriginalPDF } = props

    function handleOnChange(e) {
        let name = e.target.name
        let value = e.target.value
        setUserLogin({ ...userLogin, [name]: value })
    }

    return (
        <div className='scale-[80%] sm:scale-[70%] md:scale-[80%] lg:scale-100 xl:scale-100 2xl:scale-100'>
            <div  >
                {/* <form onSubmit={onSubmit} > */}
                <form className='grid gap-4 ' onSubmit={onClickDownloadOriginalPDF} >
                    <Typography className='text-[#7e8388]'>Email Address</Typography>
                    <TextField sx={{
                        "& fieldset": { border: 'none' },
                    }}
                        fullWidth
                        className='bg-[#ffebeb] rounded-md '
                        type='email'
                        name="email"
                        size='small'
                        placeholder="Enter Email Address"
                        variant="outlined"
                        required
                        onChange={handleOnChange} />
                    <div className='mt-12 ' >
                        <LoadingButton
                            disableElevation
                            fullWidth
                            size="small"
                            sx={{
                                bgcolor: "#b1bac2",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "#b1bac2"
                                }
                            }}
                            variant="contained"
                            type="submit"
                            loading={btnSaving}
                            loadingPosition="start">
                            <span className='p-1'>Submit</span>
                        </LoadingButton>
                    </div>
                </form>
            </div>

            <p className='text-[#565758] text-center text-[0.9rem] mt-3'>{moment().format('YYYY')} adorwelding.com</p>
        </div >
    )
}