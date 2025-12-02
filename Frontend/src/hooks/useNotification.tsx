import { create } from "zustand";
import type { NotificationState } from "../types/types";
export const useNotification = create<NotificationState>((set)=>({
    messages: [],
    add: (message)=>set((state)=>({
        messages: [...state.messages, {id: crypto.randomUUID(),message}]
    })),
    remove: (id)=>set((state)=>({
        messages: state.messages.filter((n)=> n.id!==id)
    }))
}))