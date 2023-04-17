import React from 'react'
import MainField from '../formComponents/mainField'

const RouterForm = ({ formObj, nodeObj }: { formObj: any, nodeObj?: any }) => {
    return (
        <>
            <MainField name="Node Name" formObj={formObj} inputType="text" />
            <div>
                <label style={{ marginBottom: "20px", padding: "0px 0px 10px", borderBottom: "1px solid white", width: "100%" }}>Routes</label>
                <button type="button">+ Add Route</button>
            </div>
        </>
    )
}

export default RouterForm