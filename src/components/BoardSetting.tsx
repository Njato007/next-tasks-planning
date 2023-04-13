import { Dialog, Listbox, Tab, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Button from './ui/Button'
import { CheckIcon, ChevronUpDownIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import Input from './ui/Input'
import { HexColorPicker } from 'react-colorful'
import { ImageUploader } from './ImageUploader'
import CheckBox from './CheckBox'
import GradientList from './GradientList'

export default function BoardSetting({data, onUpdate, onClose} : { data: BoardType | undefined, onUpdate: Function, onClose: Function }) {
    const colorTypes = [
        { title: 'Simple', value: 0},
        { title: 'Gradient', value: 1},
    ];

    let [isOpen, setIsOpen] = useState(true)
    const [selected, setSelected] = useState(colorTypes[0])
    const [color, setColor] = useState<string | undefined>('#1391cf')
    const [color1, setColor1] = useState<string | undefined>('#1391cf')
    const [color2, setColor2] = useState<string | undefined>('#1391cf')
    const [name, setName] = useState<string | undefined>(data?.name);
    const [isImage, setIsImage] = useState<boolean>(false);
    const [isGradientFromList, setIsGradientFromList] = useState<boolean>(false);

    useEffect(() => {
        setName(data?.name);
        /// if gradient color
        if (data?.background.color.isGradient) {
            setColor1(data?.background.color.gradient?.from);
            setColor2(data?.background.color.gradient?.to);
            setSelected(colorTypes[1]); // gradient color index 1
        } else {
            setColor(data?.background.color.simple);
            setSelected(colorTypes[0]); // simple color index 0
        }
    }, [data]);


    function closeModal() {
        setIsOpen(false);
        onClose(true);
    }

    function handleImageUpload(data: FileUploaded) {
        console.log(data.file)
    }

    function selectGradient(data: any) {
        console.log(data);
        setColor1(data.from);
        setColor2(data.to);
    }
    function classNames(...classes: string[]) {
      return classes.filter(Boolean).join(' ')
    }

    type DataType = {
        title: string, value: number
    }

    const handleColorTypeSelect = (data: DataType) => {
        setSelected(data);
    }
    
    // submit board setting form
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // name
        const newBoard: BoardType = {
            id: data?.id || '',
            name: name || '',
            background: {
                isImage: isImage,
                image: '',
                color: {
                    isGradient: selected.value === 1,
                    gradient: {
                        from: color1,
                        to: color2
                    },
                    simple: color1,
                },
            },
            creator: data?.creator || ''
        }

        onUpdate(newBoard);
    }

    return (
        <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="absolute bg-transparent dark:bg-transparent w-full md:left-[326px] left-0 top-[85px] md:w-fit flex items-center justify-center" onClose={() => null}>
                <form onSubmit={handleSubmit}>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="rounded-md bg-white dark:bg-slate-800 p-3 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h2"
                            className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-200"
                        >
                            Board setting
                        </Dialog.Title>
                        <div className="mt-2">
                            <label htmlFor="board-name" className='text-sm text-slate-400'>Change the board's name</label>
                            <Input id='board-name' size='md' value={name} onChange={(e) => setName(e.currentTarget.value)} className='w-full' placeholder="Board's name"/>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="board-name" className='text-sm text-slate-400'>Customize board's theme</label>
                            <div className="w-full max-w-lg px-2 py-1 sm:px-0">
                                <Tab.Group defaultIndex={data?.background?.isImage ? 1 : 0}>
                                    <Tab.List className="flex space-x-1 rounded-xl bg-slate-900/20 p-1">
                                        <Tab onClick={() => setIsImage(false)} className={({ selected }) =>
                                            classNames(
                                            'w-full rounded-md py-2 text-sm font-medium leading-5 text-slate-600',
                                            'ring-white ring-opacity-60 outline-none',
                                            selected
                                                ? 'bg-white dark:bg-slate-700 shadow dark:text-slate-200'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                        >Background color</Tab>
                                        <Tab onClick={() => setIsImage(true)} className={({ selected }) =>
                                            classNames(
                                            'w-full rounded-md py-2 text-sm font-medium leading-5 text-slate-600',
                                            'ring-white ring-opacity-60 outline-none',
                                            selected
                                                ? 'bg-white dark:bg-slate-700 shadow dark:text-slate-200'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                        >Background image</Tab>
                                    </Tab.List>
                                    <Tab.Panels className="mt-2">
                                        <Tab.Panel
                                        className={classNames(
                                            'rounded-xl bg-transparent',
                                            'ring-white'
                                        )}
                                        >
                                            <div className="grid grid-cols-1 space-x-2">
                                                <div className="z-50">
                                                    <Listbox value={selected} onChange={handleColorTypeSelect}>
                                                        <div className="relative mt-0">
                                                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-700 outline-[1px] outline-slate-600 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                            <span className="block truncate">{selected.title}</span>
                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                            </span>
                                                        </Listbox.Button>
                                                        <Transition
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {colorTypes.map((item, itemIdx) => (
                                                                <Listbox.Option
                                                                key={itemIdx}
                                                                className={({ active }) =>
                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                    active ? 'bg-amber-100 text-amber-900 dark:text-slate-50 dark:bg-slate-500/50' : 'text-gray-900 dark:text-slate-400'
                                                                    }`
                                                                }
                                                                value={item}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                    <span
                                                                        className={`block truncate ${
                                                                        selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                    >
                                                                        {item.title}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                        </div>
                                                    </Listbox>
                                                    <div className="mt-1">
                                                        {
                                                        selected.value === 0 ? (
                                                            <>
                                                            <div className="p-1 flex flex-col gap-1">
                                                                <div className="w-full max-w-[200px] flex items-center justify-between relative">
                                                                <Input type="text" size='md' className='w-full border-none' value={color}
                                                                    onChange={(e) => setColor(e.currentTarget.value)}/>
                                                                <input type='color' disabled value={color} className={`h-full w-20 absolute right-0`} />
                                                                </div>
                                                                <HexColorPicker color={color} onChange={setColor} />
                                                            </div>
                                                            </>
                                                        ): (
                                                            <>
                                                                <div className="py-2 flex items-center gap-2">
                                                                    <CheckBox onChange={setIsGradientFromList} />
                                                                    <p className='text-sm text-slate-600 dark:text-slate-400'>Want to select gradient from list</p>
                                                                </div>
                                                                {
                                                                    isGradientFromList ? (
                                                                        <div className="p-1">
                                                                            <GradientList onSelectColor={selectGradient}/>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='grid grid-cols-2 space-x-1'>
                                                                            <div className="p-1 flex flex-col gap-1">
                                                                                <div className="w-full max-w-[200px] flex items-center justify-between relative">
                                                                                <Input type="text" size='md' className='w-full border-none' value={color1}
                                                                                    onChange={(e) => setColor1(e.currentTarget.value)}/>
                                                                                <input type='color' disabled value={color1} className={`h-full w-20 absolute right-0`} />
                                                                                </div>
                                                                                <HexColorPicker color={color1} onChange={setColor1} />
                                                                            </div>
                                                                            <div className="p-1 flex flex-col gap-1">
                                                                                <div className="w-full max-w-[200px] flex items-center justify-between relative">
                                                                                <Input type="text" size='md' className='w-full border-none' value={color2}
                                                                                    onChange={(e) => setColor2(e.currentTarget.value)}/>
                                                                                <input type='color' disabled value={color2} className={`h-full w-20 absolute right-0`} />
                                                                                </div>
                                                                                <HexColorPicker color={color2} onChange={setColor2} />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel
                                            className={classNames(
                                            'rounded-xl bg-transparent',
                                            'ring-white'
                                            )}
                                        >
                                            <ImageUploader onChange={handleImageUpload}/>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4">
                            <button type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-300 hover:text-white hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            // onClick={closeModal}
                            >
                                Update change
                            </button>
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-300 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                            >
                                Cancel & dismiss form
                            </button>
                        </div>
                        </Dialog.Panel>
                            </Transition.Child>
                </form>
            </Dialog>
        </Transition>
    </>
    )
}
