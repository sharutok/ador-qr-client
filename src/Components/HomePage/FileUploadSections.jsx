import React, { useContext, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import Button from '@mui/material/Button';
import { TbSparkles } from "react-icons/tb";
import { TbFileUpload } from "react-icons/tb";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import { api } from '../../HelperComponents/Api';
import { AppContext } from '../../App';
import Divider from '@mui/material/Divider';
import LoadingButtonWithSnack from '../../HelperComponents/LoadingBtn';
import BarSnack from '../../HelperComponents/BarSnack';
import { file_type } from '../../HelperComponents/Static';
import { getCookies } from '../../HelperComponents/CookiesS';


const formData = new FormData()

const FileUploadSections = () => {
    const file_type = getCookies()[2]
    const [files, setFiles] = useState([]);
    const { ocrValue, setOCRValue, formValue, setFormValue, selectedSuggestion, setSnack, setBtnSaving, snack, setSelectedSuggestion } = useContext(AppContext)

    const handleDrop = (e) => {
        e.preventDefault();
        if (!files.length) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles([...files, ...droppedFiles]);
        } else {
            setSnack({ ...snack, status: true, message: 'Only one PDF is allowed at a time' });
        }
    };

    const handleFileInputChange = (e) => {
        if (!files.length) {
            const selectedFiles = Array.from(e.target.files);
            setFiles([...files, ...selectedFiles]);
        } else {
            setSnack({ ...snack, status: true, message: 'Only one PDF is allowed at a time' });
        }
    };

    const handleOnChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setFormValue({ ...formData, [name]: value })
    }


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            if (formValue.batch_number && files[0]) {
                formData.append('batch_number', formValue.batch_number)
                formData.append('pdf_loc', files[0])
                formData.append('file_name', files[0]?.['name'])
                file_type === "both" ? formData.append('file_type', formValue.file_type) : formData.append('file_type', file_type)


                setBtnSaving(true)
                await axios.post(api.utils.submit_pdf, formData)
                setBtnSaving(false)
                setSnack({ ...snack, status: true, message: 'Finished Uploading' });
                window.location.reload()

            }
            else {
                !formValue.batch_number && setSnack({ ...snack, status: true, message: 'Batch number is required' });
                !files[0] && setSnack({ ...snack, status: true, message: 'Upload PDF' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleProceed = async (e) => {
        e.preventDefault()
        formData.append('pdf_loc', files[0])
        formData.append('file_name', files[0]?.['name'])
        if (files[0]?.['name']) {
            Object.entries(formValue).map(ent => {
                formData.append(ent[0], ent[1])
            })
            setBtnSaving(true)
            const response = await axios.post(api.utils.read_text_from_pdf, formData)
            await Promise.resolve(setOCRValue(response?.data?.data))
            setSelectedSuggestion(false)
            setBtnSaving(false)
        } else {
            !files[0] && setSnack({ ...snack, status: true, message: 'Upload PDF' });
        }
    }

    return (
        <div className='grid gap-5 mt-5 justify-center'>
            <div className='grid grid-cols-1 gap-10 w-fit'>
                <div className='rounded-xl grid gap-5 '>
                    <div className='grid gap-2'>
                        <div
                            className='cursor-[pointer] p-[5vw] border-[2px] border-dashed rounded-lg border-Neutral3 grid gap-4 mt-5'
                            onClick={() => document.querySelector('input[type=file]').click()}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileInputChange}
                                style={{ display: 'none' }} />
                            <div className='flex justify-center'>
                                <TbFileUpload size={50} color={'#090406'} />
                            </div>
                            <p className=' text-Neutral7 font-bold'>Drag & drop files here or click to select files</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-Neutral5'>Supported Format: PDF</p>
                            <p className='text-Neutral5'>Maximum Size: 10MB</p>
                        </div>
                    </div>
                    <SuggestName handleOnChange={handleOnChange} />
                </div>
                <BarSnack />
                <div>
                    <SelectedFiles files={files} setFiles={setFiles} />
                </div>
                <div className='flex justify-center gap-5'>
                    {(!selectedSuggestion) &&
                        <LoadingButtonWithSnack afterName={"Uploading"} beforeName={"Embed and Upload"} onClick={handleSubmit} />
                    }
                    {(selectedSuggestion) &&
                        <LoadingButtonWithSnack afterName={"Processing"} beforeName={"Proceed"} onClick={handleProceed} />
                    }
                    <Button onClick={() => window.location.reload()} className='w-fit ' size='large' disableElevation sx={{ bgcolor: "#555259" }} variant="contained">Reset</Button>
                </div>
            </div>
        </div>
    );
};

const SuggestName = () => {
    const { ocrValue, formValue, setFormValue, selectedSuggestion, setSelectedSuggestion } = useContext(AppContext)
    return (
        <div className='grid gap-4 border-[2px] border-[#cfcfcf]  rounded-md p-5'>
            {<TextField value={formValue.batch_number} onChange={(e) => setFormValue({ ...formValue, batch_number: e.target.value })} fullWidth size='small' id="outlined-basic" variant="outlined" name='batch_number' placeholder='Enter File name' />}
            {getCookies()[2] === "both" && <Autocomplete
                value={formValue.file_type}
                disablePortal
                id="combo-box-demo"
                options={file_type.map(val => { return val.name })}
                size='small'
                onChange={(x, y) => setFormValue({ ...formValue, file_type: y })}
                renderInput={(params) => <TextField  {...params} label="File Type" />}
            />}
            <div className='flex gap-2 justify-center '>
                {ocrValue?.map((x, i) => {
                    return (
                        <div onClick={() => { setFormValue({ ...formValue, batch_number: x }) }} key={i} className='bg-Neutral1 p-1 px-2 rounded-xl border-[2px] border-[#8d8d8d] cursor-pointer hover:bg-Neutral2'>
                            <span className='text-Neutral9'>{x}</span>
                        </div>
                    )
                })}
            </div>
            <Divider>OR</Divider>
            <div onClick={() => setSelectedSuggestion(!selectedSuggestion)} className='flex justify-center '>
                <div className='button-a p-1 rounded-xl'>
                    <div style={{ backgroundColor: !selectedSuggestion && '#F3F4F6', }} className='button flex p-2 gap-3 active:bg-Neutral2 cursor-pointer w-fit rounded-xl'>
                        <TbSparkles size={24} color={!selectedSuggestion ? '#090406' : '#fff'} />
                        <span className='text-Neutral7 font-bold'>Click to let application detect batch number</span>
                    </div>
                </div>
            </div>
            {/* <div className='grid justify-center'>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Save Copy" />
                </FormGroup>
            </div> */}
        </div>
    )
}

const SelectedFiles = ({ files, setFiles }) => {
    function handleDelete() {
        setFiles((x) => [])
    }
    return (
        <>
            {files.length > 0 && (
                <div>
                    <ul>
                        {files.map((file, index) => {
                            return (
                                <div className='flex justify-between bg-[#f8f8f8] py-5 px-5 rounded-xl' key={index}>
                                    <div className='flex gap-3'>
                                        <div className='border-2 border-solid border-[#ebebeb] bg-prim5 p-2 rounded-xl w-fit'>
                                            <img width="36" height="36" src="https://img.icons8.com/color/48/pdf.png" alt="pdf" />
                                        </div>
                                        <div className='grid'>
                                            <span className='font-medium text-sm text-prim4' >{file.name}</span>
                                            <span className='font-medium text-sm text-prim4' >~ {Math.round(Number(file.size) / 10 ** 6)} MB</span>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <abbr title="delete file">
                                            <IoCloseSharp onClick={() => handleDelete()} size={24} className='cursor-pointer mt-1' color='#ED1C24' />
                                        </abbr>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            )}
        </>
    )
}

export default FileUploadSections;
