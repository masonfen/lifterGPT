import React, { useState } from 'react';

function AddEquipment() {
    //State management --> setequipment holds array of added attributes
    //Current equipment --> string that holds value of current input field
    const [equipment, setEquipment] = useState([]);
    const [currentEquipment, setCurrentEquipment] = useState('');

    //Handle Input Change
    const handleInputChange = (event) => {
        setCurrentEquipment(event.target.value);
    };

    const handleAddEquipment = () => {
        if (currentEquipment.trim()) {
            setEquipment([...equipment, currentEquipment.trim()]);
            setCurrentEquipment('');
        }    
    };
    return (
        <div>
            <input
                type="text"
                value={currentEquipment}
                onChange={handleInputChange}
                placeholder="Enter equipment"
            />
            <button onClick={handleAddEquipment}>Add Equipment</button>
            <ul>
                {equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
    export default AddEquipment


