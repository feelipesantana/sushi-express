import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import { UnauthorizedError } from "./errors/unauthorized-error";
import { createId } from "@paralleldrive/cuid2";
import { authLinks } from "../../db/schemas/auth-links";
import { env } from "../../env";

export const sendAuthenticationLink = new Elysia().post('/authenticate', 
  async ({body}) => {
    const {email} = body

    console.log("passou aqui", email)
    const userFromEmail = await db.query.users.findFirst({
      where(fields, {eq}){
        return eq(fields.email, email)
      }
    })

    console.log('finded', userFromEmail)
    if(!userFromEmail){
      throw new UnauthorizedError()
    }

    const authLinkCode = createId()

    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode
    })
    
    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)
    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

  },
  {
    body:t.Object({
      email:t.String({format: 'email'})
    })
  }
)