'use client'
import { ArrowDownOnSquareIcon } from '@heroicons/react/20/solid'
import { EllipsisHorizontalIcon, PencilSquareIcon, SwatchIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React, { useRef, useState } from 'react'
import Button from './ui/Button'

const CardItem = () => {
  const [text, setText] = useState<string>('Title of the task');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = () => {
    setIsEdit(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0)
  }
  return (
    <div className={`bg-white dark:bg-slate-800 w-full rounded-md p-2`}>
      <div className={`${!isEdit && 'flex items-center'}`}>
        { !isEdit && <SwatchIcon className="w-6 h-6 text-cyan-500" /> }
        <textarea ref={textareaRef} name="task-name"
          disabled={!isEdit} value={text}
          rows={isEdit ? 2 : 1}
          className='w-full text-sm px-1 py-1 rounded-md bg-slate-100 dark:bg-slate-900 outline-none focus:outline-blue-600 focus:outline-2 disabled:bg-white disabled:dark:bg-slate-800'
          onChange={(e) => setText(e.currentTarget.value)}
        />
        {
          isEdit ? (
          <div className="buttons flex gap-2">
            <Button size='sm' variant='ghost'
              className='py-1 px-2 rounded-md flex items-center gap-1 bg-slate-200 dark:bg-slate-900 shadow-sm hover:bg-slate-300 hover:dark:bg-slate-700 text-xs'
              onClick={() => setIsEdit(false)}
              >
                <ArrowDownOnSquareIcon className='h-4 w-4' /> Save
            </Button>
            <Button size='sm' variant='ghost'
              className='py-1 px-2 rounded-md flex items-center gap-1 bg-slate-200 dark:bg-slate-900 shadow-sm hover:bg-slate-200 hover:dark:bg-slate-700 text-xs'
              onClick={() => setIsEdit(false)}
              >
                <XMarkIcon className='h-4 w-4' /> Cancel
            </Button>
          </div>) : (
            <>
              <Button size='sm' variant='ghost' onClick={handleEdit}>
                <PencilSquareIcon className='w-4 h-4' />
              </Button>
              <Button size='sm' variant='ghost' onClick={handleEdit}>
                <EllipsisHorizontalIcon className='w-4 h-4' />
              </Button>
            </>
          )
        }
      </div>
      {
        !isEdit &&
        <div className="flex items-center divide-slate-500 divide-x-[1px] gap-1">
          <p className='text-xs font-thin'>Users: <span className='text-cyan-400 font-normal'>5</span></p>
          <p className='text-xs font-thin pl-1'>Creation: <span className='text-cyan-400 font-normal'>09/13/12</span></p>
          <p className='text-xs font-thin pl-1'>Progression: <span className='text-cyan-400 font-normal'>100%</span></p>
        </div>
      }
    </div>
  )
}

export default CardItem