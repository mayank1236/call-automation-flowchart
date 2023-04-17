import React from 'react'
import MainField from '../formComponents/mainField'
import Toggle from '../formComponents/toggleComponent'

const PixelForm = ({ formObj, nodeObj }: { formObj: any, nodeObj?: any }) => {
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <MainField formObj={formObj} name="URL" inputType="url" />
            <MainField formObj={formObj} name="Max Fires" inputType="number" />
            <Toggle formObj={formObj} name="Advanced" />
            <Toggle formObj={formObj} name="Authorization" />
        </>
    )
}

export default PixelForm