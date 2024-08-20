import type { User } from "@/shared/api/account/types"

import { api } from "@/shared/api/base"

import { UpdateProfileForm } from "@/features/profile/ui/update-profile-form"

const getProfile = async () => {
  const response = await api<User>("api/account/profiles", {
    method: "GET"
  })

  return response
}

const Page = async () => {
  const profile = await getProfile()

  return (
    <div className="flex flex-col">
      <UpdateProfileForm profile={profile} />
    </div>
  )
}

export default Page