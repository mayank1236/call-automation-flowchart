import { DefaultLinkModel, LabelModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface DeleteLabelOptions extends BaseModelOptions {
    value?: string,
}

export class DeleteLabelModel extends LabelModel {

    constructor(options: DeleteLabelOptions = {}) {
        super({
            ...options,
            type: 'editable-label'
        });
    }

    serialize() {
        return {
            ...super.serialize(),
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
    }
}