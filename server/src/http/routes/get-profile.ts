import Elysia from 'elysia'


export const getProfile = new Elysia()
  
  .get('/me', async () => {
    console.log("teste")
  })