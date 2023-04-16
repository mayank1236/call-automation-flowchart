import React from 'react'
import SmallFields from '../formComponents/smallFields';
import MainField from '../formComponents/mainField';
import Toggle from '../formComponents/toggleComponent';

const HangupForm = ({ formObj }: { formObj: any }) => {
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <Toggle formObj={formObj} name="Message" />
        </>
    )
}

export default HangupForm