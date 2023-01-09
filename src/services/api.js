import axios from "axios";

const api = axios.create({
    baseURL: 'http://107.21.11.22:8085',

})

export default api;