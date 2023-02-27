import React, {useState } from 'react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { snapCenterToCursor, } from '@dnd-kit/modifiers';
import SortableItem from './SortableItem';



export default function Etc({ items, setItems, outputRef, userOptions}) {
    const [activeId, setActiveId] = useState(null)

    let itemIndexes = items.map(x => x.initId)

    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 1
        },
    })

    console.log("DRAG AND DROP SECTION RENDERED");
    console.log("items", items);
    console.log("active", activeId);
    console.log("Active item", items[activeId - 1]);

    return (
        <div className='draggy-container'>

            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                sensors={useSensors(sensor)}
                modifiers={[snapCenterToCursor]}
            >
                <SortableContext
                    items={itemIndexes}
                    strategy={rectSortingStrategy}
                >
                    <div className='etc flex  flex-wrap gap-16 bg-orange-200 rounded-sm p-40 select-none'>
                        {items.map((x, i) => <SortableItem key={`val:${x.value} id:${x.initId} ind:${i}`} id={x.initId} index={i} setItems={setItems} items={items} outputRef={outputRef} userOptions={userOptions} value={x.value} itemIndexes={itemIndexes} />)}
                    </div>
                </SortableContext>

                <DragOverlay >
                    <div className="item-overlay rounded-3xl flex flex-col justify-center relative bg-slate-800 text-white w-52 h-52 select-none shadow-lg">
                        {userOptions["showDelete"] &&
                            (<div className="delete-item absolute top-0 right-0 hover:text-red-600 py-2 w-11 " >
                                x
                            </div>)}

                        {userOptions["showIndex"] &&
                            (<div className="index-container font-mono absolute top-7 left-16 pl-2">
                                <p >{"index:" + itemIndexes.indexOf(activeId)}</p>
                            </div>)
                        }

                        {activeId && <p className="p-1 mx-4 mt-14 text-center h-32">{JSON.stringify(items[itemIndexes.indexOf(activeId)].value)}</p>}

                    </div>
                </DragOverlay>

            </DndContext>
        </div>
    );

    function handleDragStart(event) {
        console.log("event:", event);
        console.log("drag start");
        console.log("active id is:", event.active.id);
        console.log("Event thinks:", items[event.active.id - 1]);

        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        console.log("active", active);
        console.log("Drag end");
        if (active.id !== over.id) {
            console.log("drag end code");
            setItems((old) => {
                console.log("Old itemIndexes", old);
                const oldIndex = itemIndexes.indexOf(active.id)
                const newIndex = itemIndexes.indexOf(over.id)
                console.log("old index", oldIndex, "new index", newIndex);

                let newArray = arrayMove(items, oldIndex, newIndex);

                // outputRef.current.value = JSON.stringify(newArray);
                // outputRef.current.value = JSON.stringify(newArray.map(i=>i.x))

                console.log("Old Array:", old);
                console.log("New Array:", newArray);
                return newArray;
            });
        }
        setActiveId(null)
    }

}