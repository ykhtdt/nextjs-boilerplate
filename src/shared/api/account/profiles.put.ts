import type { User } from "./types"

import { api } from "../base"

type ProfileValues = {
  id: User["id"];
} & Partial<Omit<User, "id">>;

export const apiPutProfiles = async (values: ProfileValues) => {
  const response = await api<User>("api/account/profiles", {
    method: "PUT",
    body: {
      ...values 
    },
  })

  return response
}
