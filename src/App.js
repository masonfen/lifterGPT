import React, { useState, useEffect } from 'react';
import './App.css';

// COMPONENTS 
import Button from './components/Button';
import GPT_Title from './components/GPT_Title';
import LifterTitle from './components/LifterTitle';
import WeightSelection from './components/WeightSelection';
import apiKey from './components/apiKey';

// CHATGPT imports
import { OpenAI } from 'openai';


function App() {
  // State management for GPT-4 interaction
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

//    ****State Management**** (manages state of certain conditions)

const [selectedGender, setSelectedGender] = useState(null);

const [selectedFocus, setSelectedFocus] = useState(null);

const [weight, setWeight] = useState('');




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
        max_tokens: 100, //adjust token amount
        temperature: 0.2, //(0.1 - 0.5) --> low temperature == safe response, not as creative
      });                 //(0.7 - 1.0+)--> high temperature == more creative and less predictable

      setResponse(result.choices[0].message.content); // Set the response
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse('An error occurred while generating the response.');
    }
  };

  //Handles selected Gender type
  const handleGenderSelection = (button) => {setSelectedGender(button);
  };

  const handleFocusSelection = (button) => {setSelectedFocus(button);
  };

  const handleWeightChange = (value) => setWeight(value);

  const handleSubmit = () => {
    const generatedPrompt = `What kind of workout is best for someone who is ${selectedGender}, who weighs ${weight} pounds, and who wants to focus on ${selectedFocus}?`;
    console.log('Generated prompt:', generatedPrompt); //USE FOR DEBUGGING --> inspect element on page and go to console
    setPrompt(generatedPrompt)
  };

  //useEffect to trigger response generation when prompt is succesfully updated
  useEffect(() => {
    if (prompt) {
      generateResponse();
    }
  }, [prompt]);



  // Render the component
  return (
    <div className="App">
      <div className="title-container">
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
        <Button label="Hypertrophy" onClick={() => handleFocusSelection('hypertrophy')}
          style={{ backgroundColor: selectedFocus === 'hypertrophy' ? 'red' : 'grey' }}
        />
        <Button label="Strength" onClick={() => handleFocusSelection('strength')}
          style={{ backgroundColor: selectedFocus === 'strength' ? 'red' : 'grey' }}
        />
      </div>

      {/* assigning workout type */}
      <div className="WeightSelection-container">
        <WeightSelection weight={weight} onChange={handleWeightChange} />
      </div>

      {/* generate GPT prompt  */}
      <div className="Continue-container">
        <Button label="See what works for you!" onClick={handleSubmit} />
      </div>


    {/* Display generated response */}

      <h3>Workout Plan:</h3>
      <div className = "response-box">
      {response}

      </div>

    </div>
  );
}

export default App;
