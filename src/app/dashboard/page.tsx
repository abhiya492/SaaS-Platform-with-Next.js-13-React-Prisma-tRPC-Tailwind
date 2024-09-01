import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  if (!user || !(await user).id) redirect('/auth-callback?origin=dashboard')

  
  return <div>{(await user).email}</div>
}

export default Page