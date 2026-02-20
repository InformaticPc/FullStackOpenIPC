const PersonForm = ({ name, number, submit }) => {
  return (
    <form>
      <div>
        Name: <input type="text" onChange={name} />
      </div>
      <div>
        Number: <input type="text" onChange={number} />
      </div>
      <div>
        <button onClick={submit} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
