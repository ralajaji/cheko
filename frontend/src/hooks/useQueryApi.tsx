import type { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import axios from '../config/axios'
import type { ApiCall, ApiCallTypes, ErrorResponse } from '../types/api.types'
import { ErrorResponseSchema } from '../types/api.types'

const defaultErrorResponse: ErrorResponse = {
  message: 'An unknown error occurred',
}

function useQueryApi<T extends ApiCall>(apiCallData: T) {
  let { headers, body, params, queryParams } = apiCallData
  const { endpoint, method } = apiCallData

  const addBody = (newBody: ApiCallTypes<T>['BS']) => {
    body = newBody as Record<string, string>
    return builder
  }

  const addParams = (newParams: ApiCallTypes<T>['PS']) => {
    params = newParams as Record<string, string>
    return builder
  }

  const addQueryParams = (newQueryParams: ApiCallTypes<T>['QS']) => {
    queryParams = newQueryParams as Record<string, string>
    return builder
  }

  const addHeaders = (newHeaders: ApiCallTypes<T>['HS']) => {
    headers = newHeaders as Record<string, string>
    return builder
  }

  let axiosConfigOverride: AxiosRequestConfig = {}
  const addAxiosConfig = (config: AxiosRequestConfig) => {
    axiosConfigOverride = { ...axiosConfigOverride, ...config }
    return builder
  }

  type Options = Omit<UseQueryOptions<ApiCallTypes<T>['RS'], ErrorResponse>, 'queryKey' | 'queryFn'>

  let useQueryOptions: Options = {
    retry: false,
    staleTime: 120000,
    refetchOnWindowFocus: false,
  }
  const addUseQueryOptions = (newOptions: Options) => {
    useQueryOptions = { ...useQueryOptions, ...newOptions }
    return builder
  }

  const useExecute = () => {
    return useQuery<ApiCallTypes<T>['RS'], ErrorResponse>({
      queryKey: [endpoint, method, headers, body, params, queryParams, axiosConfigOverride],
      queryFn: async (): Promise<ApiCallTypes<T>['RS']> => {
        let url = endpoint
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`{${key}}`, value)
          })
        }

        const config: AxiosRequestConfig = {
          url,
          method,
          headers,
          data: body,
          params: queryParams,
          ...axiosConfigOverride,
        }

        try {
          const axiosIns = axios as AxiosInstance
          const response = await axiosIns.request<ApiCallTypes<T>['RS']>(config)
          const parsed = await apiCallData.responseSchema.safeParseAsync(response.data)
          if (parsed.success) {
            return parsed.data as ApiCallTypes<T>['RS']
          }
          console.error('Failed to parse API response', parsed.error)
          throw defaultErrorResponse
        } catch (error) {
          const parsedError = ErrorResponseSchema.safeParse((error as AxiosError)?.response?.data)
          if (parsedError.success) {
            throw parsedError.data
          }
          throw defaultErrorResponse
        }
      },
      ...useQueryOptions,
    })
  }

  const builder = { useExecute, addBody, addParams, addQueryParams, addHeaders, addUseQueryOptions, addAxiosConfig }

  return builder
}

export default useQueryApi
