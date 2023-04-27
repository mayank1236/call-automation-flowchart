import { DefaultLinkModel, LabelModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface DeleteLabelOptions extends BaseModelOptions {
    value?: string,
}

export class DeleteLabelModel extends LabelModel {
    // value;

    constructor(options: DeleteLabelOptions = {}) {
        super({
            ...options,
            type: 'editable-label'
        });
        // if (options.value != undefined) {
        //     this.value = options.value || '';
        // }
    }

    serialize() {
        return {
            ...super.serialize(),
            // value: this.value,
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        // this.value = event.data.value;
    }
}