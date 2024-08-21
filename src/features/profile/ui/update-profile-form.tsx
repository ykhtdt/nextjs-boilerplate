"use client"

import type { User } from "@/shared/api/account/types"

import { type ChangeEvent, useReducer } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"

import { formatTelNumber } from "@/shared/lib/formatting"
import { apiPutProfiles } from "@/shared/api/account/profiles.put"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { ResetPasswordDialog } from "./reset-password-dialog"

type ProfileFormProps = {
  profile: User;
}

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "이름을 입력해주세요."),
  tel: z.string().regex(/^[0-9\-]*$/).min(11, "전화번호 형식이 올바르지 않습니다.").max(13, "전화번호 형식이 올바르지 않습니다."),
  deptName: z.string().optional(),
  position: z.string().optional(),
  role: z.string().optional(),
})

export const UpdateProfileForm = ({
  profile,
}: ProfileFormProps) => {
  const { toast } = useToast()

  const [isPasswordResetDialogOpen, toggleIsPasswordResetDialogOpen] = useReducer((state) => !state, false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profile.email,
      name: profile.name,
      tel: profile.tel,
    },
  })

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const nextValues = {
        id: profile.id,
        name: values.name,
        tel: values.tel,
      }

      return await apiPutProfiles(nextValues)
    },
    onSuccess: () => {
      toast({
        description: "프로필이 수정되었습니다.",
        duration: 2000,
      })
    },
    onError: () => {
      toast({
        description: "프로필 수정에 실패했습니다.",
        duration: 2000,
      })
    }
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutation.mutateAsync(values)
  }

  const handleTelNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const formattedValue = formatTelNumber(inputValue)

    form.setValue("tel", formattedValue)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex flex-row items-start">
                <FormField
                  control={form.control}
                  name="email"
                  disabled
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <FormLabel className="w-full sm:w-1/6 text-base">
                        이메일
                      </FormLabel>
                      <div className="w-full sm:w-auto sm:flex-1 flex flex-col">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="이메일"
                            className="sm:mb-2 py-4 px-5 h-auto text-base text-foreground disabled:text-gray-400 focus-visible:ring-primary rounded-lg shadow-primary/10 disabled:opacity-100 disabled:bg-gray-100 disabled:border-gray-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="ml-2 h-0" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row items-start">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <FormLabel className="w-full sm:w-1/6 text-base">
                        이름
                      </FormLabel>
                      <div className="w-full sm:w-auto sm:flex-1 flex flex-col">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="이름"
                            className="sm:mb-2 py-4 px-5 h-auto text-base text-foreground disabled:text-gray-400 focus-visible:ring-primary rounded-lg shadow-primary/10 disabled:opacity-100 disabled:bg-gray-100 disabled:border-gray-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="ml-2 h-0" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row items-start">
                <FormField
                  control={form.control}
                  name="tel"
                  render={({ field }) => (
                    <FormItem className="space-y-0 w-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <FormLabel className="w-full sm:w-1/6 text-base">
                        연락처
                      </FormLabel>
                      <div className="w-full sm:w-auto sm:flex-1 flex flex-col">
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="연락처"
                            className="sm:mb-2 py-4 px-5 h-auto text-base text-foreground disabled:text-gray-400 focus-visible:ring-primary rounded-lg shadow-primary/10 disabled:opacity-100 disabled:bg-gray-100 disabled:border-gray-200"
                            {...field}
                            onChange={handleTelNumberChange}
                          />
                        </FormControl>
                        <FormMessage className="ml-2 h-0" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-1/6 text-base font-medium">
                  비밀번호
                </div>
                <div className="w-full sm:w-auto sm:flex-1 flex flex-col">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleIsPasswordResetDialogOpen}
                    className="w-auto self-start"
                  >
                    비밀번호 재설정
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="my-10 w-full text-center">
            <Button
              type="submit"
              variant="outline"
              className="w-full sm:w-80 h-12 border-primary bg-white text-primary hover:text-primary/90 text-base font-normal"
            >
              저장
            </Button>
          </div>

        </form>
      </Form>

      <ResetPasswordDialog
        defaultValues={{
          email: profile.email,
        }}
        isOpen={isPasswordResetDialogOpen}
        onClose={toggleIsPasswordResetDialogOpen}
      />
    </>
  )
}
