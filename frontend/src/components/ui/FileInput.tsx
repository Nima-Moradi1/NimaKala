/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"

interface FileInputProps {
    label : string ,
    name : string ,
    value : string  ,
    id? : string
    dir? : string ,
    onChange : React.ChangeEventHandler<HTMLInputElement>,
    isRequired? : boolean ,
    className? : string
    validationSchema? : object
    errors? : any
    disabled? : boolean
}

function FileInput({
    label,
    name , 
    id,
    value,
    dir = 'rtl',
    onChange,
    isRequired,
    className,
    disabled ,
    errors,
    ...rest
}:FileInputProps) {

    return (
      <div className="w-full">
        <label htmlFor={id}
         className={`cursor-pointer border-2 border-primary-900 rounded-lg px-3
        py-2 text-primary-900 flex items-center justify-center gap-x-3 ${className}`}>
            {label}
            <ArrowUpTrayIcon className="size-5"/>
            <input id={id} type="file" className="sr-only " disabled={disabled}
            name={name} value={value} onChange={onChange} required={isRequired}
            dir={dir}
            {...rest}
            />
        </label>
        {errors && errors[name] && (
            <span className="text-error block text-xs mt-2">
                {errors[name]?.message}
            </span>
        )}
        </div>
    )
}

export default FileInput