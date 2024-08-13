import { AlertCircle } from "lucide-react"



export const FormError = ({message} : {message? : string}) => {
    if(!message) return null 

    return (
        <div className="bg-destructive/25 my-2 text-xs flex items-center gap-3 text-secondary-foreground p-3 rounded-xl">
            <AlertCircle className="size-4"/>
            <p>{message}</p>
        </div>
    )
}