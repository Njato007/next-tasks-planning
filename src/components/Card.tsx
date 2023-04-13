'use client'
import { ArrowDownOnSquareIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import Input from "./ui/Input"
import Button from "./ui/Button"
import CardItem from "./CardItem"
import { useEffect, useState } from "react"
import { Droppable } from "react-beautiful-dnd"
import { Menu, Transition } from "@headlessui/react"

const Card = ({data} : {data: CardProps}) => {

   const [cardItems, setCardItems] = useState<CardItemType[]>([]);
   const [cardTitle, setCardTitle] = useState<string>('');
   const [isEdit, setIsEdit] = useState<boolean>(false);
   const [isFind, setIsFind] = useState<boolean>(false);

   const handleRemove = () => {
      alert(data.card.id)
   }

   useEffect(() => {
      setCardItems(data.items);
      setCardTitle(data.card.title);
   }, [data]);

   return (
   <Droppable droppableId={data.card.id} >
      { (droppableProvided, shapshot) => (
         <div className='p-1'>
            <div className="card rounded-md bg-white/20 dark:bg-slate-950/20 shadow-sm w-[320px] divide-y-[0px] dark:divide-white/10">
               {/* Name of the card */}
               <div className="head flex items-center justify-between px-1 py-1 gap-1">
                  <div className="flex w-full items-center relative">
                     <form className="w-full">
                        <Input type="text" size='md' variant='transparent' className="w-full rounded-md" disabled={!isEdit}
                           value={cardTitle}
                           onChange={(e) => setCardTitle(e.currentTarget.value)}
                        />
                     </form>
                     <div className="absolute right-1 flex items-center gap-x-[2px]">
                        {
                           isEdit && 
                           <Button size='sm' variant='ghost' className='flex-grow h-fit' onClick={() => setIsEdit(false)}>
                              <ArrowDownOnSquareIcon className='h-5 w-5 text-slate-500 dark:text-slate-300' />
                           </Button>
                        }
                     </div>
                  </div>
                  <CardToolTips onEdit={() => setIsEdit(true)} onFind={() => setIsFind(true)} onRemove={handleRemove} />
               </div>
               {/* Droppable */}
               <div className="taskslist flex flex-col items-center p-2 gap-y-1 dark:bg-slate-800/[0.1]"
                  ref={droppableProvided.innerRef}
               >
                  {
                     cardItems.length > 0 ?
                     cardItems.map(cardItem => <CardItem key={cardItem.id} data={cardItem} />) :
                     (!shapshot.isDraggingOver && <p className="py-6 text-sm text-slate-200">No tasks registrered</p>)
                  }
                  { droppableProvided.placeholder }
               </div>
               {/* End droppable */}
               <div className="taskslist flex flex-col items-start p-1">
                  <button className="px-2 py-2 flex items-center rounded shadow text-xs dark:bg-slate-800/60 hover:dark:bg-slate-800">
                     <PlusIcon className="h-4 w-4"/> New task
                  </button>
               </div>
            </div>
         </div>
      )}
   </Droppable>
   )
}


const CardToolTips = ({ onEdit, onFind, onRemove } : { onEdit: Function, onFind: Function, onRemove: Function }) => {
   return (
     <Menu as='div' className={`relative z-50 bg-transparent text-slate-500 dark:text-slate-400`}>
         {({ open }) => (
             <>
                 <Menu.Button>
                     <Button size='sm' variant='ghost' className='flex-grow h-fit'>
                        <EllipsisHorizontalIcon className='h-5 w-5 text-slate-500 dark:text-slate-300' />
                     </Button>
                 </Menu.Button>
                 <Transition
                     enter="transition duration-100 ease-out"
                     enterFrom="transform scale-95 opacity-0"
                     enterTo="transform scale-100 opacity-100"
                     leave="transition duration-75 ease-out"
                     leaveFrom="transform scale-100 opacity-100"
                     leaveTo="transform scale-95 opacity-0"
                 >
                     <Menu.Items as='div' className='absolute right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                         <div className="px-1 py-2">
                         <Menu.Item>
                             <button
                                 className='gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-white hover:bg-blue-400 dark:hover:bg-slate-700'
                                 type="button"
                                 onClick={() => onEdit()}
                             >
                                 <PencilIcon className='h-4 w-4' />
                                 Edit
                             </button>
                         </Menu.Item>
                         <Menu.Item >
                             <button
                                 className='gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-white hover:bg-blue-400 dark:hover:bg-slate-700'
                                 type="button"
                                 onClick={() => onFind()}
                             >
                                 <MagnifyingGlassIcon className='h-4 w-4' />
                                 Find tasks
                             </button>
                         </Menu.Item>
                         <Menu.Item >
                             <button
                                 className='gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-white hover:bg-blue-400 dark:hover:bg-slate-700'
                                 type="button"
                                 onClick={() => onRemove()}
                             >
                                 <TrashIcon className='h-4 w-4' />
                                 Remove
                             </button>
                         </Menu.Item>
                         </div>
                     </Menu.Items>
                 </Transition>
             </>
         )}
     </Menu>
   )
 }

export default Card