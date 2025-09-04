const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Header = ({ header }) => <h1>{header.name}</h1>;

const Content = ({ course }) => (
  <>
    {course.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Total = ({ sum }) => {
  let total = 0;
  sum.parts.map((part) => {
    total += part.exercises;
  });
  return (
    <>
      <strong>Total of exercises {total}</strong>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header header={course} />
      <Content course={course} />
      <Total sum={course} />
    </>
  );
};

export default Course;
