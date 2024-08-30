import React, { useState } from 'react';
// import './EquipmentInput.css';

function EquipmentInput() {
    const [equipment, setEquipment] = useState([]);
    const [currentEquipment, setCurrentEquipment] = useState('');

    // Handle the change of the current input
    const handleInputChange = (event) => {
        setCurrentEquipment(event.target.value);
    };

    // Handle adding equipment to the list
    const handleAddEquipment = () => {
        if (currentEquipment.trim()) {
            setEquipment([...equipment, currentEquipment.trim()]);
            setCurrentEquipment(''); // Clear the input for the next equipment
        }
    };

    return (
        <div className="equipment-input-container">
            {equipment.map((item, index) => (
                <div key={index} className="equipment-item">
                    {item}
                </div>
            ))}
            <input
                type="text"
                value={currentEquipment}
                onChange={handleInputChange}
                placeholder="Enter equipment"
                className="equipment-input"
            />
            <button onClick={handleAddEquipment} className="add-equipment-button">
                Add Equipment
            </button>
        </div>
    );
}

export default EquipmentInput;



