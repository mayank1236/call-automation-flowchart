import React, { useState, useEffect, useRef } from 'react'
import MainField from '../formComponents/mainField'
import NodeButton from '../../nodeButton'
import { DefaultLinkModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import SelectField from '../formComponents/selectField';

const RouterForm = ({ formObj, nodeObj }: { formObj: any, nodeObj?: any }) => {
    const tags = ['js tag', 'call'];
    const conditions = ['contains', 'less than', 'equal to', 'exists'];
    const filterComp: (index: string, length?: number) => JSX.Element = ((index, length) => {
        return (<div>
            {length && length > 0 ?
                <SelectField label={"type"} name={`${index} type`} obj={length} formObj={formObj} options={['and', 'or']} />
                : <></>}
            <SelectField label={"select tag"} name={`${index} select`} obj={length} options={tags} formObj={formObj} />
            <SelectField label="condition" name={`${index} condition`} obj={length} options={conditions} formObj={formObj} />
            <MainField label={"value"} inputType="text" name={`${index} value`} obj={length} formObj={formObj} />
        </div>)
    });

    const [routesState, setRoutes] = useState<{ [key: string]: any }>(() => {
        const defaultRoutes: { [key: string]: any[] } = {};
        formObj?.forms[formObj?.formIsOpen]['filters'] && Object.keys(formObj?.forms[formObj?.formIsOpen]['filters']).forEach((val: string, index: number) => {
            for (let i = 0; i < formObj?.forms[formObj?.formIsOpen]['filters'][val]; i++) {
                if (!defaultRoutes[val]) {
                    defaultRoutes[val] = [];
                }
                defaultRoutes[val].push(filterComp(val, i));
            }
        });
        return defaultRoutes || {}
    });
    const [btnListClicked, setBtnListClicked] = useState(false);
    const [toggle, setToggle] = useState(false);
    const toggleButtonListRef = useRef(null);
    const nodeId = formObj?.formIsOpen;
    const [routerNode, setRouterNode] = useState<DefaultNodeModel | undefined>(() => {
        const n = nodeObj.nodes.filter((node: DefaultNodeModel) => {
            if (node.getOptions().id == nodeId && node.getOptions().name == 'Router') {
                return true;
            }
            return false;
        });
        return n[0];
    });
    const [stackId, setStackId] = useState(0);



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
        if (btnListClicked && routerNode) {
            const newLink = new DefaultLinkModel();
            const src = routerNode?.getOutPorts()[0];
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

    useEffect(() => {
        formObj?.updateForm((prev: any) => {
            const obj: { [key: string]: any } = {};
            Object.keys(routesState).forEach((val: string) => {
                obj[val] = routesState[val].length;
            });
            return {
                ...prev, [nodeId]: {
                    ...prev[nodeId],
                    ['filters']: obj
                }
            };
        })
    }, [routesState])

    const createLink = (e: any) => {
        setToggle(false);
        setBtnListClicked(true);
    }

    const handleClick = (e: any) => {
        setToggle(!toggle);
    }

    const addFilter = (i: string, route: any) => {
        const length = route ? route.length : 0;
        setRoutes(routes => {
            const r = { ...routes };
            console.log(r)
            if (r[i] == undefined) {
                r[i] = []
            }
            r[i].push(filterComp(i, length));
            return r
        })
    }

    return (
        <>
            <MainField name="Node Name" formObj={formObj} inputType="text" />
            <div>
                <label style={{ marginBottom: "20px", padding: "0px 0px 10px", borderBottom: "1px solid white", width: "100%" }}>Routes</label>
                <div className="toggle-button-list" ref={toggleButtonListRef}>
                    <button
                        onClick={handleClick}
                        className="btn"
                        type="button"
                    >Add Route</button>
                    <NodeButton />
                </div>
                {
                    formObj.forms[nodeId]['Routes'] && formObj.forms[nodeId]['Routes'].map((route: string, index: number) => {
                        return (
                            <div key={route} className="field-container router-filter">
                                <div className="field" style={{
                                    background: "#141722",
                                    padding: "0.6rem 1rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    cursor: "pointer"

                                }}>
                                    <label>
                                        Route
                                        <span style={{ marginLeft: "5px", fontSize: "15px" }}>{index}</span>
                                        <span style={{ marginLeft: "20px", fontSize: "15px" }}>
                                            {formObj.forms[route].name}
                                        </span>
                                    </label>
                                    {routesState[route] && routesState[route].map((element: any, num: number) => {
                                        return (<div
                                            style={{
                                                border: "1px solid white",
                                                padding: "15px 15px 0",
                                                borderRadius: "10px"
                                            }}
                                            key={num}
                                        >{element}</div>)
                                    })}
                                    <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        addFilter(route, routesState[route])
                                    }}
                                        className="green-btn"
                                    >Add Filter +</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RouterForm