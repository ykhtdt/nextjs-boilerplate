import { api } from "../base"

type InputPasswordValues = {
  email: string;
  password: string;
}

type PutPasswordValues = {
  id: string;
} & InputPasswordValues;

type PutPasswordResponse = {
  value: string;
}

export const apiPutPassword = async (values: PutPasswordValues) => {
  const response = await api<PutPasswordResponse>("api/auth/password", {
    method: "PUT",
    body: {
      ...values,
    },
  })

  return response
}
