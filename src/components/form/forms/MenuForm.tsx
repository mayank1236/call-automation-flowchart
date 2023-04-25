import React from 'react'
import MainField from '../formComponents/mainField'
import RecordingSection from '../formComponents/recordingSection'

const MenuForm = ({ formObj, nodeObj }: { formObj: any, nodeObj: any }) => {
    var routes: number[] = [];
    for (let i = 0; i < 10; i++) {
        routes.push(i)
    }
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <MainField formObj={formObj} name="Timeout (sec)" inputType="number" />
            <MainField formObj={formObj} name="Retries" inputType="number" />
            <RecordingSection formObj={formObj} />
            <MainField formObj={formObj} name="Menu Tag Name" inputType="text" />
            <div >
                <label style={{ marginBottom: "20px", padding: "0px 0px 10px", borderBottom: "1px solid white", width: "100%" }}>Menu Routes</label>
                {
                    routes.map(route => {
                        return (
                            <div key={route} className="field-container">
                                <div className="field" style={{ display: "flex", gap: "10px" }}>
                                    <label>Press {route} </label>
                                    <button type="button">Empty +</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MenuForm