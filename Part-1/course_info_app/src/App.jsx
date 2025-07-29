// All data still resides in the App component, which passes the necessary data to each component using props

/** Header takes care of rendering the name of the course */
const Header = ({ courseName }) => {
  console.log(courseName);
  return <h1>{courseName}</h1>;
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
const Content = (cont) => {
  console.log('Content Comp ⬇️');
  console.log(cont);
  return (
    <>
      <Part part={cont.p1} exe={cont.ex1} />
      <Part part={cont.p2} exe={cont.ex2} />
      <Part part={cont.p3} exe={cont.ex3} />
    </>
  );
};

/** Total renders the total number of exercises */
const Total = (total) => {
  // console.log(total);

  return <p>Number of exercises {total.ex1 + total.ex2 + total.ex3} </p>;
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
      <Header courseName={course} />
      <Content
        p1={parts[0].name}
        ex1={parts[0].exercises}
        p2={parts[1].name}
        ex2={parts[1].exercises}
        p3={parts[2].name}
        ex3={parts[2].exercises}
      ></Content>
      <Total
        ex1={parts[0].exercises}
        ex2={parts[1].exercises}
        ex3={parts[2].exercises}
      ></Total>
    </div>
  );
};

export default App;
