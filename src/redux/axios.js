import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9998'
axios.defaults.headers.common['token'] = localStorage.getItem('token')
// axios.defaults.baseURL = 'http://localhost:9998'

window.axios = axios

export default axios