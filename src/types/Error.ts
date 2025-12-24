import z from "zod"
import { ERROR_LEVELS, ERROR_SOURCES } from "@/constants/mappings"
import { globalErrorSchema } from "@/schemas/error"
import { ConstantValues } from "@/utils/types"

export type ErrorSource = ConstantValues<typeof ERROR_SOURCES>

export type ErrorLevel = ConstantValues<typeof ERROR_LEVELS>

export type GlobalError = z.infer<typeof globalErrorSchema>

export type ErrorHandlerOptions = {
  log?: boolean
  level?: ConstantValues<typeof ERROR_LEVELS>
}
