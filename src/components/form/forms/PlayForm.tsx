import React from 'react'
import MainField from '../formComponents/mainField'
import RecordingSection from '../formComponents/recordingSection'

const PlayForm = ({ formObj, nodeObj }: { formObj: any, nodeObj?: any }) => {
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <RecordingSection formObj={formObj} />
        </>
    )
}

export default PlayForm