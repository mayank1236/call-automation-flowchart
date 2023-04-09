import React, { useEffect, useState } from 'react'

const FormHeader = ({formId, closeForm}: {formId: number, closeForm: any}) => {
    const [att, setAtt] = useState('');
    let elements: any[];
    
    const handleDelete = () => {};
    const handleClose = () => {
        closeForm();
    };

    useEffect(() => {
        elements = [...document.querySelectorAll('.node > div')];
        const elementName = elements[formId].getAttribute('data-default-node-name').toLowerCase();
        setAtt(elementName);
    }, [formId]);

    if(att.length > 0) {
        return (
            <div className="form-header">
                <div className="form-name">{att}</div>
                <div className="form-actions">
                    <button onClick={handleDelete} type="button">delete</button>
                    <button onClick={handleClose} type="button">X</button>
                </div>
            </div>
        )
    } else {
        return <></>;
    }
}

export default FormHeader