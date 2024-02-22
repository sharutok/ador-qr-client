import React, { useContext, useState, useEffect } from 'react'
import Table from '../../Table'
import CPagination from '../../HelperComponents/Pagination';
import {
    useQuery,
    QueryClient,
} from '@tanstack/react-query'
import { api } from '../../HelperComponents/Api';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { FaFilePdf } from "react-icons/fa6";
import { BsQrCode } from "react-icons/bs";
import { abbr } from '../../HelperComponents/Static';
import { MdDelete } from "react-icons/md";
import LoadingSpinner from '../../HelperComponents/LoadingSpinner';
import { RiExpandUpDownLine } from "react-icons/ri";
import { AppContext } from '../../App';

function FileUploadListing() {
    const { count, setCount, page, setPage } = useContext(AppContext)
    const [search, setSearch] = useState('')
    const [uploadedDate, setUploadedDate] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['todos', search, uploadedDate, page],
        queryFn: async () => {
            const res = await axios.get(`${api.main.all_data}/?search=${search}&uploaded_date=${uploadedDate}&page=${page}`)
            return res
        },
        refetchInterval: Infinity,
    })

    useEffect(() => {
        setCount(Math.ceil(data?.data?.count / 10))
    })


    const thead = [
        'File name',
        `Batch Number`,
        'Uploaded Date',
        'No of times viewed',
        'Actions',
    ]

    async function handleDownloadOriginalPdf(file_name, id) {
        try {
            const response = await axios.get(`${api.utils.download_original_pdf}/?id=${id}&file_name=${file_name}`)
            window.open(response?.data?.data, '_blank')
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDownloadQrEmbeddedPdf(id) {
        try {
            const response = await axios.get(`${api.utils.download_embedded_pdf}/?id=${id}`)
            window.open(response?.data?.data, '_blank')
        } catch (error) {
            console.log(error);
        }
    }

    function handleDelete() {
        console.log("deleted");
    }


    return (
        <div className='mt-5 px-20'>
            <div className='grid grid-cols-1 gap-5'>
                <div className='flex justify-end'>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                        <InputBase
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Smart Search"
                            inputProps={{ 'aria-label': 'smart search' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton onClick={() => setSearch('')} color="error" sx={{ p: '10px' }} aria-label="directions">
                            <ClearIcon />
                        </IconButton>
                    </Paper>
                </div>
                <div>
                    <div className='table-container '>
                        <table className='table w-[100%]'>
                            <thead className='thead'>
                                <tr >
                                    <th className='th' >File name</th>
                                    <th className='th' >Batch Number </th>
                                    <th className='th' >Uploaded Date {<IconButton onClick={() => setUploadedDate(!uploadedDate)} >{<RiExpandUpDownLine size='20' color="#ffff" className='cursor-pointer' />}</IconButton>}</th>
                                    <th className='th' >No of times viewed</th>
                                    <th className='th' >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading && <LoadingSpinner />}
                                {!isLoading && data?.data?.results?.map((v, i) => {

                                    return <>
                                        <tr key={i}>
                                            <td>
                                                <abbr title={v.id}>{v.file_name}</abbr>
                                            </td>
                                            <td>{v.batch_number}</td>
                                            <td>{v.created_at}</td>
                                            <td >{v.no_of_times_view ? v.no_of_times_view : 0}</td>
                                            <td className='flex justify-center'>{
                                                <CollOfActions
                                                    file_name={v.file_name}
                                                    id={v.id}
                                                    handleDownloadOriginalPdf={handleDownloadOriginalPdf}
                                                    handleDownloadQrEmbeddedPdf={handleDownloadQrEmbeddedPdf}
                                                    handleDelete={handleDelete} />
                                            }</td>
                                        </tr>
                                    </>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <CPagination />
        </div>

    )
}

export default FileUploadListing

const CollOfActions = ({ handleDownloadOriginalPdf, handleDownloadQrEmbeddedPdf, handleDelete, file_name, id }) => {
    return (
        <div className='flex gap-8'>
            <IconButton onClick={() => handleDownloadOriginalPdf(file_name, id)}>
                {abbr("Download Original PDF", <FaFilePdf className='cursor-pointer' color='#555259' size={20} />)}
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton onClick={() => handleDownloadQrEmbeddedPdf(id)}>
                {abbr("Downlaad QR Embedded PDF", <BsQrCode className='cursor-pointer' color='#555259' size={20} />)}
            </IconButton>
            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
            {/* <IconButton onClick={() => handleDelete()}>
                {abbr("Delete", <MdDelete className='cursor-pointer' color='#555259' size={22} />)}
            </IconButton> */}
        </div>
    )
}