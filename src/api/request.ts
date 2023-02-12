import axios from 'axios'

const request = axios.create({
    url:'/',
    timeout:3000
})

request.interceptors.response.use((res=>{
    return res.data
}))
export default request
