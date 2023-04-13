'use client'
import React, { useState, useEffect } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const BoardSearch = ({ onSearch, onExit, searchValue} : { onSearch: Function, onExit: Function, searchValue: string }) => {

    const [value, setValue] = useState<string>('');

    useEffect(() => {
        // setValue(searchValue)
    }, [])

    return (
        <div className="flex items-center justify-between gap-x-0 relative p-2">
            <Input autoFocus type='search' placeholder="Search board..." size='md' className='w-full rounded-none pr-20' onChange={(e) => onSearch(e.currentTarget.value)} />
            <div className="absolute right-3 flex items-center gap-x-1">
                <Button size='sm' variant='default' className='flex-grow h-fit' onClick={() => onSearch(value)}>
                    <MagnifyingGlassIcon className='h-5 w-5' />
                </Button>
                <Button size='sm' variant='default' className='flex-grow h-fit' onClick={() => onExit()}>
                    <XMarkIcon className='h-5 w-5' />
                </Button>
            </div>
        </div>
    )
}

export default BoardSearch