import React, { useContext, useEffect, useState } from 'react'
import { NodeContext } from '../../../context/node';
import { FormContext } from '../../../context/form';

const FormHeader = ({ closeForm }: { closeForm: any }) => {
    const [att, setAtt] = useState('');
    const nodeObj = useContext(NodeContext);
    const formObj = useContext(FormContext);
    const nodeId = formObj?.formIsOpen;



    const handleDelete = () => { };
    const handleClose = () => {
        closeForm();
    };

    useEffect(() => {
        nodeObj?.nodes.forEach(node => {
            if (nodeId == node.getOptions().id) {
                setAtt(node.getOptions().name)
            }
        })
    }, [nodeId]);

    if (att.length > 0) {
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