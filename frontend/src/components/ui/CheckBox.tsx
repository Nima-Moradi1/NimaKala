export default function CheckBox({label , value , onChange , id , checked , name}) {
    return (
        <div className="flex items-center">
            <input type="checkbox" name={name} id={id} checked={checked}
            value={value} onChange={onChange}
            className="form-checkbox border border-secondary-400 rounded-md
            checked:bg-primary-800
             cursor-pointer size-5"
             />
             <label className="cursor-pointer m-2 text-xs md:text-base" htmlFor={id}>
                {label}
             </label>
        </div>
    )
}