import React from 'react'
import MainField from '../formComponents/mainField'
import RecordingSection from '../formComponents/recordingSection'

const GatherForm = ({ formObj }: { formObj: any }) => {
    return (
        <>
            <MainField formObj={formObj} inputType="text" name="Node Name" />
            <RecordingSection formObj={formObj} />
            <MainField formObj={formObj} inputType="text" name="Gather Tag Name" />
            <MainField formObj={formObj} inputType="number" name="Number Of Digits" />
            <MainField formObj={formObj} inputType="number" name="Min Number Of Digits" />
            <MainField formObj={formObj} inputType="number" name="Valid Digits" />
            <MainField formObj={formObj} inputType="text" name="Finish On Key" />
            <MainField formObj={formObj} inputType="number" name="Timeout (sec)" />
            <MainField formObj={formObj} inputType="number" name="Key press time out (sec)" />
            <MainField formObj={formObj} inputType="number" name="Retries" />
        </>
    )
}

export default GatherForm