import { useState } from 'react';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // HANDLERS
  const handleGood = () => {
    console.log('clicked good', good);

    setGood(good + 1);
  };

  const handleNeutral = () => {
    console.log('clicked Neutral', good);
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    console.log('clicked bad', good);
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>

      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />

      <h1>Statistics</h1>

      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All: {good + neutral + bad}</p>
    </div>
  );
};

export default App;
// CONTINUE...
// 1.7: UNICAFE STEP 2 -> https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
