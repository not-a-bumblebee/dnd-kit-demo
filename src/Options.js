export default function Options({userOptions,setUserOptions}) {


    const handleOptions = (e) =>{
        
        let option =e.target.value;
        let optionBool = e.target.checked;
        console.log("checkbox handle:", option);
        console.log("checkbox handle:", optionBool);


        setUserOptions((x)=>{
            x[option] = optionBool
            return {...x}
        })
    }

    return (
        <div className="app-options bg-zinc-200 absolute right-36 top-0 text-black">
            {/* <input type={"checkbox"} id='option-delete' /> */}
            <fieldset className="border-2 bg-white border-fuchsia-600 w-60 h-60">
                <legend>Options</legend>
                <input type={"checkbox"} id='option-show-index' defaultChecked={userOptions.index} onChange={handleOptions} value='showIndex'  />
                <label htmlFor="option-show-index">Show Index</label>
                <br></br>
                <input type={"checkbox"} id='option-show-delete' defaultChecked={userOptions.delete} onChange={handleOptions} value='showDelete' />
                <label htmlFor="option-show-index">Show delete</label>
            </fieldset>
        </div>
    )
}