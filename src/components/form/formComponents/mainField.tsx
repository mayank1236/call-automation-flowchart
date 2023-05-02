import React, { SyntheticEvent, useEffect, useState, useRef } from 'react'

const MainField = ({ name, inputType, formObj, label, obj }: {
  name: string;
  inputType: any;
  formObj: any;
  label?: string;
  obj?: number
}) => {
  const inputName = name.toLowerCase();
  const nodeId = formObj?.formIsOpen;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const handleValue = (e: any) => {
    formObj?.updateForm((prev: any) => {
      let targetValue = e.target.value;
      if (inputType == 'file') {
        targetValue = e.target.files[0];
      }
      if (obj != undefined) {
        return { ...prev, [nodeId]: { ...prev[nodeId], [inputName]: { ...prev[nodeId][inputName], [obj]: targetValue } } }
      }
      return { ...prev, [nodeId]: { ...prev[nodeId], [inputName]: targetValue } }
    });
  }

  let component = (<></>);

  switch (inputType) {
    case "file":
      component = (<>
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleValue}
        />
        <button onClick={handleButtonClick}>Choose file</button>
        {formObj?.forms[nodeId][inputName] && <p>Selected file: {formObj?.forms[nodeId][inputName].name}</p>}
      </>);
      break;

    case "textarea":
      component = (<textarea
        value={formObj?.forms[nodeId][inputName] || ''}
        onChange={handleValue}
        rows={3}
      />);
      break;

    default:
      obj != undefined && formObj?.forms[nodeId][inputName] && console.log(formObj?.forms[nodeId][inputName][obj]);
      component = (obj != undefined) ? (
        <input
          value={formObj?.forms[nodeId][inputName] ? formObj?.forms[nodeId][inputName][obj] : ''}
          onChange={handleValue}
          type={inputType}
          style={{ background: "green" }}
        />
      ) : (<input
        value={(formObj?.forms[nodeId][inputName] || '')}
        onChange={handleValue}
        type={inputType}
      />);
      break;
  }

  return (
    <div className="field-container">
      <label className="name">{label ? label : name}</label>
      <div className="field">
        {component}
      </div>
    </div>
  )
}

export default MainField