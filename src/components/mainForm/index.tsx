import React, { useContext, useEffect } from 'react'

import './style.css';
import { NodeContext } from '../../context/node';
import { FormContext } from '../../context/form';
import useLocalStorage from '../../hooks/localStorage';

// const requirements = {

// }

const MainForm = () => {
  const [mod, setMod] = useLocalStorage('modelState', {});
  const [formState, setFormState] = useLocalStorage('formState', {});

  const nodeObj = useContext(NodeContext);
  const model = nodeObj?.model;

  const formObj = useContext(FormContext);
  const form: { [key: string]: any } | undefined = formObj?.forms;
  const disabled = form && nodeObj && Object.values(nodeObj.nodes).map((val: any, index: number, arr: any) => {
    let key = val.getOptions().id;
    if (index == 0) {
      if (form[key] != undefined && form[key]['next'].length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (index + 1 != arr.length) {
        if ((form[key]['next'] != undefined || form[key]["On Key Press"] != undefined || form[key]["Routes"] != undefined)
          &&
          (form[key]['next'].length > 0 || (form[key]["On Key Press"] && form[key]["On Key Press"].length > 0) || (form[key]["Routes"] && form[key]["Routes"].length > 0))) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  });


  const handlePublish = (e: any) => {
    e.preventDefault();

    model.setZoomLevel(100);
    const serialized = model.serialize();
    console.log(serialized, form)
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
      {
        disabled?.includes(false) ?
          (<p style={{ color: '#dc3545', fontSize: "14px" }}>📌 One or more Nodes failed validation</p>) : (<></>)
      }
      <div className="form">
        <form>
          <input />
          <button onClick={handleDraft} type="button">Save Draft</button>
          <button onClick={handlePublish} className="mainBtn" disabled={disabled?.includes(false)} type="button">Publish</button>
        </form>
      </div>
    </div>
  )
}

export default MainForm