"use server"

import ky from "ky"

interface ErrorData {
  message: string;
}

const baseApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL as string,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      async (request) => {
        // const token = await getToken()
        // if (token) {
        //   request.headers.set("Authorization", `Bearer ${token}`)
        // }
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
}

export const api = async <T>(
  endpoint: string,
  {
    method = "GET",
    headers,
    searchParams,
    body
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
    }).json<T>()

    return response
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}
