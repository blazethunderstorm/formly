import React, {  useState } from 'react'
import DesignerSidebar from './DesignerSidebar'
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { ElementsType, FormElementInstance,  FormElements } from './FormElements'
import useDesigner from '@/hooks/useDesigner'
import { IsGenerator } from '@/lib/isGenerator'

export default function Designer() {
    const {elements,addElement}= useDesigner();
    const droppable=useDroppable({
        id: 'droppable-drop-area',
        data:{
            isDesignerDropArea:true
        }
    })
    useDndMonitor({
        onDragEnd:(event:DragEndEvent)=>{
            const{active,over}=event;
            if(!active || !over){
                return;
            }
            const isDesignerBtnElement=active.data?.current?.isDesignerBtnElement;
            if(isDesignerBtnElement){
                const type=active?.data?.current?.type;
                const newElement=FormElements[type as ElementsType].construct(
                    IsGenerator()
                )
                addElement(0, newElement)
            }
        }
    })
  return (
    <div className=" flex h-full w-full">
      <div className=" h-full w-full p-4">
        <div 
        ref={droppable.setNodeRef}
        className={cn("bg-background max-w-[920px] flex-1 overflow-y-auto  h-full m-auto rounded-xl flex  flex-col flex-grow items-center justify-start",droppable.isOver && "ring-2 ring-primary/20")}>

         {!droppable.isOver && elements.length==0 && ( <p className="text-3xl flex flex-grow text-muted-foreground font-bold items-center">   Drop Here
            </p> )}

          {droppable.isOver && (
            <div className='p-4 w-full'>
                <div className='h-[120px] rounded-md bg-primary/20'></div>
            </div>
          )} 
          {elements.length>0 && (
            <div className='flex flex-col  w-full gap-2 p-2'>
              {elements.map((element)=>(
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )} 
         
        </div>
      
      </div>
      <DesignerSidebar/>
    </div>
  )
}

function DesignerElementWrapper({element}:{element:FormElementInstance}){
  const DesignerElement=FormElements[element.type].designerComponent;

  return <DesignerElement elementInstance={element} />;
}