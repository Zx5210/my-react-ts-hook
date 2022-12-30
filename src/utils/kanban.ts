import { useHttp } from './http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { kanban } from 'types/kanban'
import { useAddConfig, useDeleteConfig } from './use-optimistic-options'


export const useKanbans = (param?: Partial<kanban>) => {
  const client = useHttp()
  return useQuery<kanban[]>(['kanbans', param], () =>
    client('kanbans', { data: param })
  )
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<kanban>) =>
      client(`kanbans`, { data: params, method: 'POST' }),
    useAddConfig(queryKey)
  )
}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: Number }) =>
      client(`kanbans/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey)
  )
}
