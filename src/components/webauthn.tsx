import { base64url } from 'rfc4648'
  
// Base64 to ArrayBuffer
function bufferDecode (value: string) {
  return base64url.parse(value, { loose: true })
  // let buffer = window.atob(value);
  // return Uint8Array.from(buffer, c => c.charCodeAt(0));
}

function bufferEncode (value: ArrayBuffer) {
  return base64url.stringify(new Uint8Array(value), { pad: false })
  // var u8Array = new Uint8Array(value) 
  // let result = Array.from(u8Array);
  // return window.btoa(String.fromCharCode.apply(null, result))
  //   .replace(/\+/g, "-")
  //   .replace(/\//g, "_")
  //   .replace(/=/g, "");;

}

export async function registerUser (username: string) {

  if (username === '') {
    alert('Please enter a username')
    return
  }

  try {

    const beginResponse = await fetch(
      '/server/register/begin/' + username,
      { method: 'GET' })

    const credentialCreationOptions = await beginResponse.json()

    console.log('credentialCreationOptions', credentialCreationOptions)
    credentialCreationOptions.publicKey.challenge = bufferDecode(credentialCreationOptions.publicKey.challenge)
    credentialCreationOptions.publicKey.user.id = bufferDecode(credentialCreationOptions.publicKey.user.id)
    if (credentialCreationOptions.publicKey.excludeCredentials) {
      for (let i = 0; i < credentialCreationOptions.publicKey.excludeCredentials.length; i++) {
        credentialCreationOptions.publicKey.excludeCredentials[i].id = bufferDecode(credentialCreationOptions.publicKey.excludeCredentials[i].id)
      }
    }

    const credential = await navigator.credentials.create({
      publicKey: credentialCreationOptions.publicKey
    })
    console.log('credential', credential)
    const attestationObject = credential?.response.attestationObject
    const clientDataJSON = credential?.response.clientDataJSON
    const rawId = credential?.rawId

    await fetch(
      '/server/register/finish/' + username,
      {
        method: 'POST',
        body: JSON.stringify({
          id: credential?.id,
          rawId: bufferEncode(rawId),
          type: credential?.type,
          response: {
            attestationObject: bufferEncode(attestationObject),
            clientDataJSON: bufferEncode(clientDataJSON),
          },
        })

      })

    console.log('successfully registered ' + username + '!')
  } catch (error) {

    console.error('failed to register ' + username, error)
  }
}

export async function loginUser (username: string) {

  if (username === '') {
    alert('Please enter a username')
    return
  }

  try {

    const response = await fetch('/server/login/begin/' + username, { method: 'GET' })

    const credentialRequestOptions = await response.json()
    console.log('credentialRequestOptions', credentialRequestOptions)
    credentialRequestOptions.publicKey.challenge = bufferDecode(credentialRequestOptions.publicKey.challenge)
    credentialRequestOptions.publicKey.allowCredentials.forEach((listItem: any) => {
      listItem.id = bufferDecode(listItem.id)
    })

    const assertion = await navigator.credentials.get({
      publicKey: credentialRequestOptions.publicKey
    })
    console.log('assertion', assertion)
    const authData = assertion?.response.authenticatorData
    const clientDataJSON = assertion?.response.clientDataJSON
    const rawId = assertion?.rawId
    const sig = assertion?.response.signature
    const userHandle = assertion?.response.userHandle

    const finishResponse = await fetch(
      '/server/login/finish/' + username,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: assertion?.id,
          rawId: bufferEncode(rawId),
          type: assertion?.type,
          response: {
            authenticatorData: bufferEncode(authData),
            clientDataJSON: bufferEncode(clientDataJSON),
            signature: bufferEncode(sig),
            userHandle: bufferEncode(userHandle),
          },
        })
      })

    const finishJson = await finishResponse.json()
    console.log('successfully logged in ' + username + '!', finishJson)

    const urlParams = new URLSearchParams(window.location.search)
    let myParam = urlParams.get('redirect')
    console.log('redirect', window.location.host + myParam)
    if (!myParam) {
      myParam = '/' + username
    }
    window.location.href = myParam
  } catch (error) {

    console.error('failed to register ' + username, error)
  }
}
