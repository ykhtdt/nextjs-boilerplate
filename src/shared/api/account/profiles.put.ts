import type { UserDto } from "@/model/userDto"

import { api } from "../base"

type InputProfilesValues = Partial<Omit<UserDto, "id">>;

type PutProfilesValues = {
  id: UserDto["id"];
} & InputProfilesValues;

export const apiPutProfiles = async (values: PutProfilesValues) => {
  const response = await api<UserDto>("api/account/profiles", {
    method: "PUT",
    body: {
      ...values 
    },
  })

  return response
}
