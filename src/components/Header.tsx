import { Bars3Icon } from '@heroicons/react/24/solid'
import React from 'react'
import ProfileBox from './ProfileBox'
import ThemeSwitcherButton from './ThemeSwitcher'
import Button from './ui/Button'

const Header = () => {
  return (
    <header>
        <nav className="bg-slate-50 dark:bg-slate-800 md:px-8 md:h-20 px-6 h-16 flex items-center justify-between border-b border-slate-300 dark:border-slate-700/60 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-center gap-6">
                <Button variant='ghost' size='sm'><Bars3Icon className='md:h-8 md:w-8 h-6 w-6' /></Button>
                <p className='md:text-2xl text-1xl text-blue-600 font-bold px-2 sm:px-6'>Board</p>
            </div>
            <div className="flex items-center justify-center gap-10 ">
                <ThemeSwitcherButton />
                <ProfileBox />
            </div>
        </nav>
    </header>
  )
}

export default Header