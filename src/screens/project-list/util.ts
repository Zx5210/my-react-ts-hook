import { useMemo } from 'react'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'

export const useProjectsSearchParams = () => {
  //搜索栏的值从URL上获取param = {'name:xxx', 'id:xxx'}
  const [param, setParam] = useUrlQueryParam(['name', 'id'])
  //获取URL上编辑的数据id

  //返回一个param和一个setParam的方法因为返回的是一个新的对象所以使用useMemo包裹
  return [
    useMemo(() => ({ ...param, id: Number(param.id) || undefined }), [param]),
    setParam,
  ] as const
}

export const useProjectsQueryKey = () => {
  const [searchParams] = useProjectsSearchParams()
  return ['projects', searchParams]
}

export const useProjectModal = () => {
  const [{ projectCreate, editingProjectId }, setProjectOpen] =
    useUrlQueryParam(['projectCreate', 'editingProjectId'])

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  )

  const open = () =>
    setProjectOpen({ projectCreate: true, editingProjectId: undefined })

  const close = () => {
    setProjectOpen({ projectCreate: undefined, editingProjectId: undefined })
  }
  const startEdit = (id: number) =>
    setProjectOpen({ editingProjectId: id, projectCreate: undefined })

  return {
    projectMoadlOpen: projectCreate === 'true' || Boolean(editingProject),
    close,
    open,
    startEdit,
    editingProject,
    isLoading,
    projectCreate,
  } as const
}
