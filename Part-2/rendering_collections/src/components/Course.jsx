// -----Part-----
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
// -----Header-----
const Header = ({ header }) => <h1>{header.name}</h1>;
// -----Content-----
const Content = ({ course }) => (
  <>
    {course.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

// -----Total-----
const Total = ({ sum }) => {
  console.log(sum.parts);

  // Array.reduce()
  const total = sum.parts.reduce(
    (accumulator, current) => accumulator + current.exercises,
    0
  );

  return <strong>Total of exercises {total}</strong>;
};

// ---------------------------
// const Total = ({ sum }) => {
//   let total = 0;
//   sum.parts.map((part) => (total += part.exercises));
//   return <strong>Total of exercises {total}</strong>;
// };

// -----EXPORT Course-----
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
// 2.4: Course information step 9
// https://fullstackopen.com/en/part2/rendering_a_collection_modules
