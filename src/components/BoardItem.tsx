'use client'
import React, { useRef, useState, useEffect } from 'react'
import Input from './ui/Input';
import Button from './ui/Button';
import { ArrowTopRightOnSquareIcon, Cog6ToothIcon, FolderArrowDownIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const BoardItem = ({ data, onUpdate, onOpenSetting, active } : { data: BoardType, onUpdate: Function, onOpenSetting: Function, active: string }) => {

    const [show, setShow] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [defaultName, setDefaultName] = useState('');

    console.log(active, data.id)

    useEffect(() => {
        setName(data.name);
        setDefaultName(data.name);
        console.log('firing')
    }, [data]);

    const handleEdit = () => {
        setIsDisabled(false);
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0);
    }

    const handleCancel = () => {
        setIsDisabled(true);
        setTimeout(() => {
            setName(defaultName);
        }, 0);
    }

    // update board name
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onUpdate(data.id, name);
        setIsDisabled(true);
    }

    return (
        <div className="hover:bg-blue-600/10 dark:hover:bg-blue-600/10 px-2 py-1" onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <div className="flex items-center relative">
                <div className="absolute left-1 flex items-center gap-x-[2px]">
                    <Link href={`/board/${data.id}`}>
                        <Button size='sm' variant='ghost' className='flex-grow h-fit'>
                            <ArrowTopRightOnSquareIcon className='h-4 w-4 text-slate-500 dark:text-slate-300' />
                        </Button>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className='w-full'>
                    <Input ref={inputRef} disabled={isDisabled} placeholder="Board's name" size='md'
                        className='w-full rounded-md lg:pl-8 pl-7 pr-16 dark:active:!bg-slate-700/80' value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </form>
                <div className="absolute right-1 flex items-center gap-x-[2px]">
                    {/* Edit */}
                    {
                        show &&
                        isDisabled && (
                            <>
                                <Button size='sm' variant='ghost' className='flex-grow h-fit' onClick={() => handleEdit()}>
                                    <PencilIcon className='h-4 w-4 text-slate-500 dark:text-slate-300' />
                                </Button>
                            </>
                        ) 
                    }
                    {
                        !isDisabled &&
                        <>
                            {/* <Button size='sm' type='submit' variant='default' className='flex-grow h-fit' onClick={handleSubmit}>
                                <FolderArrowDownIcon className='h-4 w-4 text-slate-500 dark:text-slate-300' />
                            </Button> */}
                            {/* Delete */}
                            <Button size='sm' type='button' variant='default' className='flex-grow h-fit' onClick={handleCancel}>
                                <XMarkIcon className='h-4 w-4 text-slate-500 dark:text-slate-300' />
                            </Button>
                        </>
                    }

                    {
                        active === data.id && 
                        <Button size='sm' variant='ghost' className='flex-grow h-fit' onClick={() => onOpenSetting(data)}>
                            <Cog6ToothIcon className='h-4 w-4 text-slate-500 dark:text-slate-300' />
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default BoardItem