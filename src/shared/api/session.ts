"use server"

import { cookies } from "next/headers"

import { jwtVerify } from "jose"

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_ENCRYPT_KEY)

const decrypt = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    SECRET_KEY,
    {
      algorithms: ["HS256"]
    }
  )

  return payload
}

export const getSession = async () => {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie || !sessionCookie.value) {
    return null
  }

  return await decrypt(sessionCookie.value)
}
