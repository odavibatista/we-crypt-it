import api, { IAPIError } from "../../api"

export interface IDecryptMatrixRequest {
    encryptedMatrix: string
    iv: string
    secret: string
}

export interface IDecryptMatrixResponse {
    decryptedMatrix: string
}

export const decryptMatrix = async (data: IDecryptMatrixRequest): Promise<IDecryptMatrixResponse | IAPIError> => {
    const response = await api.post('/matrix/decrypt', data).catch((error) => {
        return error.response
      })
    
      return response.data
}