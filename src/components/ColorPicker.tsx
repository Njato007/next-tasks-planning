'use client'
import { HexColorPicker } from "react-colorful";
import { useState } from 'react'

const ColorPicker = ({color, onChange} : {color: string, onChange: Function}) => {
  const handleChange = (data: any) => onChange(data)
  // return <HexColorPicker color={color} onChange={setColor} />;
  return <HexColorPicker className='w-[150px] h-[150px]' color={color} onChange={handleChange} />
};

export default ColorPicker;