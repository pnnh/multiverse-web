
import { NextRequest, NextResponse } from 'next/server' 
import { Issuer } from 'openid-client'  
import queryString from 'query-string'


// export async function GET ({ params, searchParams }: { 
//   params: { slug: string;
//   searchParams?: { [key: string]: string | string[] | undefined }; } }) { 
//   console.log('router22', searchParams)
//   const introspectResult = await loadGet(searchParams.token)  
//   return NextResponse.json({
//     ok: 'GET2222222 /api/route',
//     data: introspectResult
//   })
// }
export async function GET (request: NextRequest) { 
  const searchParams = queryString.parseUrl(request.url).query
  console.log('router22', searchParams)
  const introspectResult = await loadGet(searchParams.token)  
  if (introspectResult && introspectResult.active) {
    return NextResponse.json({
      code: 200,
      data: {
        username: 'NotPeter',
        nickname: 'NotPeter'
      }
    })
  } 
  return NextResponse.json({
    code: 400,
    message: 'token is invalid'
  }) 
}


export async function loadGet (token: string) { 
  const oauthIssuer = await Issuer.discover('https://debug.multiverse.direct')
  //console.log('Discovered issuer %s %O', oauthIssuer.issuer, oauthIssuer.metadata)
   
  const client = new oauthIssuer.Client({
    client_id: 'pwa',
    client_secret: 'foobar',
    scope: 'openid',
    // redirect_uris: ['https://debug.polaris.direct/server/oauth2/code'],
    // response_types: ['code'],
    // id_token_signed_response_alg (default "RS256")
    // token_endpoint_auth_method (default "client_secret_basic")
  }) 

  const introspectResult = await client.introspect(token)
  console.log('introspectResult: ', introspectResult)
  return introspectResult
}
 
