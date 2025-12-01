import api from "../utils/api";
import type { Response,User } from "../types/types";
async function login(username: string,password: string): Promise<Response> {
    const result = await api.post<Response>("/login",{username,password})
    return result.data
}
async function signup(username: string,password: string): Promise<Response> {
    const result = await api.post<Response>("/signup",{username,password})
    return result.data
}
async function logout(): Promise<Response> {
    const result = await api.get<Response>("/logout")
    return result.data
}
async function auth(): Promise<User> {
    const result = await api.get<User>("/auth")
    return result.data
}
export {login,signup,logout,auth}