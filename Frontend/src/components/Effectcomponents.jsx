import { useState } from "react";
import "./effect.css";

function Effectcomponents() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo">
      <h2>UserEffect Example</h2>
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>page title changed</p>
    </div>
  );
}
export default Effectcomponents;
