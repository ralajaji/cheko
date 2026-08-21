import { z } from 'zod'

export type ApiCall = {
  endpoint: string
  method: string
  params?: Record<string, string>
  queryParams?: Record<string, string>
  headers?: Record<string, string>
  body?: Record<string, string>
  responseSchema: z.ZodType
  bodySchema?: z.ZodType
  headersSchema?: z.ZodType
  paramsSchema?: z.ZodType
  queryParamsSchema?: z.ZodType
}

export type ApiCallTypes<T extends ApiCall> = {
  BS: T['bodySchema'] extends z.ZodType<infer BS> ? BS : never
  HS: T['headersSchema'] extends z.ZodType<infer HS> ? HS : never
  PS: T['paramsSchema'] extends z.ZodType<infer PS> ? PS : never
  QS: T['queryParamsSchema'] extends z.ZodType<infer QS> ? QS : never
  RS: z.infer<T['responseSchema']>
}

export const ErrorResponseSchema = z
  .object({
    message: z.string().optional(),
    code: z.string().optional(),
    status: z.number().optional(),
    timestamp: z.string().optional(),
  })
  .passthrough()

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
