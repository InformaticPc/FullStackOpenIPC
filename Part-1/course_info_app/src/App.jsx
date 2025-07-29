// All data still resides in the App component, which passes the necessary data to each component using props

/** Header takes care of rendering the name of the course */
const Header = ({ course }) => {
  console.log('HEADER ' + course);
  return <h1>{course}</h1>;
};

/** Refactor Content Comp */
const Part = (prop) => {
  return (
    <>
      <p>
        {prop.part} {prop.exe}
      </p>
    </>
  );
};
/**  Content renders the parts and their number of exercises */
const Content = ({ parts }) => {
  console.log('Content Comp ⬇️');
  console.log(parts);
  return (
    <>
      <Part part={parts[0].name} exe={parts[0].exercises} />
      <Part part={parts[1].name} exe={parts[1].exercises} />
      <Part part={parts[2].name} exe={parts[2].exercises} />
    </>
  );
};

/** Total renders the total number of exercises */
const Total = ({ parts }) => {
  console.log('TOTAL: ⬇️');
  console.log(parts);
  console.log(parts[0]);

  return (
    <p>
      Number of exercises{' '}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
