import React, { useContext, useEffect, useState } from 'react';

import {
  CanvasWidget
} from '@projectstorm/react-canvas-core';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';

import './style.css';
import { NodeContext } from '../../context/node';
import { FormContext } from '../../context/form';
import NodeButton from '../nodeButton';

// The FlowChart Component
const FlowChart = () => {
  // const canvas = document.querySelector('.canvas')
  const [zoomLevel, setZoomLevel] = useState(100);
  let pos: {
    x: number;
    y: number;
  };

  // Show a list buttons that create nodes on right click
  useEffect(() => {
    document.querySelector('.button-list')?.addEventListener('click', () => {
      (document.querySelector('.button-list') as HTMLElement).style.display = 'none';
    });

    document.querySelector('.canvas')?.addEventListener('contextmenu', (e) => {
      const event = e as MouseEvent;
      e.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      if (e.currentTarget) {
        (document.querySelector('.button-list') as HTMLElement).style.display = 'block';
        (document.querySelector('.button-list') as HTMLElement).style.top = `${y}px`;
        (document.querySelector('.button-list') as HTMLElement).style.left = `${x}px`;
      }
    });

    // Add event listener to hide the button-list when clicked outside the element
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.button-list') && document.querySelector('.button-list')) {
        (document.querySelector('.button-list') as HTMLElement).style.display = 'none';
      }
    });
  }, [])

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

  nodeObj?.nodes.forEach((node: DefaultNodeModel) => {
    model.addNode(node);
  });

  useEffect(() => {
    model.setZoomLevel(zoomLevel);
  }, [zoomLevel])

  useEffect(() => {
    const elements = [...document.querySelectorAll('.node')];

    const onMouseDown = (e: any) => {
      elements.forEach((el, index) => {
        if (e.currentTarget == el) {
          pos = nodeObj?.nodes[index].getPosition();
        }
      });
      return;
    };

    const onMouseUp = (e: any) => {
      let currentPos;
      elements.forEach((el, index) => {
        if (e.currentTarget == el) {
          currentPos = nodeObj?.nodes[index].getPosition();
          if (currentPos && (currentPos['x'] == pos['x'] && currentPos['y'] == pos['y'])) {
            // NO FORM ON INBOUND NODE CLICK!
            if (index == 0) {
              return;
            }
            formObj?.openForm(nodeObj?.nodes[index].getOptions().id)
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

    // ADD NEW EVENT LISTENERS
    addListeners();

    // REMOVE PREVIOUS LISTENERS
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
      <div className="button-list">
        <NodeButton />
      </div>
    </>
  )
}

export default FlowChart