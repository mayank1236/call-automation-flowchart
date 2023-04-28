import React, { useState } from 'react'
import MainField from '../formComponents/mainField'
import SelectField from '../formComponents/selectField'
import Toggle from '../formComponents/toggleComponent';

const HoursForm = ({ formObj, nodeObj }: { formObj: any, nodeObj?: any }) => {
    const dayList = ['sun', 'sat', 'fri', 'thu', 'wed', 'tue', 'mon'];
    const nodeId = formObj?.formIsOpen;
    let selectedValue = formObj?.forms[nodeId]['hoursType'] || 'basic';
    const [breakState, setBreakState] = useState(() => {
        let obj: { [key: string]: any } = {};
        dayList.forEach(day => { obj[day] = false });
        obj['sunday'] = false;
        return obj;
    });
    const [stackId, setStackId] = useState(0);

    var aryIannaTimeZones = (Intl as any).supportedValuesOf('timeZone');

    const handleChange = (event: any) => {
        // setSelectedValue(event.target.value);
        formObj?.updateForm((prev: any) => {
            return { ...prev, [nodeId]: { ...prev[nodeId], 'hoursType': (event.target as HTMLInputElement).value } }
        });
    };

    const options = aryIannaTimeZones.map((timeZone: any) => {
        return `${timeZone}`;
    });

    const addBreak = (day: string) => {
        let start = formObj?.forms[nodeId][`${day} start time`];
        let duration = formObj?.forms[nodeId][`${day} duration`];
        if (day == 'sunday') {
            start = formObj?.forms[nodeId][`start time`];
            duration = formObj?.forms[nodeId][`duration`];
        }
        start && duration && setStackId(Object.keys(start).length);
        setBreakState(breakState => {
            return { ...breakState, [day]: !breakState[day] }
        });
    }

    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <SelectField formObj={formObj} name="Time Zone" options={options} />
            <div className="field-container">
                <div className="btn-group">
                    <label
                        className="btn"
                        style={{ opacity: selectedValue === 'basic' ? "1" : "0.6" }}
                    >
                        <input
                            type="radio"
                            name="hours-type"
                            value="basic"
                            checked={selectedValue === 'basic'}
                            onChange={handleChange}
                        />
                        Basic
                    </label>
                    <label
                        className="btn"
                        style={{ opacity: selectedValue === 'advanced' ? "1" : "0.6" }}
                    >
                        <input
                            type="radio"
                            name="hours-type"
                            value="advanced"
                            checked={selectedValue === 'advanced'}
                            onChange={handleChange}
                        />
                        Advanced
                    </label>
                </div>
            </div>
            <div className="field-container">
                {selectedValue == 'basic' ? (
                    <div className="hours-input" style={{
                        background: "rgb(20 27 51)",
                        padding: "10px",
                        border: "0.3rem",
                        marginBottom: "20px"
                    }}>
                        <label className="hours-label">
                            <Toggle formObj={formObj} name="sunday" />
                            <div className="small-fields">
                                <MainField formObj={formObj} label="start" name={`sunday start`} inputType="time" />
                                <MainField formObj={formObj} label="end" name={`sunday end`} inputType="time" />
                            </div>
                        </label>

                        <button type="button" onClick={() => addBreak('sunday')}>+ Add Break</button>
                        <div className="field" style={{ display: "flex", justifyContent: 'space-between' }}>
                            <div style={{ width: "100%" }}>
                                <label>Breaks</label>
                                {breakState['sunday'] && (
                                    <>
                                        <div className="small-fields">
                                            <MainField formObj={formObj} label="Start Time" name={`start time`} obj={stackId} inputType="time" />
                                            <MainField formObj={formObj} label="Duration(Min)" name={`duration`} obj={stackId} inputType="number" />
                                        </div>
                                        <button type="button" style={{ background: "green" }} onClick={() => addBreak('sunday')}>Save</button>
                                    </>
                                )}
                                <ul style={{ listStyleType: "none" }}>
                                    {
                                        formObj?.forms[nodeId][`start time`] != undefined &&
                                        formObj.forms[nodeId][`duration`] != undefined &&
                                        Object.keys(formObj?.forms[nodeId][`start time`]).length > 0 &&
                                        Object.keys(formObj.forms[nodeId][`duration`]).length > 0 &&
                                        Object.keys(formObj?.forms[nodeId][`start time`]).map(id => {
                                            return (<li key={id}>{formObj.forms[nodeId][`start time`][id]} for {formObj.forms[nodeId][`duration`][id]}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                )
                    :
                    dayList.map(day => {
                        return (
                            <div className="hours-input" key={day} style={{
                                background: "rgb(20 27 51)",
                                padding: "10px",
                                border: "0.3rem",
                                marginBottom: "20px"
                            }}>
                                <label className="hours-label">
                                    <Toggle formObj={formObj} name={day} />
                                    <div className="small-fields">
                                        <MainField formObj={formObj} label="start" name={`${day} start`} inputType="time" />
                                        <MainField formObj={formObj} label="end" name={`${day} end`} inputType="time" />
                                    </div>
                                </label>

                                <button type="button" onClick={() => addBreak(day)}>+ Add Break</button>
                                <div className="field" style={{ display: "flex", justifyContent: 'space-between' }}>
                                    <div style={{ width: "100%" }}>
                                        <label>Breaks</label>
                                        {breakState[day] && (
                                            <>
                                                <div className="small-fields">
                                                    <MainField formObj={formObj} label="Start Time" name={`${day} start time`} obj={stackId} inputType="time" />
                                                    <MainField formObj={formObj} label="Duration(Min)" name={`${day} duration`} obj={stackId} inputType="number" />
                                                </div>
                                                <button type="button" style={{ background: "green" }} onClick={() => addBreak(day)}>Save</button>
                                            </>
                                        )}
                                        <ul style={{ listStyleType: "none" }}>
                                            {
                                                formObj?.forms[nodeId][`${day} start time`] != undefined &&
                                                formObj.forms[nodeId][`${day} duration`] != undefined &&
                                                Object.keys(formObj?.forms[nodeId][`${day} start time`]).length > 0 &&
                                                Object.keys(formObj.forms[nodeId][`${day} duration`]).length > 0 &&
                                                Object.keys(formObj?.forms[nodeId][`${day} start time`]).map(id => {
                                                    return (<li key={id}>{formObj.forms[nodeId][`${day} start time`][id]} for {formObj.forms[nodeId][`${day} duration`][id]}</li>)
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default HoursForm