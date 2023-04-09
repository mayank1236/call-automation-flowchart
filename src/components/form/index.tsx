import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from '../../context/form'
import FormWrapper from './formComponents/formWrapper';
import './style.css'

const Form = () => {
    const formObj = useContext(FormContext);
    const [formId, setFormId] = useState(0);
    
    useEffect(() => {
        setFormId(formObj?.formIsOpen[1])
    }, [formObj?.formIsOpen[1]]);

    return (
        <div 
            style={{
                display: formObj?.formIsOpen[0][formId] ? 'block':'none',
            }}
            className="form-container"
        >
            <FormWrapper  closeForm={formObj?.closeForm} formId={formId} />
        </div>
    )
}

export default Form