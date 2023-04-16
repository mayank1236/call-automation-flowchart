import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from '../../context/form'
import FormWrapper from './formLayout/formWrapper';
import './style.css'
import { NodeContext } from '../../context/node';

const Form = () => {
    const formObj = useContext(FormContext);
    const nodeObj = useContext(NodeContext);

    if (formObj?.formIsOpen) {
        return (
            <div
                style={{
                    display: formObj?.formIsOpen.length > 0 ? 'block' : 'none',
                }}
                className="form-container"
            >
                <FormWrapper formObj={formObj} nodeObj={nodeObj} closeForm={formObj?.closeForm} />
            </div>
        )
    }
}

export default Form