import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function CheckBox({ onChange } : { onChange: Function }) {
  const [enabled, setEnabled] = useState(false)

  const handleChange = () => {
    setEnabled(!enabled);
    onChange(!enabled)
  }

  return (
    <div className="p-0">
        <Switch
            checked={enabled}
            onChange={handleChange}
            className={`${enabled ? 'bg-blue-600' : 'bg-slate-700'}
            relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Use setting</span>
            <span aria-hidden="true"
            className={`${enabled ? 'translate-x-[26px]' : 'translate-x-0'}
                pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    </div>
  )
}
