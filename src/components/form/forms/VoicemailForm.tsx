import React from 'react'
import MainField from '../formComponents/mainField'
import Toggle from '../formComponents/toggleComponent'

const VoicemailForm = ({ formObj, nodeObj }: { formObj: any, nodeObj?: any }) => {
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <MainField formObj={formObj} name="Timeout (sec)" inputType="number" />
            <MainField formObj={formObj} name="Max length (sec)" inputType="number" />
            <MainField formObj={formObj} name="Finish On Key" inputType="number" />
            <Toggle formObj={formObj} name="Play Beep" />
            <Toggle formObj={formObj} name="Email Notification" />
            <Toggle formObj={formObj} name="Message" />
        </>
    )
}

export default VoicemailForm