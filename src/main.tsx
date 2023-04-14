import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FormProvider from './context/form'
import NodeProvider from './context/node'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FormProvider>
    <NodeProvider>
      <App />
    </NodeProvider>
  </FormProvider>
)
