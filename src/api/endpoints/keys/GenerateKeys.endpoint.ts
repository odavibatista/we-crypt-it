import api, { IAPIError } from "../../api"

export interface IGenerateKeyResponse {
    iv: string
    secret: string
}

export const generateKeys = async (): Promise<IGenerateKeyResponse | IAPIError> => {
    const response = await api.post('/key/generate').catch((error) => {
        return error.response
      })
    
      return response.data
}