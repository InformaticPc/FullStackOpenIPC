import { useState } from 'react';

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  console.log(`left: ${clicks.left}`);
  console.log(`right: ${clicks.right}`);
  // you  can calculate a single property or assign new value but
  // useState callbackfunction will call the whole object
  // so whole obj need to be reassign again
  console.log(`sum: ${clicks.left + 1}`);

  console.log(`Total clicks done: ${clicks.right + clicks.left}`);

  // Like so:
  // ---------------------
  const handlerLeftclick = () => {
    const newClicks = {
      ...clicks, // spread syntax needs to be the first line, for ... some reason?!
      left: clicks.left + 1,
    };
    setClicks(newClicks);
  };
  const handlerRightclick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1,
    };
    setClicks(newClicks);
  };
  // ---------------------

  return (
    <div>
      {clicks.left}
      <button onClick={handlerLeftclick}>left</button>
      <button onClick={handlerRightclick}>right</button>
      {clicks.right}
    </div>
  );
};
export default App;
// Part1d Complex state...
// https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
