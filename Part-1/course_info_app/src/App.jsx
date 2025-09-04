import { useState } from 'react';
/* 1.14*: anecdotes step 3
 * https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps*/
// components ------------------------------
const NextAnecdote = ({ onClick }) => {
  console.log('<NextAnecdote /> rendering');
  return <button onClick={onClick}>next anecdote</button>;
};

const Vote = ({ onClick, votes }) => {
  console.log('<Vote /> rendering');

  return (
    <>
      <p>has {votes} votes</p>
      <button onClick={onClick}>vote</button>
    </>
  );
};

const BestAnecdote = ({ anecdote, voteStart, votes }) => {
  console.log('<BestAnecdote /> rendering');
  return voteStart == -1 ? (
    <p>Nothing voted yet</p>
  ) : (
    <>
      <p>{anecdote}</p>
      <span>has {votes} votes</span>
    </>
  );
};
// ----------------------------------------------

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

  // states -------------------------------
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [bestIndex, setBestIndex] = useState(-1);
  console.log('votes:', votes);
  console.log('best index is:', bestIndex);

  // ---------------------------------------

  // handler events ------------------------
  const handleRandom_Button = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote_button = () => {
    console.log('#### VOTE CLICKED###');
    setBestIndex(0);

    // make a copy of org arr
    const copy = [...votes];
    // with a new array modified
    copy[selected] += 1;
    setVotes(copy);

    // get the index of highest voted anecdote
    const maxVotes = Math.max(...copy);
    // get the index of that maxVotes value, it will look for the first match\
    // and return that element index
    const bestIdx = copy.indexOf(maxVotes);
    setBestIndex(bestIdx);
  };
  // ---------------------------------------

  return (
    <>
      <h1>Anecdote of the day</h1>

      <div>{anecdotes[selected]}</div>

      <Vote onClick={handleVote_button} votes={votes[selected]} />
      <NextAnecdote onClick={handleRandom_Button} />

      <h1>Anecdote with most votes</h1>
      <BestAnecdote
        anecdote={anecdotes[bestIndex]}
        voteStart={bestIndex}
        votes={votes[bestIndex]}
      />
    </>
  );
};

export default App;

// IF YOU HAVE SOME ANECDOTES GOT THE SAME VOTES, SHOW ALL OF THEM. TO BE UPDATED....
