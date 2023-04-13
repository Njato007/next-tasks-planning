import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

const gradients = [
    {name: 'flowercolor', from: '#FFCDA5', to: '#EE4D5F'},
    {name: 'good', from: '#FF9482', to: '#7D55FF'},
    {name: 'orange1', from: '#FFCF18', to: '#FF881B'},
    {name: 'orange2', from: '#FFA62E', to: '#EA4D2C'},
    {name: 'rose', from: '#FF9897', to: '#F650A0'},
    {name: 'cyan', from: '#00FFED', to: '#00B8BA'},
    {name: 'bluef2', from: '#64E8DE', to: '#8A64EB'},
    {name: 'lemon', from: '#FCEE21', to: '#009245'},
    {name: 'blues', from: '#A3A1FF', to: '#3A3897'},
    {name: 'raddark', from: '#ED1E79', to: '#662D8C'},
    {name: 'bluedark', from: '#3499FF', to: '#3A3985'},
    {name: 'lemondark', from: '#3AA17E', to: '#00537E'},
]


export default function GradientList({ onSelectColor } : {onSelectColor: Function}) {
  const [selected, setSelected] = useState(gradients[0]);

  const handleSelect = (data: any) => {
    onSelectColor(data)
    setSelected(data)
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={handleSelect}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="grid grid-cols-6 gap-1">
            {gradients.map((color) => (
              <RadioGroup.Option
                key={color.name}
                value={color}
                style={{background: `linear-gradient(135deg, ${color.from}, ${color.to})`}}
                className={({ active, checked }) =>
                  `${ active ? 'ring-1 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : '' }
                  ${checked ? 'ring-1 ring-white ring-offset-2 ring-offset-sky-300 bg-opacity-75 text-white' : ''}
                    relative flex cursor-pointer rounded-lg items-center h-[60px] w-[60px] shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-center">
                      <div className="flex items-center">
                        <div className="text-sm flex item-center justify-center">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium text-xs  ${
                              checked ? 'text-white' : 'text-slate-100'
                            }`}
                          >
                            {/* {color.name} */}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={` ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            {/* Here the image */}

                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
