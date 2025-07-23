const Hello = (props) => {
  console.log(props);
  
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}
const Wave = ({age, name}) => {
  console.log(`THIS IS: ${ name} ${age}`);
  
  return (
    <div>
      <p>This is the sencond COMP with the name: {name}, and years {age} </p>
    </div>
  )
}

const App = () => {
  const name = 'REACT';
  const age = 10;
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name={name} age={age} />
      <Hello age={12} />

      <Wave  name='"MyComp" (so original)' age={25} /> 
    </div>
  )
}

export default App