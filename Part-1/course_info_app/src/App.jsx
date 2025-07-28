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
  // console.log(total.ex3);
  // console.log(total.ex1 + total.ex2 + total.ex3);

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
      <Content
        p1={part1}
        ex1={exercises1}
        p2={part2}
        ex2={exercises2}
        p3={part3}
        ex3={exercises3}
      ></Content>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}></Total>
    </div>
  );
};

export default App;
/*Content COMP SHOULD BE CALLED IN App JUST ONCE
 * FIX IT...
 */
