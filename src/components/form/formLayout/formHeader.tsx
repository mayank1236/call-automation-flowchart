import React, { useContext, useEffect, useState } from 'react'

const nodeDetails: { [key: string]: string } = {
    "Dial": "Dials a particular call route based on the availability of the nodes.",
    "Hangup": "End the call",
    "Menu": "Menu allows the user to play a message and choose the option based on the node.",
    "Router": "Router is used to contain logic for traversing to other nodes.",
    "Gather": "Gathers input from the caller.",
    "Go To": "Goes to a given node.",
    "Hours": "Hours filter is used to traverse other nodes based on the time of the day.",
    "Pixel": "Fires as specific pixel.",
    "Play": "Plays or Dictates a message to the client",
    "Voicemail": "Records a message from a user"
}

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
                <div className="form-name" style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
                    {att}
                    {/* Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "15px", width: "15px", cursor: 'pointer' }} fill="white" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
                    <div className="tooltip">{nodeDetails[att]}</div>
                </div>
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