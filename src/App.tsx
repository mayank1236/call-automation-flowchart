import { useContext, useEffect, useState } from 'react'

import FlowChart from './components/flowchart';
import NodeButton from './components/nodeButton';

import './App.css'
import MainForm from './components/mainForm';
import { NodeContext } from './context/node';
import Form from './components/form';

function App() {
  return (
    <div className="container">
      <div className="main-form">
        <MainForm />
      </div>
      <div className="flowchart">
        <NodeButton />
        <FlowChart />
        <Form />
      </div>
    </div>
  )
}

export default App
