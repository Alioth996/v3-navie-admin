import axios from 'axios'

//const URL = import.meta.env.VITE_MOCK_URL

const request = axios.create({
    url:'/',
    timeout:3000
})


//console.log(URL)

request.interceptors.response.use((res=>{
    return res.data
}))
export default request
