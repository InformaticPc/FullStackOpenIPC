const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Header = ({ header }) => <h1>{header.name}</h1>;

const Content = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
  );
};

// const Total = (props) => <p>Number of exercises {props.total}</p> <== not needed yet

const Course = ({ course }) => {
  return (
    <>
      <Header header={course} />
      <Content course={course} />
    </>
  );
};

export default Course;
