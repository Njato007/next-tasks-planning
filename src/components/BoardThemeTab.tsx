"use client"
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import ColorPicker from './ColorPicker'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { HexColorPicker } from 'react-colorful'
import Input from './ui/Input'
import { ImageUploader } from './ImageUploader'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function BoardThemeTab() {
  const data = [
      { title: 'Simple', value: 0},
      { title: 'Gradient', value: 1},
  ]
  const [selected, setSelected] = useState(data[0]);
  const [color, setColor] = useState<string>('#1391cf')
  const [color1, setColor1] = useState<string>('#1391cf')
  const [color2, setColor2] = useState<string>('#1391cf')
  type DataType = {
    title: string, value: number
  }

  const handleColorTypeSelect = (data: DataType) => {
    setSelected(data);
  }

  function handleUploadImage(data: any) {
    console.log(data)
  }

  return (
    <div className="w-full max-w-lg px-2 py-1 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-slate-900/20 p-1">
            <Tab className={({ selected }) =>
                classNames(
                  'w-full rounded-md py-2 text-sm font-medium leading-5 text-slate-600',
                  'ring-white ring-opacity-60 outline-none',
                  selected
                    ? 'bg-white dark:bg-slate-700 shadow dark:text-slate-200'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >Background color</Tab>
            <Tab className={({ selected }) =>
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
                              {data.map((item, itemIdx) => (
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
                                  <Input type="text" size='md' className='w-full border-none' defaultValue={color} />
                                  <input type='color' disabled defaultValue={color} className={`h-full w-20 absolute right-0`} />
                                </div>
                                <HexColorPicker color={color} onChange={setColor} />
                              </div>
                            </>
                          ): (
                            <div className='grid grid-cols-2 space-x-1'>
                              <div className="p-1 flex flex-col gap-1">
                                <div className="w-full max-w-[200px] flex items-center justify-between relative">
                                  <Input type="text" size='md' className='w-full border-none' defaultValue={color1} />
                                  <input type='color' disabled defaultValue={color1} className={`h-full w-20 absolute right-0`} />
                                </div>
                                <HexColorPicker color={color1} onChange={setColor1} />
                              </div>
                              <div className="p-1 flex flex-col gap-1">
                                <div className="w-full max-w-[200px] flex items-center justify-between relative">
                                <Input type="text" size='md' className='w-full border-none' defaultValue={color2} />
                                  <input type='color' disabled defaultValue={color2} className={`h-full w-20 absolute right-0`} />
                                </div>
                                <HexColorPicker color={color2} onChange={setColor2} />
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                    <div className="">
                    </div>
                </div>
            </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-transparent',
                  'ring-white'
                )}
              >
                  <ImageUploader onChange={handleUploadImage}/>
              </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

function ComboBox({onChange} : {onChange?: Function}) {
    const data = [
        { title: 'Simple', value: 0},
        { title: 'Gradient', value: 1},
    ]
    const [selected, setSelected] = useState(data[0])

    return (
        <div className="">
        <Listbox value={selected} onChange={setSelected}>
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((item, itemIdx) => (
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
        </div>
    )
}

