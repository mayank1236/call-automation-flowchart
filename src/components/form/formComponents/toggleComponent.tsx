import React from 'react'

const Toggle = ({ name, formObj }: {
  name: string;
  formObj: any;
}) => {
  const inputName = name.toLowerCase();
  const nodeId = formObj?.formIsOpen;
  const checked = !!formObj?.forms[nodeId][inputName];
  function handleChange(e: any) {
    formObj.updateForm((prev: any) => {
      return { ...prev, [nodeId]: { ...prev[nodeId], [inputName]: !checked } }
    })
  }

  return (
    <div className="toggle-switch field-container">
      <label
        className="toggle-switch-label"
        onClick={handleChange}
      >
        {name}
      </label>
      <div>
        <input
          type="checkbox"
          name={name}
          className="toggle-switch-checkbox"
          checked={checked}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Toggle