import React, { useState, useEffect } from 'react';
import './App.css';

// COMPONENTS 
import Button from './components/Button';
import GPT_Title from './components/GPT_Title';
import LifterTitle from './components/LifterTitle';
import WeightSelection from './components/WeightSelection';
import FeetSelection from './components/FeetSelection';
import InchSelection from './components/InchSelection';
import apiKey from './components/apiKey';
import AddEquipment from './components/AddEquipment';

// CHATGPT imports
import { OpenAI } from 'openai';


function App() {
  //  GPT-4 interaction state management --> prompt and response
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

//    ****State Management**** --> set new variabls that store their data

const [selectedGender, setSelectedGender] = useState(null);

const [selectedFocus, setSelectedFocus] = useState(null);

const [selectedWeight, setWeight] = useState('');
const [feet, setFeet] = useState('');
const [inch, setInch] = useState('');

const [selectedEquipment, setEquipment] = useState('')

  // Initialize OpenAI client using API key
  const openai = new OpenAI({
    apiKey: apiKey, 
    dangerouslyAllowBrowser: true, //keep true to allow project to work (openai security measure) 
  });

  // Function to generate a response from GPT-4
  const generateResponse = async () => {
    try {
      const result = await openai.chat.completions.create({
        model: 'gpt-4', //  <------- **SELECT MODEL TYPE FOR CHATGPT HERE**
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500, //adjust token amount
        temperature: 1, //(0.1 - 0.5) --> low temperature == safe response, not as creative
      });                 //(0.7 - 1.0+)--> high temperature == more creative and less predictable

      setResponse(result.choices[0].message.content); // Set the response
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse('An error occurred while generating the response.');
    }
  };

  //if button is selected, store it as the *SELECTED* variable
  const handleGenderSelection = (button) => {setSelectedGender(button);
  };

  const handleFocusSelection = (button) => {setSelectedFocus(button);
  };

  const handleWeightChange = (value) => setWeight(value);

  const handleFeetChange = (value) => setFeet(value);

  const handleInchChange = (value) => setInch(value);

  const handleAddEquipment = (value) => setEquipment(value);

  const handleSubmit = () => {

    const generatedPrompt = 
    
    // about the user
    `Give the best workout program for someone who is a ${selectedGender}, wants to focus their workout program towards ${selectedFocus}.
     They weigh about ${selectedWeight}, and their height is ${feet} feet, and ${inch} inches.

      Make sure the program is geared towards, and specifically utilizes
    thes pieces of equipment and nothing else: ${selectedEquipment}
    
    
    
    Please provide a 5-day workout plan in a structured format with the following details:
    - Briefly describe what the workout is geared towards and how it is personalized.
    - Use <strong> tags for bold text.
    - Use <ul> and <li> tags to create bullet points.
    - Number the days (Day 1, Day 2, etc.) with <strong> tags.
    NOTE: make sure that the response fits in the cooresponding 600px response box that it is in`;


    console.log('Generated prompt:', generatedPrompt); //USE FOR DEBUGGING --> inspect element on page and go to console
    setPrompt(generatedPrompt)
  };

  //useEffect to trigger response generation when prompt is succesfully updated
  useEffect(() => {
    if (prompt) {
      generateResponse();
    } // eslint-disable-next-line
  }, [prompt]);



  return (
    <div className="App">
      <div className="title-container">         {/*eslint-disable-next-line*/}
        <LifterTitle /> <GPT_Title />
      </div>

      {/* buttons for assigning gender roles */}
      <div className="Gender-container">
        <Button label="Male lifter" onClick={() => handleGenderSelection('male')}
          style={{ backgroundColor: selectedGender === 'male' ? 'blue' : 'grey' }}
        />
        <Button label="Female lifter" onClick={() => handleGenderSelection('female')}
          style={{ backgroundColor: selectedGender === 'female' ? 'blue' : 'grey' }}
        />
      </div>

      {/* buttons for assigning goal type */}
      <div className="GoalType-container">
        <Button label="Build Muscle" onClick={() => handleFocusSelection('hypertrophy')}
          style={{ backgroundColor: selectedFocus === 'hypertrophy' ? 'red' : 'grey' }}
        />
        <Button label="Strength" onClick={() => handleFocusSelection('strength')}
          style={{ backgroundColor: selectedFocus === 'strength' ? 'red' : 'grey' }}
        />
        <Button label="Fat Loss" onClick={() => handleFocusSelection('fatLoss')}
          style={{ backgroundColor: selectedFocus === 'fatLoss' ? 'red' : 'grey' }}
        />
        <Button label="Overall health" onClick={() => handleFocusSelection('overallHealth')}
          style={{ backgroundColor: selectedFocus === 'overallHealth' ? 'red' : 'grey' }}
        />
      </div>

      {/* assigning weight */}
      <div className="WeightSelection-container">
        <WeightSelection weight={selectedWeight} onChange={handleWeightChange} />
      </div>

     {/* assigning height */}
     <div className="HeightSelection-container">
        <FeetSelection feet={feet} onChange={handleFeetChange} />
        <InchSelection inch={inch} onChange={handleInchChange} />
      </div>
    
    {/* list for available workout equipment */}
    <div className = "Equipment-container">
      <AddEquipment equipment = {selectedEquipment} onChange = {handleAddEquipment}/>
    </div>

      {/* generate GPT prompt  */}
      <div className="GeneratePrompt-container">
        <Button label="See what works for you!" onClick={handleSubmit} />
      </div>


    {/* Display generated response */}

      <h3>Workout Plan:</h3>
      <div className = "response-box">
      <div dangerouslySetInnerHTML={{__html: response}} />

      </div>

    </div>
  );
}

export default App;
