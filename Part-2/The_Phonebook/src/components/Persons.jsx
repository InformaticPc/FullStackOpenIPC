const Persons = ({ persons, handlerDel }) => {
  return persons.map((person) => {
    return (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handlerDel(person)}>Delete contact</button>
      </p>
    );
  });
};

export default Persons;
