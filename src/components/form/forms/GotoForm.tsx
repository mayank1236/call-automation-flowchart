import React from 'react'
import MainField from '../formComponents/mainField'
import SelectField from '../formComponents/selectField'

const GotoForm = ({ formObj, nodeObj }: { formObj: any, nodeObj: any }) => {
    const options = nodeObj?.nodes.map((node: any) => node.getOptions().name)
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <MainField formObj={formObj} name="Count" inputType="number" />
            <SelectField name="Go To Node Id" formObj={formObj} options={options} />
        </>
    )
}

export default GotoForm