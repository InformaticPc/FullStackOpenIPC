import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log('###############');
  console.log('rendering with counter value', counter);

  const increaseByOne = () => {
    console.log('============');
    console.log('increasing value, before', counter);
    setCounter(counter + 1);
  };

  const deCreaseByOne = () => {
    console.log('============');
    console.log('decreasing value, before', counter);
    setCounter(counter - 1);
  };
  const setToZero = () => {
    console.log('============');
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

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ event, name }) => <button onClick={event}>{name}</button>;

export default App;
// Changes in state cause re-rendering...
// https://fullstackopen.com/en/part1/component_state_event_handlers
