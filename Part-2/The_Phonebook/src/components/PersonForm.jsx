const PersonForm = ({ name, number, valueName, valueNumber, submit }) => {
  return (
    <form onSubmit={submit}>
      Name: <input type="text" value={valueName} onChange={name} />
      <br />
      Number: <input type="text" value={valueNumber} onChange={number} />
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
