import { useState } from "react";

function App() {
  const [filter, setFilter] = useState(null);

  const handlerFilter = (e) => {
    const value = e.target.value;
    // console.log(value);✅
    setFilter(value);
  };

  return (
    <>
      <section>
        Find countries: <input onChange={handlerFilter}></input>
      </section>
    </>
  );
}

export default App;
