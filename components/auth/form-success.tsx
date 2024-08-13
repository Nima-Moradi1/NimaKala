import { CheckCircle2 } from "lucide-react"



export const FormSuccess = ({message} : {message? : string}) => {
    if(!message) return null 

    return (
        <div className="bg-teal-400/25 my-2 text-xs flex items-center gap-3 text-secondary-foreground p-3 rounded-xl">
            <CheckCircle2 className="size-4"/>
            <p>{message}</p>
        </div>
    )
}