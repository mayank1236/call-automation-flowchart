import React, { useContext, useEffect, useState } from 'react';
import DialForm from '../forms/DialForm';
import HangupForm from '../forms/HangupForm';
import MenuForm from '../forms/MenuForm';
import GatherForm from '../forms/GatherForm';
import GotoForm from '../forms/GotoForm';
import HoursForm from '../forms/HoursForm';
import RouterForm from '../forms/RouterForm';
import PixelForm from '../forms/PixelForm';
import PlayForm from '../forms/PlayForm';
import VoicemailForm from '../forms/VoicemailForm';

interface formTypesObj {
    [key: string]: any
}

const FormContent = ({ formObj, nodeObj }: { formObj: any, nodeObj: any }) => {
    const nodeId = formObj?.formIsOpen;
    const forms: formTypesObj | undefined = formObj?.forms;
    const nodes = nodeObj?.nodes;

    const [rules, setRules] = useState(['']);

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
                formComponent = <RouterForm formObj={formObj} nodeObj={nodeObj} />;
                break;
            case 'gather':
                formComponent = <GatherForm formObj={formObj} />;
                break;
            case 'go to':
                formComponent = <GotoForm formObj={formObj} nodeObj={nodeObj} />;
                break;
            case 'hours':
                formComponent = <HoursForm formObj={formObj} />;
                break;
            case 'pixel':
                formComponent = <PixelForm nodeObj={nodeObj} formObj={formObj} />;
                break;
            case 'play':
                formComponent = <PlayForm formObj={formObj} />;
                break;
            case 'voicemail':
                formComponent = <VoicemailForm formObj={formObj} />;
                break;
        };

        return (<form key={form} style={{ display: (form == nodeId) ? 'block' : 'none' }}>
            {formComponent}
        </form>);
    });

    // The Main format of the forms is ready

    return (
        <div className="form-content">
            {rules[0].length > 0 && (
                <div className="form-warnings">
                    <ul>
                        {
                            rules.map(rule => (<li>{rule}</li>))
                        }
                    </ul>
                </div>
            )}
            {components}
        </div>
    )
}

export default FormContent