import ky from "ky"

import { getSession } from "./session"

interface ErrorData {
  message: string;
}

const baseApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      async (request) => {
        const session = await getSession()
        if (session) {
          request.headers.set("Authorization", `Bearer ${session.token}`)
        }
      }
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const error = await response.json() as ErrorData
          console.error("Error: ", error)

          throw new Error(error.message)
        }
      }
    ]
  }
})

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  searchParams?: Record<string, string | number>;
  body?: Record<string, any>;
  responseType?: "json" | "blob";
}

export const api = async <T>(
  endpoint: string,
  {
    method = "GET",
    headers,
    searchParams,
    body,
    responseType = "json",
  }: ApiRequestOptions = {}
): Promise<T> => {
  try {
    const response = await baseApi(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      searchParams,
      json: body,
    })

    if (responseType === "blob") {
      return await response.blob() as T
    }

    return await response.json<T>()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}
