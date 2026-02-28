import axios from "axios"

const request = axios.create({
    baseURL: "https://blog-pro-platform-wyuz8.sevalla.app"
})

export default request