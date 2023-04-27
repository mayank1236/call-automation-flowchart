import React, { useContext, useEffect } from 'react'

import yaml from 'js-yaml';

import './style.css';
import { NodeContext } from '../../context/node';
import { FormContext } from '../../context/form';
import useLocalStorage from '../../hooks/localStorage';


const MainForm = () => {
  const [mod, setMod] = useLocalStorage('modelState', {});
  const [formState, setFormState] = useLocalStorage('formState', {});

  const nodeObj = useContext(NodeContext);
  const model = nodeObj?.model;

  const formObj = useContext(FormContext);
  const form = formObj?.forms;

  const handlePublish = (e: any) => {
    e.preventDefault();

    model.getNodes().forEach((node: any) => {
      // iterate over all the in and out ports of the node
      Object.values(node.getPorts()).forEach((port: any) => {
        // get all the links that are connected to the port
        const links = port.getLinks();
        // iterate over all the links and fetch the nodes that are connected to each other
        Object.values(links).forEach((link: any) => {
          const sourceNode = link.getSourcePort().getNode();
          const targetNode = link.getTargetPort().getNode();
          console.log(`${sourceNode.options.name} is connected to ${targetNode.options.name}`);
        });
      });
    });
  }

  const handleDraft = (e: any) => {
    e.preventDefault();
    model.setZoomLevel(100);
    const serialized = model.serialize()
    setMod(serialized);
    setFormState(form);
  }
  // iterate over all the nodes in the diagram model


  return (
    <div className="mainform-container">
      <span>Call Flows</span>
      <div className="form">
        <form>
          <input />
          <button onClick={handleDraft} type="button">Save Draft</button>
          <button onClick={handlePublish} type="button">Publish</button>
        </form>
      </div>
    </div>
  )
}

export default MainForm