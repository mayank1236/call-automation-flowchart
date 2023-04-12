import { createContext, ReactNode, useEffect, useState } from "react";
import createEngine, {
    DefaultDiagramState,
    DefaultNodeModel,
    DefaultPortModel,
    DiagramModel,
} from '@projectstorm/react-diagrams';
// import ZoomAction from "../actions/zoom";

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



//Engine Settings for FlowChart
const engine = createEngine();
const model = new DiagramModel();

// engine.getActionEventBus().registerAction(new ZoomAction());

engine.maxNumberPointsPerLink = 0;

const state = engine.getStateMachine().getCurrentState();
if (state instanceof DefaultDiagramState) {
    state.dragNewLink.config.allowLooseLinks = false;
}

model.registerListener({
    linksUpdated: (e: any) => {
        e.link.registerListener({
            targetPortChanged: (event: any) => {
                const link = e.link;
                const sourcePort = link.getSourcePort() as DefaultPortModel;
                const targetPort = link.getTargetPort() as DefaultPortModel;
                const tPortLinks = targetPort.getLinks();
                const nOfLinks = Object.keys(sourcePort.getLinks()).length;
                const maxLinks = sourcePort.getOptions().maximumLinks;
                if (e.isCreated) {
                    if (maxLinks) {
                        if (nOfLinks >= maxLinks) {
                            sourcePort.setLocked(true);
                        }
                    }
                    link.setLocked(true);
                    Object.keys(tPortLinks).forEach(l => {
                        if (`${link.getOptions().id}` != l) {
                            tPortLinks[l].setLocked(false);
                            tPortLinks[l].getSourcePort().setLocked(false);
                            tPortLinks[l].remove();
                        }
                    });
                }
            }
        })

    },
    // eventDidFire: (e: any)
});

function NodeProvider({ children }: Props) {
    // The Flowchart Engine (Globally declared)
    const mainNode = new DefaultNodeModel({
        name: 'Inbound Call',
        color: 'rgb(0,192,255)',
    });
    mainNode.setPosition(100, 350);
    mainNode
        .addOutPort('')
        .setMaximumLinks(1);

    const [nodes, setNodes] = useState<{}[]>([mainNode]);
    var [id, setId] = useState<number>(0);

    const contextValue = {
        engine,
        model,
        nodes,
        create,
        remove
    }

    const nodeTypes: nodeTypesObj = {
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

    function create(type: string) {
        let node = { ...nodeTypes[type] };
        node['id'] = id;
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
                console.log(keys[i], out[keys[i]])

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

        setNodes(nodes => [...nodes, n]);
        setId(id => id + 1);
    }

    function remove(type: string) {
        return type
    }


    return (
        <NodeContext.Provider value={contextValue}>
            {children}
        </NodeContext.Provider>
    )
}

export default NodeProvider;
