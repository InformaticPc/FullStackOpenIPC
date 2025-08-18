import { useState } from 'react';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button>
);

/**
 * Renders each statistic line with his value and
 * each cell \<td> of the table
 * @param {*} param0
 * @returns
 */
const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>
        <strong>{text}</strong>
      </td>
      <td>{value}</td>
    </>
  );
};

// --------------------------------------------------------
/**
 * Average calculation (the feedback values are: good 1, neutral 0, bad - 1)
 * @param {*} good Number of positive reviews
 * @param {*} bad Number of negative reviews
 * @param {*} total Sum of all type of reviews
 * @returns Number with the porcentage of reviews
 */
const averageCalc = (good, bad, total) => {
  const average = (good - bad) / total;

  if (Number.isNaN(average)) {
    return 0;
  } else return average;
};

/**
 * Positive calculation, porcentage of positive reviews copared with all reviews
 * @param {*} good Number of positive reviews
 * @param {*} total Sum of all type of reviews
 * @returns Number
 */
const positiveCalc = (good, total) => {
  const positive = (good * 100) / total;

  if (Number.isNaN(positive)) {
    return 0;
  } else return `${positive} %`;
};
// --------------------------------------------------------
/**
 * Statistics component that return the table body '\<table> \<tbody>...'
 * of each 'StatisticLine' comp
 * @param {*} goodReviews
 * @param {*} badReviews
 * @param {*} totalReviews
 * @returns Two Calculations: Average & Positive porcentage
 */
const Statistics = ({ good, bad, total, neutral }) => {
  if (good + bad + total == 0) {
    return (
      <>
        <h1>Statistics</h1>
        <h3>No feedback given</h3>
      </>
    );
  } else
    return (
      <>
        <h1>Statistics</h1>
        <table>
          {/* <thead>
            <tr>
              <th>Statistics</th>
            </tr>
          </thead> */}

          <tbody>
            <tr>
              <StatisticLine text="Good" value={good} />
            </tr>
            <tr>
              <StatisticLine text="Neutral" value={neutral} />
            </tr>
            <tr>
              <StatisticLine text="Bad" value={bad} />
            </tr>
            <tr>
              <StatisticLine text="Total" value={total} />
            </tr>
            <tr>
              <StatisticLine
                text="Average"
                value={averageCalc(good, bad, total)}
              />
            </tr>
            <tr>
              <StatisticLine
                text="Positive"
                value={positiveCalc(good, total)}
              />
            </tr>
          </tbody>
        </table>
      </>
    );
};

// --------------------------------------------------------
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // HANDLERS
  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  // Total score
  const total = good + neutral + bad;

  return (
    <div>
      <h1>Give feedback</h1>

      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />

      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  );
};

export default App;
// CONTINUE...you make a mistake at 1.9 good-neutral-bad-all shouldn't appear saying '0'.
// 1.9: https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
