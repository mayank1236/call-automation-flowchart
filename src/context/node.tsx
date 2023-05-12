import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import createEngine, {
    DefaultDiagramState,
    DefaultLabelModel,
    DefaultLinkModel,
    DefaultNodeModel,
    DefaultPortModel,
    DiagramModel,
    LabelModel,
} from '@projectstorm/react-diagrams';

import yaml from 'js-yaml'

import { DeleteLabelFatory } from "../models/label/DeleteLabelFactory";
import { DeleteLabelModel } from "../models/label/DeleteLabelModel";
import { FormContext } from "./form";

interface Props {
    children?: ReactNode
    // any props that come into the component
}

interface nodeTypesObj {
    [key: string]: any
}

interface NodeContextInterface {
    engine: any;
    model: any;
    nodes: any[];
    create: (type: any) => any;
    remove: (type: any) => any;
}

export const NodeContext = createContext<NodeContextInterface | null>(null);

export const nodeTypes: nodeTypesObj = {
    'dial': {
        name: 'Dial',
        lineColor: 'rgb(82, 190, 128)',
        out: {
            'On Failure': 1
        },
        in: 1,
    },
    'hangup': {
        name: 'Hangup',
        lineColor: 'rgb(230, 126, 34)',
        out: 0,
        in: 1,
    },
    'menu': {
        name: 'Menu',
        lineColor: 'rgb(0, 62, 112)',
        out: {
            'On Key Press': 10,
            'On Failure': 1
        },
        in: 1
    },
    'router': {
        name: 'Router',
        lineColor: 'rgb(131, 134, 133)',
        out: {
            'Routes': 'any'
        },
        in: 1
    },
    'gather': {
        name: 'Gather',
        lineColor: 'rgb(131, 134, 133)',
        out: {
            'On Success': 1,
            'On Failure': 1
        },
        in: 1
    },
    'go to': {
        name: 'Go To',
        lineColor: 'rgb(131, 134, 133)',
        out: {
            'On Failure': 1
        },
        in: 1
    },
    'hours': {
        name: 'Hours',
        lineColor: 'rgb(154, 200, 213)',
        out: {
            'Open': 1,
            'Closed': 1
        },
        in: 1
    },
    'pixel': {
        name: 'Pixel',
        lineColor: 'rgb(154, 200, 213)',
        out: {
            'On Success': 1
        },
        in: 1
    },
    'play': {
        name: 'Play',
        lineColor: 'rgb(136, 78, 160)',
        out: {
            'On Success': 1
        },
        in: 1
    },
    'voicemail': {
        name: 'Voicemail',
        lineColor: 'rgb(136, 78, 160)',
        out: {
            'On Success': 1
        },
        in: 1
    }
}

//Engine Settings for FlowChart
const engine = createEngine({
    registerDefaultDeleteItemsAction: false
});

engine.maxNumberPointsPerLink = 0;
engine.getLabelFactories().registerFactory(new DeleteLabelFatory());

const state = engine.getStateMachine().getCurrentState();
if (state instanceof DefaultDiagramState) {
    state.dragNewLink.config.allowLooseLinks = false;
}
const model = new DiagramModel();
const draftModel = localStorage.getItem('modelState');

if (draftModel) {
    const loading = JSON.parse(draftModel);
    model.deserializeModel(loading, engine);
    localStorage.removeItem('modelState');
}

const mainNode = new DefaultNodeModel({
    name: 'Inbound Call',
    color: 'rgb(0,192,255)',
});
mainNode.setPosition(100, 350);
mainNode
    .addOutPort('')
    .setMaximumLinks(1);

const nodeState = model.getNodes().length >= 1 ? model.getNodes() : [mainNode];



function NodeProvider({ children }: Props) {
    // The Flowchart Engine (Globally declared)

    const [nodes, setNodes] = useState([...nodeState]);
    const formObj = useContext(FormContext);

    // Event listener for Links
    useEffect(() => {
        model.registerListener({
            linksUpdated: (e: any) => {
                if (e.isCreated) {
                    const link: DefaultLinkModel = e.link;
                    const sourcePort = link.getSourcePort() as DefaultPortModel;
                    const sPortLinks = sourcePort.getLinks();
                    const sourceNodeName = document.querySelector(`[data-nodeid="${sourcePort.getNode().getOptions().id}"] div`)?.getAttribute("data-default-node-name");
                    if (link.getLabels().length < 1 && sourceNodeName != "Menu") {
                        link.addLabel(new DeleteLabelModel({ formObj }));
                    } else if (link.getLabels().length < 1 && sourceNodeName == "Menu") {
                        link.addLabel(new DeleteLabelModel({ formObj }));
                    }
                    e.link.registerListener({
                        targetPortChanged: (event: any) => {
                            const targetPort = link.getTargetPort() as DefaultPortModel;
                            const tPortLinks = targetPort.getLinks();
                            const path = document.querySelector(`[data-linkid="${link.getOptions().id}"]`)?.querySelectorAll("path");
                            const targetNodeName = document.querySelector(`[data-nodeid="${targetPort.getNode().getOptions().id}"] div`)?.getAttribute("data-default-node-name");

                            // close the form on new connection
                            formObj?.closeForm();
                            // updating Forms
                            formObj?.updateForm(prev => {
                                const newForm: { [key: string]: any } = { ...prev };
                                const theNode = sourcePort.getNode() as DefaultNodeModel;
                                const to = targetPort.getNode().getOptions().id;
                                const id = theNode.getOptions().id;
                                const portName = sourcePort.getOptions().name;
                                if (id) {
                                    if (portName == 'On Key Press' || portName == 'Routes') {
                                        const manyTo = Object.values(theNode.getOutPorts()[0].getLinks()).map(newLink => {
                                            return newLink.getTargetPort().getNode().getOptions().id;
                                        })
                                        newForm[id] = { ...newForm[id], [portName]: manyTo }
                                    } else {
                                        newForm[id] = { ...newForm[id], next: to }
                                    }
                                }
                                return newForm;
                            });

                            // Assing label to Menu links
                            if (sourceNodeName == "Menu" && 'On Key Press' == sourcePort.getOptions().name) {
                                Object.keys(sPortLinks).forEach((l, i) => {
                                    if (sPortLinks[l].getLabels().length < 2) {
                                        sPortLinks[l].addLabel(new DefaultLabelModel({ label: `${i}` }));
                                    }
                                });
                            }

                            link.setLocked(true);
                            if (sourceNodeName == 'Inbound Call' && Object.keys(sPortLinks).length >= 1) {
                                sourcePort.setLocked(true);
                            }

                            // Assign labels color
                            Object.keys(nodeTypes).forEach(node => {
                                if (nodeTypes[node].name == sourceNodeName) {
                                    if (
                                        nodeTypes[node]['out'] != 0
                                        && (Object.keys(sPortLinks).length >= nodeTypes[node]['out'][sourcePort.getOptions().name])
                                    ) {
                                        sourcePort.setLocked(true);
                                    } else if (nodeTypes[node]['out'][sourcePort.getOptions().name] == 'any') {
                                        sourcePort.setLocked(false)
                                    }
                                }

                                if (nodeTypes[node].name == targetNodeName) {
                                    if (path) {
                                        link.setColor(nodeTypes[node].lineColor);
                                    }
                                }
                            });

                            Object.keys(tPortLinks).forEach(l => {
                                if (`${link.getOptions().id}` != l) {
                                    tPortLinks[l].setLocked(false);
                                    tPortLinks[l].getSourcePort().setLocked(false);
                                    tPortLinks[l].remove();
                                }
                            });
                            engine.repaintCanvas();
                        },
                        entityRemoved: (e: any) => {
                            if (sourceNodeName == "Menu") {
                                Object.keys(sPortLinks).forEach((l, i) => {
                                    if (sPortLinks[l].getLabels().length == 2) {
                                        sPortLinks[l].getLabels().forEach((lab, index) => {
                                            if (index == 1) {
                                                (lab as DefaultLabelModel).setLabel(`${i}`);
                                            }
                                        })
                                    }
                                })
                            }
                            engine.repaintCanvas();
                        },
                    })
                }
            },
        });
    }, [])

    const contextValue = {
        engine,
        model,
        nodes,
        create,
        remove
    }

    function create(type: string) {
        let node = { ...nodeTypes[type] };
        const n = new DefaultNodeModel({
            name: node.name,
            color: '#050506',
            locked: false
        });
        const out = node.out;

        if (out != 0) {
            let keys = Object.keys(out);

            for (let i = 0; i < keys.length; i++) {
                const port = n.addOutPort(keys[i]);
                if (keys[i] == 'Routes') {
                    continue;
                }
                port.setMaximumLinks(out[keys[i]]);
            }
        }
        const inPort = n.addInPort('');
        inPort.setMaximumLinks(1);
        inPort.setLocked(true);
        const allNodes = model.getNodes();
        const nodePos = allNodes[allNodes.length - 1].getPosition();
        n.setPosition(nodePos.x + 250, nodePos.y);

        // Initialize && updating Forms
        formObj?.updateForm(prev => {
            const i = n.getOptions().id;
            const newForm: { [key: string]: any } = { ...prev }
            if (i) {
                const exists = Object.keys(prev).includes(i);
                if (!exists) {
                    newForm[i] = { name: node.name };
                }
            }
            return newForm;
        });

        setNodes((nodes: any) => {
            return [...nodes, n];
        });
    }

    function remove(nodeid: string) {
        formObj?.delete(nodeid);
        const delNode = nodes.filter((node) => node.getOptions().id == nodeid)[0];
        delNode.remove();
        setNodes(nodes.filter((node) => node.getOptions().id !== nodeid))
    }


    return (
        <NodeContext.Provider value={contextValue}>
            {children}
        </NodeContext.Provider>
    )
}

export default NodeProvider;
