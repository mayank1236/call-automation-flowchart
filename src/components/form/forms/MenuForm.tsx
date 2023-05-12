import React, { useEffect, useState, useRef } from 'react'
import MainField from '../formComponents/mainField'
import RecordingSection from '../formComponents/recordingSection'
import NodeButton from '../../nodeButton';
import { DefaultLabelModel, DefaultLinkModel, DefaultNodeModel } from '@projectstorm/react-diagrams';

const MenuForm = ({ formObj, nodeObj }: { formObj: any, nodeObj: any }) => {
    const [btnListClicked, setBtnListClicked] = useState(false);
    const [toggle, setToggle] = useState(false);
    const toggleButtonListRef = useRef(null);
    const nodeId = formObj?.formIsOpen;
    const [menuNode, setMenuNode] = useState<DefaultNodeModel | undefined>(() => {
        const n = nodeObj.nodes.filter((node: DefaultNodeModel) => {
            if (node.getOptions().id == nodeId && node.getOptions().name == 'Menu') {
                return true;
            }
            return false;
        });
        return n[0];
    });


    useEffect(() => {
        toggleButtonListRef.current && (toggleButtonListRef.current as HTMLElement).querySelectorAll('.btn-container button').forEach((button) => {
            button.addEventListener('click', createLink);
        });

        return () => {
            toggleButtonListRef.current && (toggleButtonListRef.current as HTMLElement).querySelectorAll('.btn-container button').forEach((button) => {
                button.removeEventListener('click', createLink);
            });
        }
    }, []);

    useEffect(() => {
        if (btnListClicked && menuNode) {
            const newLink = new DefaultLinkModel();
            const src = menuNode?.getOutPorts()[0];
            const target = nodeObj.nodes[nodeObj.nodes.length - 1].getInPorts()[0];

            src && newLink.setSourcePort(src);
            target && newLink.setTargetPort(target);

            const updatedModel = nodeObj.model.addLink(newLink);
            newLink.fireEvent({ targetPort: target }, 'targetPortChanged');
            setBtnListClicked(false);
        }
    }, [nodeObj.nodes]);

    useEffect(() => {
        if (toggleButtonListRef.current) {
            ((toggleButtonListRef.current as HTMLElement).querySelector('.btn-container') as HTMLElement).style.display = toggle ? 'block' : 'none';
        }
    }, [toggle]);

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
                <div className="toggle-button-list" ref={toggleButtonListRef}>
                    <button
                        onClick={handleClick}
                        disabled={(formObj.forms[nodeId]['On Key Press'] && formObj.forms[nodeId]['On Key Press'].length > 9)}
                        className="btn"
                        type="button"
                    >Add Route </button>
                    <NodeButton />
                </div>
                {
                    // menuNode && Object.values(menuNode.getOutPorts()[0].getLinks())
                    formObj.forms[nodeId]['On Key Press'] && formObj.forms[nodeId]['On Key Press'].map((route: string, index: number) => {
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
                                            {formObj.forms[route].name}
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