import './App.css';
import { useRef, useState } from 'react';
import CoolSort from './CoolSort';
import Options from './Options';

function App() {
  const [userInput, setUserInput] = useState()
  const [items, setItems] = useState();
  const [userOptions, setUserOptions] = useState({ "showIndex": false, "showDelete": false })

console.log("APP Rendered");

  let outputRef = useRef(null)
  console.log("input", userInput);

  const handleChange = (e) => {
    let input = e.target.value;
    console.log("Input is:", input);
    try {
      let parsedInput = JSON.parse(input)
      console.log("Parsed Input:", parsedInput);
      if (Array.isArray(parsedInput)) {
        console.log("is array");
        // setUserInput(parsedInput);
        setItems(parsedInput);
      }
      else {

      }

    }
    catch (error) {
      console.log("Not an array");
      setItems(null)
      // console.error(error)
    }



  }


  return (
    <div className="App  p-7 flex flex-col  items-center">

      <h1 className='banner text-5xl  pb-3  font-bold ' >Drag And Drop Demo</h1>
      {/* bg-purple-400a */}
      <div className='input-output-containers drop-shadow-xl   p-12 flex flex-row justify-center items-center relative w-full'>

        <div className='user-input-container '>
          {/* <input defaultValue={"penis"} className=" bg-opacity-0" onSubmit={() => console.log("poop")} /> */}
          {/* <textarea defaultValue={'["1","2","3","4","5"]'} onBlur={() => console.log("pie")} className="text-center bg-opacity-0 bg-white" /> */}
          <h2 className='text-3xl'>Input</h2>
          <textarea className='user-input text-lg text-black p-3 resize-none w-96 h-44 focus:outline-double' onChange={handleChange}></textarea>
        </div>

        <div className='user-output-container'>
          <h2 className='text-3xl'>Output</h2>
          <textarea className='user-output text-lg text-black p-3 resize-none w-96 h-44 focus:outline-double'  readOnly ref={outputRef}></textarea>
        </div>
        <Options userOptions={userOptions} setUserOptions={setUserOptions} />

      </div>
      
      {items && <CoolSort items={items} setItems={setItems} outputRef={outputRef} userOptions={userOptions} setUserOptions={setUserOptions} />}


    </div>
  );
}

export default App;
