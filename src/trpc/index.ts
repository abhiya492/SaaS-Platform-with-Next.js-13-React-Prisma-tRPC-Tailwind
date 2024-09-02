import { db } from '@/db';
import { publicProcedure, router } from './trpc';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
  authCallback:publicProcedure.query(async () =>{
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user.id || !user.email)       
      throw new TRPCError({ code: 'UNAUTHORIZED' })

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success:true }
   }),
})
export type AppRouter = typeof appRouter