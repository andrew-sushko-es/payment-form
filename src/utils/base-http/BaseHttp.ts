export interface IBaseHttp {
    baseUrl: string
    makeRequest: <T>(url: string, options?: RequestInit) => Promise<T>
}

export class BaseHttp implements IBaseHttp {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    makeRequest = async <T>(url: string, options: RequestInit = {}) => {
        const response = await fetch(`${this.baseUrl}${url}`, options)
        return response.json() as Promise<T>
    }
}

export default new BaseHttp('https://matavi.eu')
