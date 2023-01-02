import { QueryKey, useQueryClient } from 'react-query'

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {

  const queryClient = useQueryClient()
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueriesData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return { previousItems }
    },
    onError(context: any) {
      queryClient.setQueriesData(queryKey, context.previousItems)
    },
  }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || [])
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.map(project => project.id === target.id ? { ...project, ...target } : project) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => (old ? [...old, target] : []))
