// FormComponent.jsx
import React from 'react';

export default function FormComponent({ checked, onChange }) {
  return (
    <form>
      <label>
        <input
          name="checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        Show cluster circles
      </label>
    </form>
  );
}
