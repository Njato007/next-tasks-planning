'use client'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Button from './ui/Button'
import { ArrowDownOnSquareIcon, ArrowPathIcon, MagnifyingGlassIcon, PlusIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'
import Input from './ui/Input'
import BoardForm from './BoardForm'
import { useState, useEffect } from 'react'
import BoardsList from './BoardsList'

export default function LeftBar() {

  const[isOpen, setIsOpen] = useState<boolean>(false);
  const[isSearch, setIsSearch] = useState<boolean>(false);
  

  const handleRefresh = () => { }
  const handleNewItem = () => {
    // setIsSearch(false);
    setIsOpen(!isOpen);
  };
  const handleSearchItem = () => {
    // setIsOpen(false);
    setIsSearch(!isSearch);
  };
  
  return (
      <div className="w-full max-w-full bg-white/10 dark:bg-slate-950/10">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
                <div className={`${open && 'bg-slate-50 dark:bg-slate-600'} bg-white dark:bg-slate-800 border-b dark:border-slate-700 flex w-full items-center justify-between px-2 pl-3 py-2 text-left text-sm shadow-sm font-medium text-slate-800 dark:text-slate-100 hoverx:bg-blue-100 dark:hoverx:bg-slate-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 dark:focus-visible:ring-slate-600 focus-visible:ring-opacity-75`}>
                    <span>Boards</span>
                    <div className='flex gap-2'>
                        {
                          open && (
                            <>
                              <Button key='1' onClick={handleNewItem} variant='ghost' size='default' className='rounded-sm p-[1px]'>
                                <PlusIcon className='h-4 w-4 md:h-5 md:w-5 ' />
                              </Button>
                              <Button key='2' onClick={handleSearchItem} variant='ghost' size='default' className='rounded-sm p-[1px]'>
                                <MagnifyingGlassIcon className='h-4 w-4 md:h-5 md:w-5 ' />
                              </Button>
                              <Button key='3' onClick={handleRefresh} variant='ghost' size='default' className='rounded-sm p-[1px] mr-2'>
                                <ArrowPathIcon className='h-4 w-4 md:h-5 md:w-5 ' />
                              </Button>
                            </>
                          )
                        }
                        <Disclosure.Button>
                          <ChevronUpIcon
                          className={`${
                              open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-slate-400`}
                          />
                        </Disclosure.Button>
                    </div>
                </div>
                
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Disclosure.Panel as="div" className='py-0'>
                        <>
                          <BoardsList isAdd={isOpen} isSearch={isSearch}
                          onCloseSearch={() => setIsSearch(false)}
                          OnCloseAdd={() => setIsOpen(false)}
                          />
                        </>
                    </Disclosure.Panel>
                </Transition>
            </>
          )}
        </Disclosure>
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
                <div className={`${open && 'bg-slate-50 dark:bg-slate-600'} bg-white dark:bg-slate-800 border-b dark:border-slate-700 flex w-full items-center justify-between px-2 pl-3 py-2 text-left text-sm shadow-sm font-medium text-slate-800 dark:text-slate-100 hoverx:bg-blue-100 dark:hoverx:bg-slate-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 dark:focus-visible:ring-slate-600 focus-visible:ring-opacity-75`}>
                    <span>Shared tasks</span>
                    <div className='flex gap-2'>
                        {
                          open && (
                            <>
                              <Button key='2' onClick={handleRefresh} variant='ghost' size='default' className='rounded-sm p-[1px] mr-2'>
                                <ArrowPathIcon className='h-5 w-5' />
                              </Button>
                            </>
                          )
                        }
                        <Disclosure.Button>
                          <ChevronUpIcon
                          className={`${
                              open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-slate-400`}
                          />
                        </Disclosure.Button>
                    </div>
                </div>
                
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Disclosure.Panel as="div" className=''>
                        <>
                          {/* <BoardsList isAdd={isOpen} isSearch={isSearch}
                          onCloseSearch={() => setIsSearch(false)}
                          OnCloseAdd={() => setIsOpen(false)}
                          /> */}
                        </>
                    </Disclosure.Panel>
                </Transition>
            </>
          )}
        </Disclosure>
    </div>
  )
}
