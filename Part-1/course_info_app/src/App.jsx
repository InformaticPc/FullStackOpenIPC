import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log('###############');
  console.log('rendering with counter value', counter);

  const increaseByOne = () => {
    console.log('increasing value, before', counter);
    setCounter(counter + 1);
  };

  const deCreaseByOne = () => {
    console.log('decreasing value, before', counter);
    setCounter(counter - 1);
  };
  const setToZero = () => {
    console.log('resetting to zero, value before', counter);
    setCounter(0);
  };

  return (
    <div>
      <Display counter={counter} />
      <Button event={increaseByOne} name="PLUS" />
      <Button event={deCreaseByOne} name="LESS" />
      <Button event={setToZero} name="ZERO" />
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
