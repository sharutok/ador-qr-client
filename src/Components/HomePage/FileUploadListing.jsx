import React, { useState } from 'react'
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


function FileUploadListing() {
    const [search, setSearch] = useState('')
    const { data, isLoading } = useQuery({
        queryKey: ['todos', search],
        queryFn: async () => {
            const res = await axios.get(`${api.main.all_data}/?search=${search}`)
            return res
        },
        refetchInterval: Infinity,
    })

    const thead = [
        // {
        //     thead_name: 'ID',
        //     sortSymbol: false
        // },
        {
            thead_name: 'File name',
            sortSymbol: false
        },
        {
            thead_name: `Batch Number`,
            sortSymbol: true
        },
        {
            thead_name: 'Uploaded Date',
            sortSymbol: false
        },
        {
            thead_name: 'No of times viewed',
            sortSymbol: true
        },
        {
            thead_name: 'Actions',
            sortSymbol: false
        },
    ]

    async function handleDownloadOriginalPdf(file_name, id) {
        try {
            const response = await axios.get(`${api.utils.download_original_pdf}/?id=${id}&file_name=${file_name}`)
            console.log(String(response?.data?.data));
            window.open(response?.data?.data, '_blank')
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDownloadQrEmbeddedPdf(id) {
        try {
            const response = await axios.get(`${api.utils.download_embedded_pdf}/?id=${id}`)
            console.log(String(response?.data?.data));
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
                    <Table thead={thead} tbody={
                        <>
                            {isLoading && <LoadingSpinner />}
                            {!isLoading && data?.data?.results?.map((v, i) => {
                                return <>
                                    <tr key={i}>
                                        <td>{v.file_name}</td>
                                        <td>{v.batch_number}</td>
                                        <td>{v.created_at}</td>
                                        <td >{v.no_of_times_viewed}</td>
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
                        </>
                    } />
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
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton onClick={() => handleDelete()}>
                {abbr("Delete", <MdDelete className='cursor-pointer' color='#555259' size={22} />)}
            </IconButton>
        </div>
    )
}