import { useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useRef, useState} from "react";

export default React.memo(function SortableItem(props) {

    const [focused, setFocused] = useState(false)


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id, disabled: focused && true })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    }

    // console.log("TEST",typeof props.id);
    // console.log("Item:", props.id, " focus is:", focused, " Draggable:", !focused && true);

    let inputRef = useRef(null)
    let indexRef = useRef(null)

    const handleItemChange = () => {

        setFocused(false);

        console.log("Trying to change an item");
        console.log("index is:", props.index);
        console.log("Value of ref", inputRef.current.value);

        try {
            //Checks to see if the item's changed value is a valid option

            let inputTest = JSON.parse(inputRef.current.value)

            if (inputRef.current.innerText != JSON.stringify(props.value)) {
                props.setItems(x => {

                    console.log("Changing", x[props.index]);

                    x[props.index].value = JSON.parse(inputRef.current.value)

                    return [...x]
                })
            }
            else {
                console.log("No change");
            }

        }
        catch (error) {
            console.log("ERROR", error);

            inputRef.current.value = JSON.stringify(props.value);
        }
    }

    const handleIndexChange = () => {

        try {
            setFocused(false)
            let userIndexInput = indexRef.current.value
            if (userIndexInput >= 0 && userIndexInput < props.items.length) {
                props.setItems((items) => {
                    let newArray = arrayMove(items, props.index, indexRef.current.value);
                    console.log("New array", newArray);
                    return newArray;
                });

            }

            else {
                indexRef.current.value = props.index
            }

        } catch (error) {
            indexRef.current.value = props.index
        }
    }


    const deleteItem = () => {
        console.log("Delete pressed");
        props.setItems((x) => {
            x.splice(props.index, 1)
            return [...x]

        })
    }


    return (
        <div className="item rounded-3xl flex flex-col justify-center relative bg-slate-800 text-white w-52 h-52 select-none shadow-lg" ref={setNodeRef} {...attributes} {...listeners} style={style}  >
            {props.userOptions["showDelete"] &&
                (<div className="delete-item absolute top-0 right-0 hover:text-red-600 py-2 w-11" onClick={deleteItem} onFocus={() => setFocused(true)}>
                    x
                </div>)}

            {props.userOptions["showIndex"] &&
                (<div className="index-container font-mono absolute top-7 left-16 pl-2">
                    {"index:"}
                    {props.userOptions["enableEdit"] && <input defaultValue={props.index} onBlur={handleIndexChange} readOnly={!props.userOptions["enableEdit"]} className="  text-white w-12 bg-transparent" ref={indexRef} onFocus={() => setFocused(true)} />}
                    {!props.userOptions["enableEdit"] && props.index}
                </div>)
            }

            {props.userOptions["enableEdit"] && <textarea defaultValue={JSON.stringify(props.value)} onBlur={handleItemChange} className="p-1 mx-4 mt-14 text-center bg-transparent  resize-none h-32 focus:text-left focus:resize" spellCheck={false} ref={inputRef} onFocus={() => setFocused(true)} onMouseDown={e => e.stopPropagation()} />}
            {!props.userOptions["enableEdit"] && <p className="p-1 mx-4 mt-14 text-center h-32">{JSON.stringify(props.value)}</p>
            }
        </div>
    )
})