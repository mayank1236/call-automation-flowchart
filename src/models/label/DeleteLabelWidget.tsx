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
        // console.log(link)
        if (link) {
            link.getSourcePort().setLocked(false);
            link.remove();
        }
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