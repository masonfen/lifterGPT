// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <div className="title-container">
      <Title /> <Second_Title />
    </div>
    <div className= "GoalType-container">
    <Button label= "Hypertrophy" onClick={() => alert('Button clicked!')} />
    </div>
    </div>
  );
}

//title for the app
function Title() {
  return (
    <h1 className ="title">Lifter</h1>
  );
}

function Second_Title() {
  return (
    <h1 className = "second_title">GPT</h1>
  );
}

//button for hypertrophy or strength
function Button({ label, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default App;
