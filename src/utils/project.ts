import { Project } from 'screens/project-list/list'
import { useHttp } from './http'
import { useQuery, useMutation, useQueryClient } from 'react-query'

export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp()
	return useQuery(['projects', param], () =>
		client('projects', { data: param })
	)
}

export const useEditProject = () => {
	const client = useHttp()
	const queryClient = useQueryClient()
	return useMutation(
		(params: Partial<Project>) =>
			client(`projects/${params.id}`, { data: params, method: 'PUT' }),
		{
			// 如果请求成功就把projects数据置为失效让他重新请求
			onSuccess: () => queryClient.invalidateQueries('projects'),
		}
	)
}

export const useAddProject = () => {
	const client = useHttp()
	const queryClient = useQueryClient()
	return useMutation(
		(params: Partial<Project>) =>
			client(`projects`, { data: params, method: 'post' }),
		{
			// 如果请求成功就把projects数据置为失效让他重新请求
			onSuccess: () => queryClient.invalidateQueries('projects'),
		}
	)
}

export const useProject = (id: Number) => {
	const client = useHttp()
	return useQuery(['project', { id }], () => client(`projects/${id}`), {
		enabled: !!id,
	})
}
