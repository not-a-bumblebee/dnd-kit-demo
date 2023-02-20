import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    MeasuringConfiguration,
    MeasuringFrequency,
    MeasuringStrategy
} from '@dnd-kit/core';
import {
    arrayMove,
    arraySwap,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    rectSwappingStrategy,
    horizontalListSortingStrategy,

} from '@dnd-kit/sortable';

import { snapCenterToCursor } from '@dnd-kit/modifiers';

import SortableItem from './SortableItem';

export default function Etc({ items, setItems, outputRef, userOptions, setUserOptions }) {
    const [activeId, setActiveId] = useState()
    // const [items, setItems] = useState([1, 2, 3]);
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10
        },
    })

    console.log("DRAG AND DROP SECTION RENDERED");
    console.log("items", items);

    return (
        <div className='draggy-container'>

            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                sensors={useSensors(sensor)}
                modifiers={[snapCenterToCursor]}
               

            >
                <SortableContext
                    items={Array.from({length:items.length},(v,k)=>k+1)}
                    strategy={rectSwappingStrategy}


                >
                    <div className='etc flex flex-wrap gap-16 bg-white p-40'>
                        {items.map((id, i) => <SortableItem key={`value:${JSON.stringify(id)} index:${i}`}  id={i+1} index={i} setItems={setItems} items={items} outputRef={outputRef} userOptions={userOptions} value={id} />)}

                    </div>
                </SortableContext>

                {/* <DragOverlay>

                </DragOverlay> */}



            </DndContext>
        </div>
    );

    function handleDragStart(event) {
        console.log("drag start");
        setActiveId(event.active.id);
    }

    function handleDragEnd(event){
        setActiveId(null);
    }

    function handleDragOver(event) {
        const { active, over } = event;
        console.log("active",active);
        console.log("Drag end");
        if (active.id !== over.id) {
            console.log("drag end code");
            setItems((items) => {
                const oldIndex = active.id-1
                const newIndex = over.id-1

                let newArray = arraySwap(items, oldIndex, newIndex);

                outputRef.current.value = JSON.stringify(newArray);

                return newArray;
            });

            setActiveId(null)
        }
    }
}