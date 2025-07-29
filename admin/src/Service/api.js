import axios from "axios"

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_USRL_API}/api/v1`,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = token
    }
    return config
},
    (err) => {
        return Promise.reject(err)
    }
)

export const adminAuth = {

    login: async (loginData) => {
        const res = await api.post("/auth/login", loginData)
        return res.data
    }
}