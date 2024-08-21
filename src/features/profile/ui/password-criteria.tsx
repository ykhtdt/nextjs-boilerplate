import { CheckCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

type PasswordCriteriaProps = {
  text: string;
  isValid: boolean;
}

export const PasswordCriteria = ({
  text,
  isValid,
}: PasswordCriteriaProps) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <CheckCircledIcon className={cn("w-4 h-4 transition-colors duration-300", isValid ? "fill-primary" : "fill-primary/20")} />
      <span className="text-xs rsm:text-sm">
        {text}
      </span>
    </div>
  )
}
