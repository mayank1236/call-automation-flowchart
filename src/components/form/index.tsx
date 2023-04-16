import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from '../../context/form'
import FormWrapper from './formComponents/formWrapper';
import './style.css'

const Form = () => {
    const formObj = useContext(FormContext);
    if (formObj?.formIsOpen) {
        return (
            <div
                style={{
                    display: formObj?.formIsOpen.length > 0 ? 'block' : 'none',
                }}
                className="form-container"
            >
                <FormWrapper closeForm={formObj?.closeForm} />
            </div>
        )
    }
}

export default Form