"use cleint"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"

import { CheckCircledIcon } from "@radix-ui/react-icons"

import { apiPutPassword } from "@/shared/api/auth/password.put"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  resetPasswordSchema,
  PasswordCriteria,
} from "@/features/profile"

type DefaultValues = {
  email: string;
}

type ResetPasswordDialogProps = {
  defaultValues: DefaultValues;
  isOpen: boolean;
  onClose: () => void;
}

export const ResetPasswordDialog = ({
  defaultValues,
  isOpen,
  onClose,
}: ResetPasswordDialogProps) => {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: defaultValues.email,
      password: "",
      passwordConfirm: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof resetPasswordSchema>) => {
      const nextValues = {
        id: "",
        email: defaultValues.email,
        password: values.password,
      }

      return await apiPutPassword(nextValues)
    },
    onSuccess: () => {
      toast({
        description: "비밀번호가 변경되었습니다.",
        duration: 2000,
      })
    },
    onError: () => {
      toast({
        description: "비밀번호 변경에 실패했습니다.",
        duration: 2000,
      })
    }
  })

  const handleSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    await mutation.mutateAsync(values)
  }

  const handleClose = () => {
    onClose()
    form.reset()
  }

  const passwordFieldValue = form.watch("password")

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="p-0 gap-0 max-w-[calc(100%-2rem)] rsm:max-w-2xl bg-white overflow-hidden border-0"
      >

        <DialogHeader className="border border-b py-3 px-4 rsm:py-4 rsm:px-5">
          <DialogTitle className="flex flex-row items-center gap-2 text-lg rsm:text-xl font-bold text-primary text-left">
            <CheckCircledIcon className="w-6 h-6" />
            비밀번호 변경
          </DialogTitle>
          <DialogDescription className="sr-only">
            재설정할 비밀번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="py-3 px-4 rsm:p-10">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs rsm:text-sm">
                      이메일
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일"
                        autoComplete="username"
                        className="py-3 px-4 rsm:py-4 rsm:px-5 h-auto text-sm rsm:text-base text-foreground disabled:text-gray-400 focus-visible:ring-primary rounded-lg shadow-primary/10 disabled:opacity-100 disabled:bg-gray-100 disabled:border-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs rsm:text-sm">
                      비밀번호 입력
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="패스워드를 입력하세요"
                        autoComplete="new-password"
                        className="py-3 px-4 rsm:py-4 rsm:px-5 h-auto text-sm rsm:text-base text-foreground disabled:text-gray-400 focus-visible:ring-primary rounded-lg shadow-primary/10 disabled:opacity-100 disabled:bg-gray-100 disabled:border-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex flex-row gap-3">
                      <PasswordCriteria text="8자 이상" isValid={passwordFieldValue.length >= 8} />
                      <PasswordCriteria text="영문자" isValid={/[a-zA-Z]/.test(passwordFieldValue)} />
                      <PasswordCriteria text="숫자" isValid={/[0-9]/.test(passwordFieldValue)} />
                      <PasswordCriteria text="특수문자" isValid={/[\W\_]/.test(passwordFieldValue)} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs rsm:text-sm">
                      비밀번호 재입력
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요."
                        autoComplete="new-password"
                        className="py-3 px-4 rsm:py-4 rsm:px-5 h-auto text-sm rsm:text-base text-foreground disabled:text-gray-400 focus-visible:ring-primary rounded-lg shadow-primary/10 disabled:opacity-100 disabled:bg-gray-100 disabled:border-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row justify-between space-x-4 mt-10">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="w-full h-12 text-base font-normal"
              >
                취소
              </Button>
              <Button
                type="submit"
                className="w-full h-12 text-base font-normal text-background"
              >
                변경
              </Button>
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
