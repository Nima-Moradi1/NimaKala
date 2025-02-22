//we made this component because we may use Buttons throughout the project
//the buttons that are with Icons (or even JUST icons)

import { ButtonProps } from "./Button";
const btnIconType = {
    primary:
      "bg-primary-900 text-white hover:bg-primary-800 hover:text-white",
    secondary:
      "bg-secondary-200 text-secondary-500 hover:bg-secondary-300 hover:text-secondary-0",
    outline:
      "border border-secondary-200 text-primary-900 hover:bg-secondary-100/20",
    red: "bg-red-100  text-red-500 hover:bg-red-500 hover:text-white",
    danger: "border border-red-100 text-red-500",
  };

  function ButtonIcon({ children, onClick, className, variant = 'primary', ...rest }:ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`
        ${btnIconType[variant]}
        ${className} flex items-center justify-center gap-x-1 rounded-md p-1
        [&>svg]:size-5 [&>svg]:text-inherit
        text-xs lg:text-sm w-full
        transition-all duration-300 ease-out"`}
        {...rest}
      >
        {children}
      </button>
    );
  }
  
  export default ButtonIcon;
  
  //  NOTE for [&>svg]:size-5 [&>svg]:text-inherit :
  // since we know that this component accepts an icon as a link and button,
  // we should always give styles to the icons we pass to it as well (e.g bookmark icon or ...)
  // so, we place this code once and for all and won't write styles for each icon we pass to the button
  // every single time !