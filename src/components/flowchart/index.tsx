import React, { RefObject, useContext, useEffect, useRef, useState } from 'react'

import {
  CanvasWidget
} from '@projectstorm/react-canvas-core';

import './style.css';
import { NodeContext } from '../../context/node';
import { FormContext } from '../../context/form';

// The FlowChart Component
const FlowChart = () => {
  // const canvas = document.querySelector('.canvas')
  const [zoomLevel, setZoomLevel] = useState(100);
  let pos: {
    x: number;
    y: number;
  };

  const nodeObj = useContext(NodeContext);
  const engine = nodeObj?.engine;
  const model = nodeObj?.model;
  const formObj = useContext(FormContext);

  const handleZoomIn = (e: any) => {
    if (zoomLevel < 300) {
      setZoomLevel(model.getZoomLevel() + 20);
    }
  };

  const handleZoomOut = (e: any) => {
    if (zoomLevel > 20) {
      setZoomLevel(model.getZoomLevel() - 20);
    }
  };

  nodeObj?.nodes.forEach((node) => {
    model.addNode(node);
  });

  useEffect(() => {
    model.setZoomLevel(zoomLevel);
  }, [zoomLevel])

  useEffect(() => {
    const elements = [...document.querySelectorAll('.node')];

    const onMouseDown = (e: any) => {
      let i: number;
      elements.forEach((el, index) => {
        if (e.currentTarget == el) {
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
        if (e.currentTarget == el) {
          i = index
          currentPos = nodeObj?.nodes[i].getPosition();
          if (currentPos && (currentPos['x'] == pos['x'] || currentPos['y'] == pos['y'])) {
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
    <>
      <div className="zoom-wrap">
        <button className="zoom" onClick={handleZoomIn}>+</button>
        <button className="zoom" onClick={handleZoomOut}>-</button>
      </div>
      <CanvasWidget className="canvas" engine={engine} />
    </>
  )
}

export default FlowChart