import axios, { AxiosInstance } from 'axios'
import { API, GITHUB } from '../../public/environment'

class AquaClient {
    axios: AxiosInstance;

    constructor(public baseURL: string = API, public headers?: string) {
        this.axios = axios.create({ 
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': GITHUB.token
            }
         })
    }

    query({ query, variables }: any) {
        return this.axios.post('', { query, variables })
    }
}

export default AquaClient