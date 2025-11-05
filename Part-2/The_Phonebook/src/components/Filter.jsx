const Filter = ({ search }) => {
  return (
    <div>
      Filter shown with: <input type="text" onKeyUp={search} />
    </div>
  );
};

export default Filter;
