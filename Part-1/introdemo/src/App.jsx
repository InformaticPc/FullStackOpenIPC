

const App = () => {
  const friends = [
    {name: 'Ruso', age: 5},
    {name: 'Elliot', age: 8},
  ]
  return (
    <>
      <p>My friend: {friends[0]}</p>
      <p>My friend: {friends[1].age}</p> {/*<-- primitive value can be render */}
    </>
  )
}

export default App