import React, { SyntheticEvent, useEffect, useState } from 'react'

const MainField = ({ name, inputType, formObj }: {
  name: string;
  inputType: any;
  formObj: any;
}) => {
  const inputName = name.toLowerCase();
  const nodeId = formObj?.formIsOpen;

  const handleValue = (e: SyntheticEvent) => {
    formObj?.updateForm((prev: any) => {
      return { ...prev, [nodeId]: { ...prev[nodeId], [inputName]: (e.target as HTMLInputElement).value } }
    });
  }

  return (
    <div className="field-container">
      <label className="name">{name}</label>
      <div className="field">
        <input
          value={formObj?.forms[nodeId][inputName] || ''}
          onChange={handleValue}
          type={inputType}
        />
      </div>
    </div>
  )
}

export default MainField