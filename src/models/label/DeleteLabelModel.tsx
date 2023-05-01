import { DefaultLinkModel, LabelModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface DeleteLabelOptions extends BaseModelOptions {
    formObj?: any
}

export class DeleteLabelModel extends LabelModel {
    formObj;

    constructor(options: DeleteLabelOptions = {}) {
        super({
            ...options,
            type: 'editable-label'
        });
        this.formObj = options.formObj;
    }

    serialize() {
        return {
            ...super.serialize(),
            formObj: this.formObj
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.formObj = event.data.formObj;
    }
}