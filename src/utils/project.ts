import { Project } from 'screens/project-list/list'
import { useHttp } from './http'
import { useQuery, useMutation, QueryKey, useQueryClient } from 'react-query'
import { useEditConfig, useAddConfig } from './use-optimistic-options'
import { useProjectsSearchParams } from 'screens/project-list/util'

export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp()
	return useQuery<Project[]>(['projects', param], () =>
		client('projects', { data: param })
	)
}

export const useEditProject = () => {
	const client = useHttp()
	const queryClient = useQueryClient()
	const [searchParams] = useProjectsSearchParams()
	const queryKey = ['projects', searchParams]
	return useMutation(
		(params: Partial<Project>) =>
			client(`projects/${params.id}`, { data: params, method: 'PUT' }),
		// useEditConfig(queryKey)
		{
			onSuccess: () => queryClient.invalidateQueries('projects'),
			async onMutate(target) {
				const previousItems = queryClient.getQueriesData(queryKey)
				queryClient.setQueryData(queryKey, (old?: Project[]) => {
					return (
						old?.map(project =>
							project.id === target.id ? { ...project, ...target } : project
						) || []
					)
				})
				return { previousItems }
			},
			onError(context: any) {
				queryClient.setQueriesData(queryKey, context.previousItems)
			},
		}
	)
}

export const useAddProject = (queryKey: QueryKey) => {
	const client = useHttp()
	// const queryClient = useQueryClient()
	return useMutation(
		(params: Partial<Project>) =>
			client(`projects`, { data: params, method: 'post' }),
		useAddConfig(queryKey)
		// {
		// 	// 如果请求成功就把projects数据置为失效让他重新请求
		// 	onSuccess: () => queryClient.invalidateQueries('projects'),
		// }
	)
}

export const useProject = (id: Number) => {
	const client = useHttp()
	return useQuery(['project', { id }], () => client(`projects/${id}`), {
		enabled: !!id,
	})
}
