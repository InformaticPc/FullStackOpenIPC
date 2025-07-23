const Hello = (props) => {
  console.log(props);
  
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </>
  )
}
const Wave = ({age, name}) => {
  console.log(`THIS IS: ${ name} ${age}`);
  
  return (
    <>
      <p>This is the sencond COMP with the name: {name}, and years {age} </p>
    </>
  )
}

const App = () => {
  const name = 'REACT';
  const age = 10;
  return (
    <>
      <h1>Greetings</h1>

      <Hello name={name} age={age} />
      <Hello age={12} />

      <Wave  name='"MyComp" (so original)' age={25} /> 
    </>
  )
}

export default App