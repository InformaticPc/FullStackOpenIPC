import { useState } from 'react';

// ✅the total number of collected feedback,
// ✅the average score(the feedback values are: good 1, neutral 0, bad - 1)
// ✅and the percentage of positive feedback
const StatisticLine = ({ onClick, value }) => (
  <button onClick={onClick}> {value} </button>
);

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
  } else return positive;
};
// --------------------------------------------------------
/**
 * Statistics component that return 2 '\<p>'
 * with diff calculations.
 * @param {*} goodReviews
 * @param {*} badReviews
 * @param {*} totalReviews
 * @returns Two Calculations: Average & Positive porcentage
 */
const Statistics = ({ good, bad, total, neutral }) => {
  if (good + bad + total == 0) return <h3>No feedback given</h3>;
  else
    return (
      <>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All: {total}</p>

        <p>Average: {averageCalc(good, bad, total)}</p>
        <p>Positive: {positiveCalc(good, total)} %</p>
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

      <StatisticLine onClick={handleGood} value="Good" />
      <StatisticLine onClick={handleNeutral} value="Neutral" />
      <StatisticLine onClick={handleBad} value="Bad" />

      <h1>Statistics</h1>

      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  );
};

export default App;
// CONTINUE...you make a mistake at 1.9 good-neutral-bad-all shouldn't appear saying '0'.
// 1.9: https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
