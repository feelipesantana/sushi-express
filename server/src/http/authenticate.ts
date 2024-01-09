import Elysia from 'elysia'
import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'
import { env } from '../env'
import { z } from 'zod'
import { UnauthorizedError } from './routes/errors/unauthorized-error'
import { NotAManagerError } from './routes/errors/not-a-manager-error'
import { db } from '../db/connection'

const jwtPayloadSchema = z.object({
  sub: z.string(),
  restaurantId: z.string().optional()
})



export const authenticate = new Elysia()
.error({
  UNAUTHORIZED:UnauthorizedError,
  NOT_A_MANAGER: NotAManagerError
})
.onError(({code, error, set}) =>{
  switch (code){
    case 'UNAUTHORIZED': set.status = 401
      return {code, message: error.message}
    case 'NOT_A_MANAGER': set.status = 401
      return {code, message: error.message}
    
  }
})
.use(
  jwt({
    name: 'jwt',
    secret: env.JWT_SECRET
  })
)
.use(cookie())
.post('/auth', async ({ jwt, cookie, setCookie, body,request }) => {

  const authSchemaZod = z.object({
  email: z.string().email(),
  password: z.string(),
})
  const {email, password} = authSchemaZod.parse(body)

  console.log(email, password)
  

  const getEmail = await db.query.users.findFirst({
    with:{
      email
    }
  })

  console.log(getEmail)
  // if(!getEmail){
  //   throw new UnauthorizedError()
  // }
  // setCookie('auth', await jwt.sign(), {
  //     httpOnly: true,
  //     maxAge: 7 * 86400,
  // })

  return `Sign in as ${cookie.auth}`
})
.get('/profile', async ({ jwt, set, cookie: { auth } }) => {
  const profile = await jwt.verify(auth)

  if (!profile) {
      set.status = 401
      return 'Unauthorized'
  }

  return `Hello ${profile.name}`
})