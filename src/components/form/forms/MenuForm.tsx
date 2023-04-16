import React from 'react'
import MainField from '../formComponents/mainField'
import RecordingSection from '../formComponents/recordingSection'

const MenuForm = ({ formObj, nodeObj }: { formObj: any, nodeObj: any }) => {
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <MainField formObj={formObj} name="Timeout (sec)" inputType="number" />
            <MainField formObj={formObj} name="Retries" inputType="number" />
            <RecordingSection formObj={formObj} />
            <MainField formObj={formObj} name="Menu Tag Name" inputType="text" />
        </>
    )
}

export default MenuForm