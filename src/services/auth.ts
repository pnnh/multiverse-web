import { getAccountModel } from '@/models/account' 
import { decryptAes } from '@/utils/aes' 
import { cookies } from 'next/headers'  

export async function checkAuth () {
  const cookieStore = cookies()
  const token = cookieStore.get('a') 
 
  console.debug('proxyAuthorization:', token) 
  if (!token || !token.value) {
    return null
  }
  const auth =decryptAes(token.value) 
  if (!auth) {
    return null
  }
  const str = auth + ':' + auth
  const basicToken = 'Basic ' + Buffer.from(str).toString('base64')
  const result = await getAccountModel(basicToken)
  console.debug('result222:', result)
  return result
}
