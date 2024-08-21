import type { User } from "./types"

import { api } from "../base"

type InputProfilesValues = Partial<Omit<User, "id">>;

type PutProfilesValues = {
  id: User["id"];
} & InputProfilesValues;

type PutProfilesResponse = User;

export const apiPutProfiles = async (values: PutProfilesValues) => {
  const response = await api<PutProfilesResponse>("api/account/profiles", {
    method: "PUT",
    body: {
      ...values
    },
  })

  return response
}
