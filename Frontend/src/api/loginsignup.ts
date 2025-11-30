import api from "../utils/api";
import type { Response,User } from "../types/types";
async function login(): Promise<Response> {
    const result = await api.post<Response>("/login")
    return result.data
}
async function signup(): Promise<Response> {
    const result = await api.post<Response>("/signup")
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