import React, { useContext, useEffect, useState } from 'react'

import {
  CanvasWidget
} from '@projectstorm/react-canvas-core';

import './style.css';
import { NodeContext } from '../../context/node';
import { FormContext } from '../../context/form';

// The FlowChart Component
const FlowChart = () => {
  let pos: {
    x: number;
    y: number;
  };
  const nodeObj = useContext(NodeContext);
  const engine = nodeObj?.engine;
  const model = nodeObj?.model;

  const formObj = useContext(FormContext);

  nodeObj?.nodes.forEach((node) => {
    model.addNode(node);
  });

  useEffect(() => {
    const elements = [...document.querySelectorAll('.node')];

    const onMouseDown = (e: any) => {
      let i: number;
      elements.forEach((el, index) => {
        if(e.currentTarget == el) {
          i = index
          pos = nodeObj?.nodes[i].getPosition();
        }
      });
      return;
    };

    const onMouseUp = (e: any) => {
      let i: number;
      let currentPos;
      elements.forEach((el, index) => {
        if(e.currentTarget == el) {
          i = index
          currentPos = nodeObj?.nodes[i].getPosition();
          if(currentPos && (currentPos['x'] == pos['x'] || currentPos['y'] == pos['y'])) {
            formObj?.openForm(i)
            return;
          }
        }
      });
    };

    const addListeners = () => {
      elements.forEach((element, i) => {
        element.addEventListener('mousedown', onMouseDown);
        element.addEventListener('mouseup', onMouseUp);
      });
    };
  
    const removeListeners = () => {
      elements.forEach((element, i) => {
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('mouseup', onMouseUp);
      });
    };

    addListeners();

    // Clean up listeners
    return () => {
      removeListeners();
    }

  }, [nodeObj?.nodes]);

  engine.setModel(model);
  return (
    <CanvasWidget className="canvas" engine={engine} />
  )
}

export default FlowChart