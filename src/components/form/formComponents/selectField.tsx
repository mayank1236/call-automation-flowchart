import React from 'react'

const SelectField = ({ name, options, formObj, label, obj }: {
    name: string;
    options: any[];
    formObj: any;
    label?: string;
    obj?: number;
}) => {
    const inputName = name.toLowerCase();
    const nodeId = formObj?.formIsOpen;

    const handleValue = (e: any) => {
        formObj?.updateForm((prev: any) => {
            let targetValue = e.target.value;
            if (obj != undefined) {
                return { ...prev, [nodeId]: { ...prev[nodeId], [inputName]: { ...prev[nodeId][inputName], [obj]: targetValue } } }
            }
            return { ...prev, [nodeId]: { ...prev[nodeId], [inputName]: targetValue } }
        });
    }
    return (
        <div className="field-container">
            <label className="name" htmlFor={`${nodeId}-${name}`}>{label ? label : name}</label>
            <div className="field">
                <select
                    name={name}
                    id={`${nodeId}-${name}`}
                    value={(obj != undefined ? (formObj.forms[nodeId][inputName] ? formObj.forms[nodeId][inputName][obj] : '') : (formObj.forms[nodeId][inputName] || '')) || options[0]}
                    placeholder='____SELECT____'
                    onChange={handleValue}
                >
                    {options?.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                </select>
            </div>
        </div>
    )
}

export default SelectField