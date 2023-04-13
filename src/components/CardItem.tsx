'use client'
import { ArrowDownOnSquareIcon } from '@heroicons/react/20/solid'
import { EllipsisHorizontalIcon, PencilSquareIcon, SwatchIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef, useState } from 'react'
import Button from './ui/Button'
import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd'

type ThemeType = {
  color: object,
  border: object,
  background: object
}

const CardItem = ({ data } : {data: CardItemType}) => {
  const [text, setText] = useState<string>(data.title);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cardItem, setCardItem] = useState<CardItemType>(data);
  const [style, setStyle] = useState<ThemeType>();


  useEffect(() => {
    setCardItem(data);
    setStyle({
      color: { color: data.theme },
      background: { background: data.theme},
      border: { r: data.theme}
    });
  }, [data])

  const handleEdit = () => {
    setIsEdit(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0)
  }

  function getStyle(style: any, snapshot: DraggableStateSnapshot) {
    return style;
  }

  return (
    <Draggable draggableId={cardItem.id} index={cardItem.index} isDragDisabled={isEdit}>
      {(draggableProvided, snapshot) => (
      <div
        ref={draggableProvided.innerRef}
        {...draggableProvided.dragHandleProps}
        {...draggableProvided.draggableProps}
        style={getStyle(draggableProvided.draggableProps.style, snapshot)}
        className={`bg-white dark:bg-gradient-to-b dark:from-slate-800/90 dark:to-slate-900
        border-0 dark:hover:bg-gradient-to-t shadow-md w-full rounded-md p-2
        transition duration-300 ease-in`}
      >
        <div className={`${!isEdit && 'flex items-start justify-between'}`}>
          { !isEdit && (
            <div className='relative mb-1'>
              <SwatchIcon className="w-7 h-7 float-left mr-1" style={style?.color} />
              <span className='text-sm line-clamp-2'>{text}</span>
            </div>
          ) }
          {
            isEdit ? (
              <>
                <textarea ref={textareaRef} name="task-name"
                  disabled={!isEdit} value={text}
                  rows={isEdit ? 2 : 1}
                  className='w-full text-sm px-1 py-1 rounded-md bg-slate-100 dark:bg-slate-900 outline-none focus:outline-blue-600 focus:outline-2 disabled:bg-white disabled:dark:bg-slate-800'
                  onChange={(e) => setText(e.currentTarget.value)}
                />
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
                </div>
              </>) : (
              <div className='flex items-center gap-0'>
                <Button size='sm' variant='ghost' onClick={handleEdit}>
                  <PencilSquareIcon className='w-4 h-4' />
                </Button>
                <Button size='sm' variant='ghost' onClick={handleEdit}>
                  <EllipsisHorizontalIcon className='w-4 h-4' />
                </Button>
              </div>
            )
          }
        </div>
        {
          !isEdit &&
          <div className="flex items-center dark:text-slate-300 divide-slate-500 divide-x-[1px] gap-1">
            <p className='text-xs font-thin'>Users: <span  style={style?.color} className='font-normal'>5</span></p>
            <p className='text-xs font-thin pl-1'>Creation: <span style={style?.color}  className='font-normal'>09/13/12</span></p>
            <p className='text-xs font-thin pl-1'>Progression: <span style={style?.color}  className='font-normal'>100%</span></p>
          </div>
        }
      </div>
      )}
    </Draggable>
  )
}

export default CardItem