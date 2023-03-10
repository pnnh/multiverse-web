
export class RestfulAddress {
  static get ArticleService () {
    if (isNodejs()) {
      const serverUrl = process.env.SERVER
      if (serverUrl) {
        return serverUrl
      }
      return 'http://127.0.0.1:8104'
    }
    return ''
  }

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
