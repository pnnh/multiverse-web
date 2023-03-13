
export class RestfulAddress {
  static get ResourceServerUrl () {
    if (isNodejs()) {
      return process.env.RESOURCE_SERVER 
    }
    return ''
  }
}

export function isNodejs () {
  return typeof window === 'undefined'
}

export function isBrowser () {
  return typeof window !== 'undefined'
}
