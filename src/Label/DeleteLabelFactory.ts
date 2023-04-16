import * as React from 'react';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';

import { DeleteLabelModel } from './DeleteLabelModel';
import DeleteLabelWidget from './DeleteLabelWidget';

export class DeleteLabelFactory extends AbstractReactFactory<DeleteLabelModel, DiagramEngine> {
    constructor() {
        super('delete-label');
    }

    generateModel(): DeleteLabelModel {
        return new DeleteLabelModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<DeleteLabelModel>): JSX.Element {
        return <DeleteLabelWidget model={ event.model } />;
    }
}