'use client'
import React, { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { ArrowDownOnSquareIcon, XMarkIcon } from '@heroicons/react/20/solid'

const BoardForm = ({ onSubmit, onExit} : { onSubmit: Function, onExit: Function }) => {

    const [value, setValue] = useState<string>('');

    const handleSublit = (e: string) => {
        onSubmit(e);
        onExit(true);
    } 

    return (
        <form onSubmit={() => handleSublit(value)} className="flex items-center justify-between gap-x-0 relative p-2">
            <Input autoFocus placeholder="New board's name" size='md' className='w-full rounded-none' onChange={(e) => setValue(e.currentTarget.value)} />
            <div className="absolute right-3 flex items-center gap-x-1">
                <Button size='sm' variant='default' className='flex-grow h-fit' onClick={() => handleSublit(value)}>
                    <ArrowDownOnSquareIcon className='h-5 w-5' />
                </Button>
                <Button size='sm' variant='default' className='flex-grow h-fit' onClick={() => onExit()}>
                    <XMarkIcon className='h-5 w-5' />
                </Button>
            </div>
        </form>
    )
}

export default BoardForm