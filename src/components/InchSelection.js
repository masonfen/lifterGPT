
import React from 'react';

function InchSelection({ inch, onChange }) {
  const inchOptions = [];

  //generate options for the dropdown (4'11 - 7'0)
  for (let i = 0; i <= 11; i += 1) {
    inchOptions.push(i);
  }

  return (
     <select value={inch} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled>Select your height in inches</option>
      {inchOptions.map((inchOption) => (
        <option key={inchOption} value={inchOption}>
          {inchOption} "
        </option>
      ))}
    </select>
  );
}

export default InchSelection;