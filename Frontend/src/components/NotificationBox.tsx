import { useNotification } from "../hooks/useNotification";
import { useEffect } from "react";
export default function NotificationBox(){
    const {messages,remove} = useNotification()
    return (
        <div>
            {messages.map((m)=> (
                <SingleNotification key={m.id} remove={remove} {...m} />
            ))}
        </div>
    )
}

function SingleNotification({remove,id,message}:{id: string,message: string,remove: (id: string) => void}){
    useEffect(()=>{
        const timer = setTimeout(()=>{
            remove(id)
        },3000)
        return clearInterval(timer)
    },[id])
    return (
        <div>
            {message}
        </div>
    )
}