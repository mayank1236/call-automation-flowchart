import React from 'react'

const MainField = ({name, formType}: {
  name: string;
  formType: any;
}) => {
  return (
    <div className="field-container">
      <label className="name">{name}</label>
      <div className="field">
        <input type={formType} />
      </div>
    </div>
  )
}

export default MainField