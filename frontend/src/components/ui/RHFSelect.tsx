/* eslint-disable @typescript-eslint/no-explicit-any */

interface RHFTextSelectProps {
  label : string ,
  name : string ,
  register: any,
  validationSchema? : object ,
  required? : boolean
  options? : {label : string , value : string}[]
  errors? : any
}

function RHFSelect({ label, name, register, options, required }:RHFTextSelectProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <select {...register(name)} id={name} className="textField__input ">
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default RHFSelect;
