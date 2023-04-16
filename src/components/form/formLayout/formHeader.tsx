import React, { useContext, useEffect, useState } from 'react'

const FormHeader = ({ closeForm, formObj, nodeObj }: { closeForm: any, formObj: any, nodeObj: any }) => {
    const [att, setAtt] = useState('');
    const nodeId = formObj?.formIsOpen;

    const handleDelete = () => {
        // nodeId will be used here
        // TO delete the node
        // and the form and form data
        // from there respective contexts
    };
    const handleClose = () => {
        closeForm();
    };

    useEffect(() => {
        nodeObj?.nodes.forEach((node: any) => {
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