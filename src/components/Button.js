import React from 'react';

function Button({ label, onClick, style }) {
    return (
      <button className="custom-button" onClick={onClick} style={style}>
        {label}
      </button>
    );
  }

  export default Button