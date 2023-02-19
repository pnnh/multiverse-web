import React from 'react' 


export default async function Home ({ params }: { params: { page: number } }) {
   
  return <div>
    <h1>已成功登录: {params.page}</h1>
  </div>
}
