'use client'
import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import {ChevronDownIcon, ArrowLeftOnRectangleIcon, Cog6ToothIcon} from '@heroicons/react/24/solid'
import Image from 'next/image'

const ProfileBox = () => {
  return (
    <Menu as='div' className={`relative z-50 bg-transparent text-slate-500 dark:text-slate-400`}>
        {({ open }) => (
            <>
                <Menu.Button className={`flex items-center justify-center gap-3  md:px-2 md:py-2 px-1 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 dark:hover:text-slate-300 ${open && 'dark:bg-slate-700 bg-blue-100 dark:text-slate-300 text-slate-600' }`}>
                    <Image src="http://placeimg.com/360/360" placeholder='blur' blurDataURL='./images/user.PNG' width='100' height='100' alt="profile pics" className='w-10 h-10 rounded-full' />
                    <div className="flex flex-col items-start justify-center">
                        <p className='hidden md:inline text-sm font-semibold'>John Doe</p>
                        <p className='hidden md:inline text-sm'>johndoe@gmail.com</p>
                    </div>
                    <ChevronDownIcon className='w-4 h-4' />
                </Menu.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items as='div' className='absolute right-0 mt-5 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className="px-1 py-2">
                        <Menu.Item>
                            <a
                                className='gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-white hover:bg-blue-400 dark:hover:bg-slate-700'
                                href="/account-settings"
                            >
                                <Cog6ToothIcon className='h-4 w-4' />
                                Account settings
                            </a>
                        </Menu.Item>
                        <Menu.Item >
                            <a
                                className='gap-3 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-white hover:bg-blue-400 dark:hover:bg-slate-700'
                                href="/account-settings"
                            >
                                <ArrowLeftOnRectangleIcon className='h-4 w-4' />
                                Log out
                            </a>
                        </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </>
        )}
    </Menu>
  )
}

export default ProfileBox