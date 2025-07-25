// All data still resides in the App component, which passes the necessary data to each component using props

/** Header takes care of rendering the name of the course */
const Header = ({ courseName }) => {
  console.log(courseName);
  return <h1>{courseName}</h1>;
};

/**  Content renders the parts and their number of exercises */
const Content = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

/** Total renders the total number of exercises */
const Total = (total) => {
  console.log(total);
  console.log(total.ex3);

  console.log(total.ex1 + total.ex2 + total.ex3);
  return <p>Number of exercises {total.ex1 + total.ex2 + total.ex3} </p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header courseName={course} />
      <Content part={part1} exercise={exercises1}></Content>
      <Content part={part2} exercise={exercises2}></Content>
      <Content part={part3} exercise={exercises3}></Content>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}></Total>
    </div>
  );
};

export default App;
/*Content COMP SHOULD BE CALLED IN App JUST ONCE
 * FIX IT...
 */
