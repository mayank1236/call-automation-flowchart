import React from 'react'

const Toggle = ({name, checked, onChange}: {
  name: string;
  checked: any;
  onChange: any;
}) => {
  const disabled = !checked;
  function handleKeyPress(e: any) {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    onChange(!checked);
  }

  return (
    <div className="toggle-switch field-container">
      <label
          className="toggle-switch-label"
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
        >
          {name}
        </label>
      <div>
        <input
          type="checkbox"
          name={name}
          className="toggle-switch-checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default Toggle