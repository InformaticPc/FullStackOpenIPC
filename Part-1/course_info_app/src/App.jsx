import { useState } from 'react';

/*
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
  // spread syntax needs to be the first line,
  // because ...spread in obj brings ALL the properties of that obj ALWAYS
  // so you first bring the whole old obj
  // then overide the property that you want
  const handlerLeftclick = () => {
    setClicks({ ...clicks, left: clicks.left + 1 });
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
*/
/**
 * NOTE:
 * As mentioned previously, it's also possible in JavaScript to add items to an array with the *push* method.
 * If we add the item by pushing it to the allClicks array and then updating the state, the application would still appear to work:
 * However, don't do this. As mentioned previously, the state of React components,
 * like allClicks, ⚠️must not be mutated directly⚠️.
 * Even if mutating state appears to work in some cases, it can lead to problems that are very hard to debug.
 * ✅*concat* method, which does not mutate✅ the existing array but rather returns a new copy of the array with the item added to it.
 */

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

      <p>{allClicks.join(' - ')}</p>
      <p>total: {total}</p>
    </div>
  );
};

export default App;
// Part1d Complex state...
// https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
