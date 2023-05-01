import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import FormProvider from './context/form'
import NodeProvider from './context/node'
import './index.css'

window.addEventListener('beforeunload', (event) => {
  // event.preventDefault();
  if (localStorage.getItem('modelState') != undefined && localStorage.getItem('modelState') != null) {
    return undefined;
  } else {
    event.returnValue = 'Changes you made may not be saved.';
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FormProvider>
    <NodeProvider>
      <App />
    </NodeProvider>
  </FormProvider>
)
