const Persons = ({ persons, handlerDel }) => {
  return persons.map((person) => (
    <>
      <p key={person.id}>
        {" "}
        {person.name} {person.number}
        <button
          style={{ margin: "0% 1% 0% 1%" }}
          onClick={() => handlerDel(person)}
        >
          Delete contact
        </button>
      </p>
    </>
  ));
};

export default Persons;
