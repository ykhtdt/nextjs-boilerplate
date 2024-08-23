import { z } from "zod"

export const updateProfileSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "이름을 입력해주세요."),
  tel: z.string().regex(/^(\d{2,3})-(\d{3,4})-(\d{4})$/, "전화번호 형식이 올바르지 않습니다."),
  deptName: z.string().optional(),
  position: z.string().optional(),
  role: z.string().optional(),
})
