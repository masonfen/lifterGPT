
import React from 'react';

function FeetSelection({ feet, onChange }) {
  const feetOptions = [];

  //generate options for the dropdown (4'11 - 7'0)
  for (let i = 4; i <= 7; i += 1) {
    feetOptions.push(i);
  }

  return (
     <select value={feet} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled>Select your height in feet</option>
      {feetOptions.map((feetOption) => (
        <option key={feetOption} value={feetOption}>
          {feetOption} '
        </option>
      ))}
    </select>
  );
}

export default FeetSelection;