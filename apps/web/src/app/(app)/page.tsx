import { auth } from "@/auth/auth"
import { Header } from "@/components/header"
import { redirect } from "next/navigation"


export default async function  Home() {

  const { user } = await auth()

  console.log(user)

  // if (!user) {
  //   return redirect('/auth/sign-in')
  // }

  // return <pre>{JSON.stringify(user, null, 2)}</pre>

  return (
    <div className="py-4">
      <Header />
      <main>
        
      </main>
    </div>
  )
}
