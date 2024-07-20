// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <div className="title-container">
      <LifterTitle /> <GPT_Title />
    </div>

{/* buttons for assigning gender roles */}
    <div className= "Gender-container">
    <Button label = "Male lifter" onClick={() => alert('Male clicked!')} />
    <Button label = "Female lifter" onClick={() => alert('Female clicked')}/>
    </div>

{/* buttons for assigning goal type */}
    <div className= "GoalType-container">
    <Button label= "Hypertrophy" onClick={() => alert('Hypertrophy clicked!')} />
    <Button label= "Strength" onClick={() => alert('Strength clicked!')} />
    </div>

{/* assigning workout type */}
    <div className= "WeightSelection-container">
      <WeightSelection />
    </div>

    <div className= "GO-container">
      <Button label = "GO" onClick={() => alert('GO clicked!')} />
    </div>

    </div>



  );
}





                                           // *****COMPONENTS*****

//titles for the app
function LifterTitle() {
  return (
    <h1 className ="lifter_title">Lifter</h1>
  );
}

function GPT_Title() {
  return (
    <h1 className = "gpt_title">GPT</h1>
  );
}

//button component
function Button({ label, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default App;


function WeightSelection() {
  return (
    <form>
      <label>
        Weight:
        <input type="text" name="name" />
      </label> 
    </form>
  )
}