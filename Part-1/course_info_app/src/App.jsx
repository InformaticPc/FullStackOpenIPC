// All data still resides in the App component, which passes the necessary data to each component using props

/** 'Header' takes care of rendering the name of the course */
const Header = ({ course }) => {
  console.log('HEADER ⬇️' + typeof course);
  console.log(course);
  return <h1>{course.name}</h1>;
};

/** Refactor of Content Comp */
const Part = (prop) => {
  return (
    <>
      <p>
        {prop.part} {prop.exe}
      </p>
    </>
  );
};
/**  'Content' renders the parts and their number of exercises */
const Content = ({ parts }) => {
  console.log('Content Comp ⬇️' + typeof parts);
  console.log(parts);
  return (
    <>
      <Part part={parts[0].name} exe={parts[0].exercises} />
      <Part part={parts[1].name} exe={parts[1].exercises} />
      <Part part={parts[2].name} exe={parts[2].exercises} />
    </>
  );
};

/** 'Total' renders the total number of exercises */
const Total = ({ parts }) => {
  console.log('TOTAL: ⬇️' + typeof parts);
  console.log(parts);
  console.log(parts[0]);
  // ⬇️ Below I wanted a different way to render the array inside the object
  // Therefore I only need to call the object 'course' inside the App component in case that later is needed...
  return (
    <p>
      Number of exercises{' '}
      {parts.parts[0].exercises +
        parts.parts[1].exercises +
        parts.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course} />
    </div>
  );
};

export default App;
