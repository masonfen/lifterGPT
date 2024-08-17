
import React from 'react';

function WeightSelection({ weight, onChange }) {
  const weightOptions = [];

  //generate options for the dropdown (100 to 300 pounds)
  for (let i = 100; i <= 300; i += 5) {
    weightOptions.push(i);
  }

  return (
     <select value={weight} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled>Select your weight</option>
      {weightOptions.map((weightOption) => (
        <option key={weightOption} value={weightOption}>
          {weightOption} lbs
        </option>
      ))}
    </select>
  );
}

export default WeightSelection;
