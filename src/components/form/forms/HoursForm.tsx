import React from 'react'
import MainField from '../formComponents/mainField'
import SelectField from '../formComponents/selectField'

const HoursForm = ({ formObj, nodeObj }: { formObj: any, nodeObj?: any }) => {
    var aryIannaTimeZones = (Intl as any).supportedValuesOf('timeZone');
    let checked = false;

    let date = new Date;
    const options = aryIannaTimeZones.map((timeZone: any) => {
        // let strTime = date.toLocaleString("en-US", { timeZone: `${timeZone}` });
        // console.log(timeZone, strTime);
        return `${timeZone}`;
    });
    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <SelectField formObj={formObj} name="Time Zone" options={options} />
            <div className="field-container">
                <div className="btn-group">
                    <label className="btn" style={{ opacity: "0.8" }}>
                        <input type="radio" autoComplete='off' className="btn" checked={!checked} />
                        Basic
                    </label>
                    <label className="btn">
                        <input type="radio" autoComplete='off' className="btn" checked={checked} />
                        Advanced
                    </label>
                </div>
            </div>
            <div className="field-container">
                {['sun', 'sat', 'fri', 'thu', 'wed', 'tue', 'mon'].map(day => {
                    return (
                        <div style={{
                            background: "rgb(20 27 51)",
                            padding: "10px",
                            border: "0.3rem",
                            marginBottom: "20px"
                        }}>
                            <label style={{ marginBottom: "20px", padding: "0px 0px 10px", borderBottom: "1px solid white", width: "100%" }}>{day}</label>
                            <div className="small-fields">
                                <MainField formObj={formObj} name="start" inputType="time" />
                                <MainField formObj={formObj} name="end" inputType="time" />
                            </div>
                            <div className="field" style={{ display: "flex", justifyContent: 'space-between' }}>
                                <div>
                                    Breaks
                                    <ul style={{ listStyleType: "none" }}>
                                        <li>12:00 PM for 45 minutes</li>
                                    </ul>
                                </div>
                                <button type="button" style={{
                                    borderColor: "green",
                                    background: "none"
                                }}>+ Add Break</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default HoursForm