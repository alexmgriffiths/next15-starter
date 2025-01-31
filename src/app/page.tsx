'use server'

import { verifySession } from "./lib/dal"

export default async function Dashboard() {
  const session = await verifySession()

  return (
    <>
      <code>
        {JSON.stringify(session)}
      </code>
    </>
  )
}