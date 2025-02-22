/* eslint-disable @typescript-eslint/no-explicit-any */
import {UseFormRegister, FieldValues} from 'react-hook-form'


interface RHFTextFieldProps {
  type? : string ,
  label : string ,
  name : string ,
  dir?: string ,
  register?: UseFormRegister<FieldValues> | any,
  errors?: any
  validationSchema? : object ,
  isRequired? : boolean , 
  onInput? : React.FormEventHandler<HTMLInputElement>
  value? : string , 
  onChange? : React.ChangeEventHandler<HTMLInputElement>
}

export default function RHFTextField({
  type = "text",
  label,
  name,
  dir = "rtl",
  register,
  errors,
  isRequired,
  onInput,
  value,
  onChange,
  validationSchema = {},
  ...rest
}:RHFTextFieldProps) {
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
      <input
      onChange={onChange}
      onInput={onInput}
        autoComplete="off"
        type={type}
        id={name}
        dir={dir}
        value={value}
        className={`textField__input  ${
          dir === "ltr" ? "text-left" : "text-right"
        }`}
        {...register(name, validationSchema)}
        {...rest}
      />
      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}
