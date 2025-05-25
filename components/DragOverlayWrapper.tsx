import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { ElementsType, FormElements } from './FormElements';
import SideBarBtnElement, { SideBarBtnElementDragOverlay } from './SideBarBtnElement';
import { Form } from 'react-hook-form';

export default function DragOverlayWrapper() {
  const[draggedItem,setDraggedItem]=useState<Active |  null>(null);
    useDndMonitor({
        onDragStart:(event)=>{
            setDraggedItem(event.active);

        },
        onDragCancel:()=>{
          setDraggedItem(null)
        },
        onDragEnd:()=>{
          setDraggedItem(null);
        }
    })
    if(!draggedItem) return null;

    let node=<div>No Drag Overlay</div>
    const isSideBarBtnElement=draggedItem.data?.current?.isDesignerBtnElement;
    if(isSideBarBtnElement){
      const type=draggedItem.data?.current?.type as ElementsType;
      node=<SideBarBtnElementDragOverlay formElement={FormElements[type]}/>
    }
  return (
    <DragOverlay>{node}</DragOverlay>
  )
}
