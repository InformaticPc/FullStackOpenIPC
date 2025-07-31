import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const deCreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button event={increaseByOne} name="PLUS" />
      <Button event={setToZero} name="ZERO" />
      <Button event={deCreaseByOne} name="LESS" />
    </div>
  );
};

const Display = (props) => {
  return <div>{props.counter}</div>;
};

const Button = (prop) => {
  return <button onClick={prop.event}>{prop.name}</button>;
};

export default App;
// Changes in state cause re-rendering...
// https://fullstackopen.com/en/part1/component_state_event_handlers
