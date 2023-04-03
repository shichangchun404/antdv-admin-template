import axios from "@/api/axios"

export function login(data:any) {
  return axios.post('/api/v1/auth/login', data)
}

export const getUserInfo = (): any => {
  return axios.get("/api/v1/user/info")
}
