import axios from 'axios'

const firebase_api = axios.create({
    baseURL:'https://fisioapp-f10cc-default-rtdb.firebaseio.com'
})

export default firebase_api