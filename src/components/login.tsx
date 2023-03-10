'use client'

import React, { useEffect, useState } from 'react' 

 
import {registerUser, loginUser} from './webauthn' 
  
export function LoginPage () { 
  const [username, setUsername] = useState('larry')
  return <div>
      Username: 
  <input type="text" name="username" id="email" value={username} onChange={(event) => {
    setUsername(event.target.value)
  }} placeholder="i.e. foo@bar.com"/> 
  <button onClick={() => registerUser(username).then()}>Register</button>
  <button onClick={() => loginUser(username).then() }>Login</button>
  </div>
}
