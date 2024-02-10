import React from 'react'
import FileUploadListing from '../HomePage/FileUploadListing'
import FileUploadSections from '../HomePage/FIleUploadSections'
import { moduleAtom } from '../../HelperComponents/hookes'
import { useAtom } from 'jotai'

function PlayArea() {
    const [_module, _setModule] = useAtom(moduleAtom)
    return (
        <div className='w-full'>
            {_module === 0 && <FileUploadSections />}
            {_module === 1 && <FileUploadListing />}
        </div>
    )
}

export default PlayArea