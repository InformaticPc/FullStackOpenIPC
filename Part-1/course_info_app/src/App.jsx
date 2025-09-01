import { useState } from 'react';

const NextAnecdote = ({ onClick }) => {
  console.log('<NextAnecdote /> running');
  return <button onClick={onClick}>next anecdote</button>;
};

const Vote = ({ onClick, votes }) => {
  console.log('<Vote /> running');

  return (
    <>
      <p>has {votes} votes</p>
      <button onClick={onClick}>vote</button>
    </>
  );
};

const BestAnecdote = ({ anecdote, voteStart }) => {
  console.log('<BestAnecdote /> running');
  if (voteStart == -1) {
    return <p>Nothing voted yet</p>;
  }
  return <p>{anecdote}</p>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  // states
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [bestIndex, setBestIndex] = useState(-1);
  console.log('votes:', votes);
  console.log('best index is:', bestIndex);

  // -----------------------

  // handler events
  const handleRandom_Button = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote_button = () => {
    // Initialize the bestindex for the 1st time
    console.log(`----bestIndex before----⬇️:`, bestIndex);
    if (bestIndex == -1) setBestIndex(0);
    console.log(`----bestIndex after---⬆️:`, bestIndex);
    // make a copy of org arr to change the state
    // with a new array modified
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    highestVote();
  };

  // get the index of highest voted anecdote
  const highestVote = () => {
    console.log('highest handler running');

    for (let i = 0; i < votes.length; i++) {
      if (votes[bestIndex] <= votes[i]) {
        setBestIndex(i);
        console.log('### index inside for loop: ', i);
      }
    }
  };

  return (
    <>
      <h1>Anecdote of the day</h1>

      <div>{anecdotes[selected]}</div>

      <Vote onClick={handleVote_button} votes={votes[selected]} />
      <NextAnecdote onClick={handleRandom_Button} />

      <h1>Anecdote with most votes</h1>
      <BestAnecdote anecdote={anecdotes[bestIndex]} voteStart={bestIndex} />
    </>
  );
};

export default App;
// 1.13*: anecdotes step 2
// https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
