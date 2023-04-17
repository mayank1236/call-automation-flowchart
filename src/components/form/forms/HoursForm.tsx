import React from 'react'
import MainField from '../formComponents/mainField'
import SelectField from '../formComponents/selectField'

const HoursForm = ({ formObj, nodeObj }: { formObj: any, nodeObj?: any }) => {
    var aryIannaTimeZones = (Intl as any).supportedValuesOf('timeZone');

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
        </>
    )
}

export default HoursForm