/* eslint-disable @typescript-eslint/no-explicit-any */
import {UseFormRegister, FieldValues} from 'react-hook-form'
import { TagsInput } from 'react-tag-input-component';


interface RHFTagInputProps {
  type? : string ,
  label : string ,
  name : string ,
  dir?: string ,
  register: UseFormRegister<FieldValues> | any,
  errors?: any
  validationSchema? : object ,
  isRequired? : boolean , 
  onInput? : React.FormEventHandler<HTMLInputElement>
  value? : string[] , 
  onChange? : ((tags: string[]) => void)
}

export default function RHFTagInput({
  label,
  name,
  register,
  errors,
  isRequired,
  value,
  onChange,
  validationSchema = {},
}:RHFTagInputProps) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);
  return (
    <div
      className={`textField w-full relative ${hasError ? "textField--invalid" : ""}`}
    >
      <label htmlFor={name} className="mb-2 mr-2 block text-secondary-700">
        {label}
        {isRequired && <span className='text-error'>*</span>}
      </label>
      <TagsInput classNames={{input : 'textField__input'}}
      value={value || []} name={name}
      {...register(name, validationSchema)}
      onChange={(newTags) => {
        onChange?.(newTags);
      }}
      />
      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}
