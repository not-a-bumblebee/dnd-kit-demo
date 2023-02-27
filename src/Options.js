export default function Options({ userOptions, setUserOptions }) {

    // console.log("Options rendered");
    // console.log(userOptions);

    const handleOptions = (e) => {

        let option = e.target.value;
        let optionBool = e.target.checked;

        setUserOptions((x) => {
            x[option] = optionBool
            return { ...x }
        })
    }

    const handleHide = () => {
        setUserOptions((x) => {

            return { ...x, "hideOptions": !x.hideOptions };
        })
    }

    return (
        <div className="app-options bg-zinc-200 text-black absolute right-12 w-60 ">
            <p className=" text-2xl hover:bg-zinc-100 hover:cursor-pointer select-none" onClick={() => handleHide()}>_</p>

            {<fieldset className="border-2 bg-white border-fuchsia-600 h-60 " style={{ display: userOptions.hideOptions && "none" }}>

                <legend>Options</legend>

                <div className="text-left pl-6">
                    <input type={"checkbox"} id='option-show-index' defaultChecked={userOptions.index} onChange={handleOptions} value='showIndex' />
                    <label htmlFor="option-show-index">Show Index</label>
                    <br></br>
                    <input type={"checkbox"} id='option-show-delete' defaultChecked={userOptions.delete} onChange={handleOptions} value='showDelete' />
                    <label htmlFor="option-show-delete">Show delete</label>
                    <br></br>
                    <input type={"checkbox"} id='option-edit' defaultChecked={userOptions.delete} onChange={handleOptions} value='enableEdit' />
                    <label htmlFor="option-edit">Make content editable</label>
                </div>
            </fieldset>}
        </div>
    )
}