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
    setClicks({
      ...clicks,
      // spread syntax needs to be the first line,
      // because ...spread in obj brings ALL the properties of that obj ALWAYS
      // so you first bring the whole old obj
      // then overide the property that you want
      left: clicks.left + 1,
    });
  };
  const handlerRightclick = () => {
    setClicks({ ...clicks, right: clicks.right + 1 });
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
