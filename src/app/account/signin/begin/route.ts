import { makeAssertionOptions } from '@/models/account'
import { NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest) { 
  // const oauthIssuer = await Issuer.discover('http://127.0.0.1:8001/server/oauth2/token')
  // console.log('Discovered issuer %s %O', oauthIssuer.issuer, oauthIssuer.metadata)
  
  return NextResponse.json({
    ok: 'GET2222222 /api/route',
  })

}

export async function POST (request: NextRequest) { 
  
  const formData = await request.formData()
  
  const result = await makeAssertionOptions(formData)
  console.debug('signin begin result:', result)
  
  return NextResponse.json(result)

}
