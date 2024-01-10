import Elysia from 'elysia'
import { authenticate } from '../authenticate'
import { db } from '../../db/connection'


export const getProfile = new Elysia().use(authenticate).get('/me', async ({getCurrentUser}) => {
    const {sub: userId} = await getCurrentUser()

    const user = await db.query.users.findFirst({
      where(fields, {eq}){
        return eq(fields.id, userId)
      }
    })

    if(!user){
      throw new Error("User not found.")
    }

    return user
})