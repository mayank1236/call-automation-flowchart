import React, { useContext } from 'react'
import { NodeContext } from '../../context/node';

import './style.css';

const NodeButton = () => {
  const nodeObj = useContext(NodeContext);  
  const buttons = [
        'dial',
        'hangup',
        'menu',
        'router',
        'gather',
        'go to',
        'hours',
        'pixel',
        'play',
        'voicemail'
    ]

    const handleClick = (e: React.SyntheticEvent) => {
      nodeObj?.create((event?.target as HTMLInputElement).name)
    }

  return (
    <div className="btn-container">
        {buttons.map(button => (
            <button key={button} type="button" name={button} onClick={handleClick}>{button}</button>
        ))}
    </div>
  )
}

export default NodeButton