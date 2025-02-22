import { useEffect, useRef } from "react";

const useOutsideClick = (handler : ()=> void , listenCapturing = true) => {
useEffect(() => {
    function handleClick (e) {
        //? we basically say check if user has clicked "outside" the modal, if so, close the modal with handler (which is the onClose on the Modal.tsx component)

        if (ref.current && !ref.current.contains(e.target)) {
            handler()
        }
    }
    document.addEventListener('click' , handleClick , listenCapturing)
    //cleanup function
    return () => {
        document.removeEventListener('click' , handleClick , listenCapturing)
    }
}, [handler , listenCapturing])

    const ref = useRef<HTMLDivElement>(null)
  return ref;
}

export default useOutsideClick