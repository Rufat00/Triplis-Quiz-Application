import axios from 'axios'
import congig from './config.json'

const baseURL = congig.baseURL

const api = axios.create({
    withCredentials: true,
    baseURL: baseURL,
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use(config => config, async error => {
    if(error.response.status === 401){
        const response = await axios.get(`${baseURL}/auth/refresh`, {withCredentials: true})
        localStorage.setItem('token',response.data.accessToken)
        return api.request(error.config)
    }
})

export default api;