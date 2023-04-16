import React from 'react'
import MainField from '../formComponents/mainField';
import Toggle from '../formComponents/toggleComponent';

const DialForm = ({ formObj }: { formObj: any }) => {
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <MainField formObj={formObj} name="Dial Attempts" inputType="number" />
            <MainField formObj={formObj} name="Timeout (sec)" inputType="number" />
            <MainField formObj={formObj} name="Max call length (sec)" inputType="number" />
            <MainField formObj={formObj} name="Max Recording Time " inputType="number" />
            <MainField formObj={formObj} name="Caller ID" inputType="phone" />
            <Toggle formObj={formObj} name="Whisper" />
            <MainField formObj={formObj} name="Routing Plan" inputType="text" />
        </>
    )
}

export default DialForm