import styles from "./Button.module.css";

const Persons = ({ persons, handlerDel }) => {
  return persons.map((person) => (
    <>
      <p key={person.id}>
        {person.name} {person.number}
        <button style={styles} onClick={() => handlerDel(person)}>
          Delete contact
        </button>
      </p>
    </>
  ));
};

export default Persons;
