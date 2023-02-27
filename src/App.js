import './App.css';
import { useEffect, useRef, useState } from 'react';
import CoolSort from './CoolSort';
import Options from './Options';

function App() {
  const [items, setItems] = useState();
  const [userOptions, setUserOptions] = useState({ "showIndex": false, "showDelete": false, "hideOptions": false, "enableEdit": false })
  const [itemIndexes, setItemIndexes] = useState()

  let outputRef = useRef(null)

  // console.log("Options in main", userOptions);
  // console.log("ITEM INDEXES", itemIndexes);
  // console.log("APP Rendered");

  //Sets the output every time the input array is modified
  useEffect(() => {
    console.log("USE EFFECT ACTIVATED");
    if (items) {
      outputRef.current.value = JSON.stringify(items.map(x => x.value))
    }

  }, [items])


  //converts user input to an array if the input is valid.
  const handleChange = (e) => {

    let input = e.target.value;
    console.log("Input is:", input);

    try {
      let parsedInput = JSON.parse(input)

      console.log("Parsed Input:", parsedInput);

      if (Array.isArray(parsedInput)) {
        console.log("input is array");

        setItems(parsedInput.map((x, i) => {
          return { value: x, initId: i + 1 }
        }));

      }

    }
    catch (error) {
      console.log("Not an array");
      setItems(null)

    }

  }


  const copyToClipboard = () => {
    if (outputRef.current.value) {
      outputRef.current.select()
      navigator.clipboard.writeText(outputRef.current.value)
    }

  }


  return (
    <div className="App  p-7 flex flex-col  items-center">

      <h1 className='banner text-5xl pb-3 font-bold ' >Drag And Drop Demo</h1>
      <div className='input-output-containers drop-shadow-xl   p-12 flex flex-row justify-center items-center gap-28'>

        <div className='user-input-container '>

          <h2 className='text-3xl'>Input</h2>
          <textarea className='user-input text-lg text-black p-3 resize-none w-96 h-44 focus:outline-double font-mono' spellCheck={false} onChange={handleChange}></textarea>
        </div>

        <div className='user-output-container relative'>
          <h2 className='text-3xl'>Output</h2>
          <textarea className='user-output text-lg text-black p-3 resize-none w-96 h-44 focus:outline-double font-mono' readOnly ref={outputRef}></textarea>

          <svg onClick={copyToClipboard} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:bg-white cursor-pointer absolute right-0 top-2 ">
            <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>

        </div>

      </div>
      <Options userOptions={userOptions} setUserOptions={setUserOptions} />

      {items && <CoolSort items={items} setItems={setItems} outputRef={outputRef} userOptions={userOptions} itemIndexes={itemIndexes} setItemIndexes={setItemIndexes} />}


    </div>
  );
}

export default App;
