import React, { useContext, useEffect, useState } from 'react';
import DialForm from '../forms/DialForm';
import HangupForm from '../forms/HangupForm';
import MenuForm from '../forms/MenuForm';

interface formTypesObj {
    [key: string]: any
}

const FormContent = ({ formObj, nodeObj }: { formObj: any, nodeObj: any }) => {
    const nodeId = formObj?.formIsOpen;
    const forms: formTypesObj | undefined = formObj?.forms;
    const nodes = nodeObj?.nodes;

    const components = forms && nodes && Object.keys(forms)?.map((form: string) => {
        let formComponent;
        let name: string = '';
        for (let node of nodes) {
            if (node.getOptions().id == form) {
                name = node.getOptions().name.toLowerCase();
                break;
            }
        }
        switch (name) {
            case 'dial':
                formComponent = <DialForm formObj={formObj} />;
                break;
            case 'hangup':
                formComponent = <HangupForm formObj={formObj} />;
                break;
            case 'menu':
                formComponent = <MenuForm formObj={formObj} nodeObj={nodeObj} />;
                break;
            case 'router':
                formComponent = <></>;
                break;
            case 'gather':
                formComponent = <></>;
                break;
            case 'go to':
                formComponent = <></>;
                break;
            case 'hours':
                formComponent = <></>;
                break;
            case 'pixel':
                formComponent = <></>;
                break;
            case 'play':
                formComponent = <></>;
                break;
            case 'voicemail':
                formComponent = <></>;
                break;
        };

        return (<form key={form} style={{ display: (form == nodeId) ? 'block' : 'none' }}>
            {formComponent}
        </form>);
    });

    // The Main format of the forms is ready

    return (
        <div className="form-content">{components}</div>
    )
}

export default FormContent