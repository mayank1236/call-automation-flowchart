import * as React from 'react';

import { DeleteLabelModel } from './DeleteLabelModel';
import styled from '@emotion/styled';
// import { action } from '@storybook/addon-actions';

export interface FlowAliasLabelWidgetProps {
    model: DeleteLabelModel;
}

namespace S {
    // NOTE: this CSS rules allows to interact with elements in label
    export const Label = styled.div`
		user-select: none;
		pointer-events: auto;
	`;
}

// now we can render all what we want in the label
const DeleteLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = (props) => {
    const [str, setStr] = React.useState(props.model.value);

    return (
        <S.Label>
            {/* <input
                value={str}
                onChange={(event) => {
                    const newVal = event.target.value;

                    // update value both in internal component state
                    setStr(newVal);
                    // and in model object
                    props.model.value = newVal;
                }}
            /> */}

            <button onClick={() => console.log('button is clicked')}>Click me!</button>
        </S.Label>
    );
};

export default DeleteLabelWidget;