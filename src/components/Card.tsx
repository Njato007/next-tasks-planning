import { ArrowDownOnSquareIcon, ArrowDownOnSquareStackIcon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/solid"
import Input from "./ui/Input"
import Button from "./ui/Button"
import CardItem from "./CardItem"

const Card = ({}) => {
   return (
   <div className='p-1'>
      <div className="card rounded-md bg-white/20 dark:bg-slate-950/20 w-[300px] divide-y-[1px] dark:divide-white/10">
         {/* Name of the card */}
         <div className="head flex items-center justify-between px-1 gap-1">
            <div className="flex w-full items-center relative">
               <form className="w-full">
                  <Input type="text" size='md' variant='transparent' className="w-full" disabled value="TODO CARD" />
               </form>
               <div className="absolute right-1 flex items-center gap-x-[2px]">
                  <Button size='sm' variant='ghost' className='flex-grow h-fit' onClick={() => null}>
                     <ArrowDownOnSquareIcon className='h-6 w-6 text-slate-500 dark:text-slate-300' />
                  </Button>
               </div>
            </div>
            <EllipsisHorizontalIcon className="w-6 h-6"/>
         </div>
         <div className="taskslist flex flex-col items-center p-2 gap-y-1">
            <CardItem />
            <CardItem />
            <CardItem />
         </div>
         <div className="taskslist flex flex-col items-center">
            <button className="px-2 py-1 flex items-center gap-1 text-sm">
               <PlusIcon className="h-5 w-5"/> New task
            </button>
         </div>
      </div>
   </div>
   )
}

export default Card