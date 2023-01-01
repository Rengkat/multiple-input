import { useState } from "react";
import Select, { SelectOptions } from "./Select";

const options = [
  { label: "first", value: "1" },
  { label: "second", value: "2" },
  { label: "third", value: "3" },
  { label: "fourth", value: "4" },
  { label: "fifth", value: "5" },
];

function App() {
  const [value, setValue] = useState<SelectOptions | undefined>(options[0]);
  // const [multiple, setMultiple]= useState
  return (
    <div className="App">
      <Select options={options} value={value} onchange={(o) => setValue(o)} />
    </div>
  );
}

export default App;
