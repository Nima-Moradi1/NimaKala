'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from 'react-select'


function CouponSelect({options , onChange , label , value , register , errors}) {

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "#D4D5DD80",
      borderRadius: "15px",
      padding: "8px",
      border: "1px solid #ccc",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #aaa",
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#f5f5f5",
    }),
    option: (base: any, { isFocused }: any) => ({
      ...base,
      backgroundColor: isFocused ? "#e6e6e6" : "#f5f5f5",
      color: "#333",
      padding: "8px",
      cursor: "pointer",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#dadada",
      borderRadius: "8px",
      padding: "2px",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#666",
    }),
  };
  const name = 'productIds'

    return (
      <div className="w-full">
        <Select 
        isSearchable
        {...register('productIds')}
        className='*:p-2 md:mt-8'
        isMulti
        options={options}
        id='productIds'
        onChange={onChange}
        getOptionLabel={label}
        blurInputOnSelect
        tabSelectsValue
        hideSelectedOptions
        aria-errormessage='error'
        getOptionValue={value} 
        placeholder='انتخاب محصول'
        styles={customStyles}
        noOptionsMessage={() => "محصولی یافت نشد"}
        />
        {errors && errors[name] && (
        <span className="text-red-600 block text-xs -mt-2">
          {errors[name]?.message}
        </span>
      )}
      </div>
    );
  }
  export default CouponSelect;