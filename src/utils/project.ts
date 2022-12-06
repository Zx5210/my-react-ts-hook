import { Project } from "types/project"
import { useHttp } from './http'
import { useQuery, useMutation, QueryKey } from 'react-query'
import { useEditConfig, useAddConfig, useDeleteConfig } from './use-optimistic-options'


export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', param], () =>
    client('projects', { data: param })
  )
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: 'PUT' }),
    useEditConfig(queryKey)
  )
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  // const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { data: params, method: 'POST' }),
    useAddConfig(queryKey)
    // {
    // 	// 如果请求成功就把projects数据置为失效让他重新请求
    // 	onSuccess: () => queryClient.invalidateQueries('projects'),
    // }
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: Number }) =>
      client(`projects/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey)
  )
}

export const useProject = (id: Number) => {
  const client = useHttp()
  return useQuery(['project', { id }], () => client(`projects/${id}`), {
    enabled: !!id,
  })
}
