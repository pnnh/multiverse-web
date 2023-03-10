import { RestfulAddress } from '@/utils/config'
import axios from 'axios'
import { CommonReslut } from './common-result'


export class AccountModel {
  pk = '' 
  createat: Date = new Date()
  updateat: Date = new Date()
  account = ''
  image = ''
  description = ''
  mail = '' 
  nickname = ''
  
}

export async function getAccountModel (token: string): Promise<AccountModel | null> {
  const response = await axios.post<CommonReslut<AccountModel>>(RestfulAddress.ResourceServerUrl + '/account/userinfo',
    {},
    {
      params: {}, 
      headers: {Authorization: token},
      withCredentials: true,
    }).catch((error) => {
    console.error('tokenIntrospection', error)
    return null
  })
  console.error('response?.status', response?.status)
  if (response?.status !== 200) {
    return null
  }
  console.log('getAccountModel', response.data)
  return response.data.data
}
