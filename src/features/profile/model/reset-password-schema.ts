import { z } from "zod"

export const resetPasswordSchema = z.object({
  email: z.string().optional(),
  password: z.string()
    .min(1, { message: "비밀번호를 입력해주세요." })
    .min(8, { message: "비밀번호는 최소 8자리 이상이어야 합니다." })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*(\W|\_))[a-zA-Z\d\W\_]*$/, { message: "비밀번호는 최소 1개 이상의 영어, 숫자, 특수문자를 포함해야 합니다." }),
  passwordConfirm: z.string().min(1, { message: "비밀번호를 입력해주세요." })
}).refine((data) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirm"],
})
