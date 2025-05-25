"use client"

import { Form } from '@/lib/generated/prisma'
import React from 'react'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishFormBtn from './PublishFormBtn'
import Designer from './Designer'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'

export default function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
            <main className='flex flex-col w-full h-full'>
      <nav className='flex justify-between border-b-2 p-4 gap-3 items-center'>
        <h2 className='truncate font-medium'>
          <span className='text-muted-foreground mr-2'>Form:</span>
          {form.name}
        </h2>
        <div className='flex items-center gap-2'>
          <PreviewDialogBtn/>
          {!form.published && (
            <>
              <SaveFormBtn/>
              <PublishFormBtn/>
            </>
          )}
        </div>
      </nav>
      <div className="flex items-center justify-center relative h-[200px] w-full flex-grow overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">

        <Designer />
      </div>
    </main>
    <DragOverlayWrapper/>
    </DndContext>

  )
}