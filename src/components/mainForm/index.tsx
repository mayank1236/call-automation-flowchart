import React, { useContext } from 'react'
import { NodeContext } from '../../context/node';

import './style.css';

const MainForm = () => {
  const nodeObj = useContext(NodeContext);
  const model = nodeObj?.model;

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
  // iterate over all the nodes in the diagram model
  

  return (
    <div className="mainform-container">
      <span>Call Flows</span>
      <div className="form">
        <form>
          <input />
          <button type="button">Save Draft</button>
          <button onClick={handlePublish} type="button">Publish</button>
        </form>
      </div>
    </div>
  )
}

export default MainForm