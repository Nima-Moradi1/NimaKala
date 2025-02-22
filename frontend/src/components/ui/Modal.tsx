'use client'

import useOutsideClick from "@/hooks/useOutsideClick";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title : string ,
  children : React.ReactNode ,
  description ?: string
}

function Modal({ open, onClose, title, children, description = "" }:ModalProps) {
  
    //? when modal is open, we want to close it when we click outside of it the reference (outside the Modal) , not just the xMark button
  const ref = useOutsideClick(onClose);
  if (typeof window === "undefined") return null;
  return (
    open &&
    //? createPortal defines where the modal should be rendered (which here is the body) why ? because we want the modal to be on top of everything
    createPortal(
      <div
        className="backdrop-blur-lg fixed top-0 left-0
           w-full h-screen z-50"
      >
        <div
          ref={ref}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-xl bg-white  shadow-inner shadow-secondary-300 p-5 transition-all duration-500 ease-out
        w-[calc(100vw-2rem)] md:max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto
        "
        >
          <div
            className="flex items-center justify-between border-b 
          border-b-secondary-300 pb-2 mb-6"
          >
            <div>
              <p className="text-secondary-700 font-bold text-base">{title}</p>
              <p className="text-secondary-400 text-sm lg:text-base">
                {description}
              </p>
            </div>
            <button onClick={onClose}>
              <XMarkIcon className="w-5 h-5 text-secondary-500" />
            </button>
          </div>
          {children}
        </div>
      </div>,
      document?.body || null
    )
  );
}
export default Modal;
