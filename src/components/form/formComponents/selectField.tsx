import React from 'react'

const SelectField = ({ name, options, formObj }: {
    name: string;
    options: any[];
    formObj: any;
}) => {
    const inputName = name.toLowerCase();
    const nodeId = formObj?.formIsOpen;

    const handleValue = (e: any) => {
        formObj?.updateForm((prev: any) => {
            let targetValue = e.target.value;
            return { ...prev, [nodeId]: { ...prev[nodeId], [inputName]: targetValue } }
        });
    }
    return (
        <div className="field-container">
            <label className="name" htmlFor={name}>{name}</label>
            <div className="field">
                <select
                    name={name}
                    id={name}
                    defaultValue={options[0]}
                    onChange={handleValue}
                >
                    {options?.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                </select>
            </div>
        </div>
    )
}

export default SelectField