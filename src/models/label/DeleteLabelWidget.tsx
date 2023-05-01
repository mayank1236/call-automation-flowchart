import * as React from 'react';

import { DeleteLabelModel } from './DeleteLabelModel';
import '../style.css';

export interface FlowAliasLabelWidgetProps {
    model: DeleteLabelModel;
}

// now we can render all what we want in the label
export const DeleteLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = (props) => {
    const deleteLink = (e: any) => {
        e.preventDefault();
        const link = Object.values(props.model)[Object.values(props.model).length - 1];
        const portName = link.getSourcePort().getOptions().name;
        const theNode = link.getSourcePort().getNode();

        if (link) {
            link.getSourcePort().setLocked(false);
            link.remove();
        }

        props.model.formObj.updateForm((prev: any) => {
            const newForm = { ...prev };
            const nodeId = theNode.getOptions().id;

            if (portName == 'On Key Press' || portName == 'Routes') {
                const manyTo = Object.values(theNode.getOutPorts()[0].getLinks()).map((newLink: any) => {
                    return newLink.getTargetPort().getNode().getOptions().id;
                })
                newForm[nodeId] = {
                    ...newForm[nodeId], [portName]: manyTo
                }
            } else {
                newForm[nodeId] = {
                    ...newForm[nodeId], next: ''
                }
            }

            return newForm;
        })

    }

    return (
        <div className="delete-label">
            <a onClick={deleteLink}>
                <img
                    src="/icons/delete.png"
                    style={{ filter: "invert(1) brightness(200%)" }}
                />
            </a>
        </div>
    );
};