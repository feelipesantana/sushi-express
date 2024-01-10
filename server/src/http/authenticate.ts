import Elysia, { type Static, t } from 'elysia'
import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'
import { env } from '../env'
import { z } from 'zod'
import { UnauthorizedError } from './routes/errors/unauthorized-error'
import { NotAManagerError } from './routes/errors/not-a-manager-error'

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String())
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
    secret: env.JWT_SECRET,
    schema: jwtPayloadSchema

  })
)
.use(cookie())
.derive(({ jwt, cookie, setCookie, removeCookie }) => {
  return {
    getCurrentUser: async () => {
      const payload = await jwt.verify(cookie.auth)

      if (!payload) {
        throw new UnauthorizedError()
      }

      return payload
    },
    signUser: async (payload: Static<typeof jwtPayloadSchema>) => {
      setCookie('auth', await jwt.sign(payload), {
        httpOnly: true,
        maxAge: 7 * 86400,
        path: '/',
      })
    },
    signOut: () => {
      removeCookie('auth')
    },
  }
})
.derive(({ getCurrentUser }) => {
  return {
    getManagedRestaurantId: async () => {
      const { restaurantId } = await getCurrentUser()

      if (!restaurantId) {
        throw new NotAManagerError()
      }

      return restaurantId
    },
  }
})