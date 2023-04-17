import React from 'react'

const SelectField = ({ name, options, formObj }: {
    name: string;
    options: any[];
    formObj: any[];
}) => {
    return (
        <div className="field-container">
            <label className="name" htmlFor={name}>{name}</label>
            <div className="field">
                <select name={name} id={name} defaultValue={options[0]}>
                    {options?.map(opt => (<option value={opt}>{opt}</option>))}
                </select>
            </div>
        </div>
    )
}

export default SelectField