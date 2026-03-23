import axios from 'axios'

const firebase_api = axios.create({
    baseURL:'https://fisioapp-f10cc-default-rtdb.firebaseio.com'
})

firebase_api.interceptors.request.use((config) => {
    if ((config.method || '').toLowerCase() === 'get') {
        config.headers = {
            ...config.headers,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
        }
    }
    return config
})

export default firebase_api