import React from 'react'

interface RadioInputProps {
    name : string, 
    id : string ,
    value: string , 
    checked: boolean , 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange : any ,
    label: string
}

const RadioInput = ({name,id,value,checked,onChange , label}:RadioInputProps) => {
  return (
    <div className='flex items-center gap-x-2'>
        <input type='radio' value={value}
        name={name} id={id} checked={checked} onChange={onChange}
        className='cursor-pointer rounded-full border-none bg-secondary-100/80 size-4
        checked:text-primary-900'/>
        <label htmlFor={id} className='cursor-pointer text-xs md:text-base'>{label}</label>
    </div>
  )
}

export default RadioInput