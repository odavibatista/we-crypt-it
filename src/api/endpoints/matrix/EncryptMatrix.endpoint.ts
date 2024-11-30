import api, { IAPIError } from "../../api"

export interface IEncryptMatrixRequest {
    matrix: string
    iv: string
    secret: string
}

export interface IEncryptMatrixResponse {
    encryptedMatrix: string
}

export const encryptMatrix = async (data: IEncryptMatrixRequest): Promise<IEncryptMatrixResponse | IAPIError> => {
    const response = await api.post('/matrix/encrypt', data).catch((error) => {
        return error.response
      })
    
      return response.data
}