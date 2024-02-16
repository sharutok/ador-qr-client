import React from 'react'
import './Table.css'
import { RiExpandUpDownLine } from "react-icons/ri";
import IconButton from '@mui/material/IconButton';

export default function Table({ thead, tbody }) {
    return (

        <div className='table-container '>
            <table className='table w-[100%]'>
                <thead className='thead'>
                    <tr >
                        {thead.map((h, i) => {
                            return (
                                <th className='th ' key={i}>
                                    <>
                                        {h}
                                    </ >
                                </th>

                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        </div>
    )
}
