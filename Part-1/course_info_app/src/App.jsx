import { useState } from 'react';

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div> the app is used by pressing the buttons </div>;
  }
  return <div> button press history: {props.allClicks.join(' - ')} </div>;
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    console.log(`left event before: ${left}`);
    const updateLeft = left + 1;

    setLeft(updateLeft);
    console.log(`left event AFTER: ${left}`);
    setTotal(updateLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updateRight = right + 1;
    setRight(updateRight);
    setTotal(left + updateRight);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <hr />
      <History allClicks={allClicks} />
      <p>total: {total}</p>
    </div>
  );
};

export default App;
// Part1d Complex state...
// https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
