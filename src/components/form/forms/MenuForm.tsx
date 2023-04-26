import React, { useEffect, useState } from 'react'
import MainField from '../formComponents/mainField'
import RecordingSection from '../formComponents/recordingSection'
import NodeButton from '../../nodeButton';
import { DefaultLabelModel, DefaultLinkModel, DefaultNodeModel } from '@projectstorm/react-diagrams';

const MenuForm = ({ formObj, nodeObj }: { formObj: any, nodeObj: any }) => {
    const [btnListClicked, setBtnListClicked] = useState(false);
    const [toggle, setToggle] = useState(false);

    const nodeId = formObj.formIsOpen;
    const [menuNode, setMenuNode] = useState<DefaultNodeModel>();


    useEffect(() => {
        document.querySelectorAll('.toggle-button-list .btn-container button').forEach((button) => {
            button.addEventListener('click', createLink);
        });

        return () => {
            document.querySelectorAll('.toggle-button-list .btn-container button').forEach((button) => {
                button.removeEventListener('click', createLink);
            });
        }
    }, []);

    useEffect(() => {
        if (btnListClicked && menuNode) {
            const newLink = new DefaultLinkModel();
            const src = menuNode?.getOutPorts()[0];
            const target = nodeObj.nodes[nodeObj.nodes.length - 1].getInPorts()[0];
            // if (menuNode?.getOptions().id != nodeObj.nodes[nodeObj.nodes.lenght - 1]?.getOptions().id) {
            src && newLink.setSourcePort(src);
            target && newLink.setTargetPort(target);

            const updatedModel = nodeObj.model.addLink(newLink);
            newLink.fireEvent({ targetPort: target }, 'targetPortChanged');
            setBtnListClicked(false);
        }

        menuNode && formObj?.updateForm((prev: any) => {
            let targetValue: { [key: string]: any } = {};

            Object.values(menuNode.getOutPorts()[0].getLinks()).forEach((route, index) => {
                targetValue[index] = (route.getTargetPort().getNode() as DefaultNodeModel).getOptions().id;
            });

            return { ...prev, [nodeId]: { ...prev[nodeId], ['menuRoutes']: targetValue } }
        });

    }, [nodeObj.nodes]);

    useEffect(() => {
        (document.querySelector('.toggle-button-list .btn-container') as HTMLElement).style.display = toggle ? 'block' : 'none';
    }, [toggle]);

    if (!menuNode) {
        nodeObj.nodes.forEach((node: any) => {
            if (node.getOptions().id == nodeId) {
                setMenuNode(node);
            }
        });
    }

    function createLink(e: any) {
        setToggle(false);
        setBtnListClicked(true);
    }

    const handleClick = (e: any) => {
        setToggle(!toggle);
    }

    return (
        <>
            <MainField formObj={formObj} name="Node Name" inputType="text" />
            <MainField formObj={formObj} name="Timeout (sec)" inputType="number" />
            <MainField formObj={formObj} name="Retries" inputType="number" />
            <RecordingSection formObj={formObj} />
            <MainField formObj={formObj} name="Menu Tag Name" inputType="text" />
            <div>
                <label
                    style={{
                        marginBottom: "20px",
                        padding: "0px 0px 10px",
                        borderBottom: "1px solid white",
                        width: "100%"
                    }}
                >Menu Routes</label>
                <div className="toggle-button-list">
                    <button
                        onClick={handleClick}
                        disabled={menuNode && (Object.keys(menuNode.getOutPorts()[0].getLinks()).length > 9)}
                        className="btn"
                        type="button"
                    >Add Route </button>
                    <NodeButton />
                </div>
                {
                    menuNode && Object.values(menuNode.getOutPorts()[0].getLinks()).map((route, index) => {
                        return (
                            <div key={index} className="field-container">
                                <div className="field" style={{
                                    background: "#141722",
                                    padding: "0.6rem 1rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer"
                                }}>
                                    <label>
                                        Press
                                        <span style={{ marginLeft: "5px", fontSize: "15px" }}>{index}</span>
                                        <span style={{ marginLeft: "20px", fontSize: "15px" }}>
                                            {(route.getTargetPort().getNode() as DefaultNodeModel).getOptions().name}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MenuForm