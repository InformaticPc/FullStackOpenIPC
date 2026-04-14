const PersonForm = ({ name, number, value, submit }) => {
  return (
    <form onSubmit={submit}>
      Name: <input type="text" value={value} onChange={name} />
      <br />
      Number: <input type="text" value={value} onChange={number} />
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
