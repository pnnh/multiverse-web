import { RestfulAddress } from '@/utils/config'
import axios from 'axios'
import { CommonReslut } from './common-result'
 
export class ResourceModel {
  pk = ''
  title = ''
  header = ''
  body = ''
  create_time: Date = new Date()
  update_time: Date = new Date()
  creator = ''
  keywords = ''
  description = ''
}

export class selectResultModel {
  count = 0
  list: ResourceModel[] = []
}

export async function selectResourceModels (page: number, size: number): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<CommonReslut<selectResultModel>>(RestfulAddress.ResourceServerUrl + '/public/resource/select',
    { params: { offset, limit: size } })
  return response.data.data
}

export async function getResourceModel (pk: string): Promise<ResourceModel> {
  const response = await axios.get<CommonReslut<ResourceModel>>(RestfulAddress.ResourceServerUrl + '/public/resource/get', { params: { pk } })
  return response.data.data
}
