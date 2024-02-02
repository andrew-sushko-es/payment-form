import {BaseHttp, IBaseHttp} from '../../../utils'

type ValidateResponse = {iban: string; valid: boolean}

export class BankTransferService {
    constructor(private baseHttpService: IBaseHttp) {}

    validateIban = async (iban: string) => {
        const searchParams = new URLSearchParams()
        searchParams.append('iban', iban)
        const requestUrl = `/validate?${searchParams.toString()}`
        return this.baseHttpService.makeRequest<ValidateResponse>(requestUrl)
    }

    validateIbanMock = async (iban: string): Promise<ValidateResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const response = {iban, valid: false}
                if (iban !== 'LT307300010172619164') {
                    reject(response)
                }
                resolve({...response, valid: true})
            }, 300)
        })
    }
}

export default new BankTransferService(BaseHttp)
