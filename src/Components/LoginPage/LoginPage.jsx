import React, { useContext, useState } from 'react'
import IMAGES from '../../assets/Image/Image';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../../App'
import moment from 'moment';
import axios from 'axios';
import { api } from '../../HelperComponents/Api';
// import { setCookies } from '../Helper Components/CustomCookies';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function Page() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div>
            <div className='flex justify-left p-5 gap-5 mb-9'>
                <div className='flex justify-center'>
                    <img loading='lazy' style={{ fontFamily: "Archive" }} src={IMAGES.ador_star_logo} alt="Ador" width={"50"} height={"50"} />
                </div>
                <div className='px-1 py-2'>
                    <Divider sx={{ borderColor: "#555259" }} orientation='vertical' />
                </div>
                <span align="center" style={{ fontFamily: "Archive" }} className=' text-[1.9rem] mt-1 text-[#555259] font-extrabold'>WEBAPP<span className='text-red-600 font-bold'>NAME???</span></span>
            </div>
            <div >
                <div id="element" className='flex justify-center relative p-5'>
                    <div className='grid gap-5'>
                        <span className='text-[3rem]'>Sign In</span>
                        <LoginBody />
                    </div>
                </div>
            </div>
        </div>
    )
}



function LoginBody() {
    const { btnSaving, setBtnSaving, userLogin, setUserLogin } = useContext(AppContext)
    const [error, setError] = useState("")


    async function onSubmit(e) {
        e.preventDefault()
        try {
            userLogin["prefix"] = prefix
            // const response = await axios.post(api.user.log_check, userLogin)
            if (response?.data?.status === 200) {
                const emp_no = response?.data?.emp_no
                const module_permission = response?.data?.module_permission
                const initials = response?.data?.initials
                // setCookies([emp_no, module_permission, initials])
                setError("")
                window.location.href = "/home"
            } else {
                setError("Password or Email is Incorrect")
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleOnChange(e) {
        let name = e.target.name
        let value = e.target.value
        setUserLogin({ ...userLogin, [name]: value })
    }



    return (
        <div className='scale-[80%] sm:scale-[70%] md:scale-[80%] lg:scale-100 xl:scale-100 2xl:scale-100'>
            <div  >
                <form onSubmit={onSubmit} >
                    <div className='grid gap-4 w-[25rem]'>
                        <div>
                            <Typography className='text-[#7e8388]'>Email Address</Typography>
                            <div className='flex'>
                                <TextField sx={{
                                    "& fieldset": { border: 'none' },
                                }}
                                    fullWidth
                                    className='bg-[#ffebeb] rounded-md '
                                    helperText={error} error={error && true} name="email" size='small' placeholder="Enter Email Address" variant="outlined" required onChange={handleOnChange} />
                            </div>
                        </div>
                        <div>
                            <Typography className='text-[#7e8388]'>Password</Typography>
                            <TextField
                                sx={{
                                    "& fieldset": { border: 'none' },
                                }}
                                className='bg-[#ffebeb] rounded-md'
                                helperText={error} error={error && true} fullWidth size='small' placeholder="Enter Password" type='password' variant="outlined" required onChange={handleOnChange} name="password" />
                        </div>
                        {/* <span className='text-center mt-5 mb-10 underline text-[#868E96] text-[0.8rem]' >
                            Forgot password? Contact ADORHUB Admin
                        </span> */}
                    </div>

                    <div className='mt-12' >
                        <LoadingButton
                            disableElevation
                            fullWidth
                            size="small"
                            sx={{ bgcolor: "#b1bac2" }}
                            variant="contained"
                            type="submit"
                            loading={btnSaving}
                            loadingPosition="start"
                        >
                            <span className='p-1'>Submit</span>
                        </LoadingButton>
                    </div>
                </form>
            </div>
            <p className='text-[#565758] text-center text-[0.9rem] mt-3'>{moment().format('YYYY')} adorwelding.com</p>
        </div >
    )
}